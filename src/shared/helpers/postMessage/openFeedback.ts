export const openFeedback = (correlationId: number) => {
  const postMsgPayload = {
    name: "OpenFeedback",
    correlationId,
  };

  return window.parent.postMessage(postMsgPayload, "*");
};
