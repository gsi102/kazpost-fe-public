import { ReportsService } from "@/api/services";

import { ReportData } from "@/shared/types";
import { Nullable } from "@/shared/types/helpers";

class ReportsControllerClass {
  async getReportFile(
    accountId: Nullable<string>,
    reportData: ReportData
  ): Promise<Nullable<Blob>> {
    if (!accountId) {
      throw new Error("No accountId.");
    }

    let blob = null;
    try {
      const report = await ReportsService.getReportFile(accountId, reportData);
      const fileType = "application/pdf";
      blob = new Blob([report], { type: fileType });
    } catch (err) {
      console.error(err);
      throw err;
    }
    return blob;
  }
}

export const ReportsController = new ReportsControllerClass();
