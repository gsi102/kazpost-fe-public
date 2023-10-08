import _ from "lodash";

import { Server } from "@/api/Server";

import { ReportData } from "@/shared/types";
import { hasOwnProp } from "@/shared/helpers/hasOwnProp";

type EntityData = {
  agent: {
    name: string;
    phone?: string;
    actualAddress?: string;
  };
  organization: {
    name: string;
    phone?: string;
    legalTitle?: string;
    actualAddress?: string;
  };
  shipmentAddress?: string;
  shipmentAddressFull?: {
    postalCode?: string;
  };
  sum: number;
};

class ReportsServiceClass {
  async getReportFile(accountId: string, reportData: ReportData) {
    let url = `/reports/xlsx`;

    const body = {
      accountId,
      reportData: _.cloneDeep(reportData),
    };

    return Server.post(url, body, { responseType: "blob" })
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });
  }

  parseAddresses(entityData: EntityData): ReportData {
    const regexZipCode = /[a-zA-Z]?\d{6}/gm;

    // const organization = entityData.organization;
    // const personFrom = hasOwnProp(organization, "legalTitle")
    //   ? organization.legalTitle
    //   : organization.name;
    // const phoneFrom = hasOwnProp(organization, "phone")
    //   ? organization.phone
    //   : "";
    // const addressFrom = hasOwnProp(organization, "actualAddress")
    //   ? organization.actualAddress
    //   : "";
    // const zipFromMatches: string[] | null = addressFrom
    //   ? addressFrom.match(regexZipCode)
    //   : null;
    // let zipFrom = zipFromMatches ? zipFromMatches[0] : "";

    // const from = {
    //   personFrom,
    //   phoneFrom,
    //   addressFrom,
    //   zipFrom,
    // };

    const agent = entityData.agent;
    const personTo = agent.name;
    const phoneTo = agent.phone || "";

    let addressTo = entityData.shipmentAddress;
    if (!addressTo) {
      addressTo = agent.actualAddress || "";
    }

    let zipTo = entityData.shipmentAddressFull?.postalCode;
    if (!zipTo) {
      const zipToMatches: string[] | null = addressTo
        ? addressTo.match(regexZipCode)
        : null;
      zipTo = zipToMatches ? zipToMatches[0] : "";
    }
    const to = {
      personTo,
      phoneTo,
      addressTo,
      zipTo,
    };

    let sum = entityData.sum / 100;
    const price = sum.toFixed(2).toString() + " \u20B8";
    const payAmount = sum.toFixed(2).toString() + " \u20B8";

    return {
      // from,
      to,
      price,
      payAmount,
    };
  }
}

export const ReportsService = new ReportsServiceClass();
