export function sendExpand(win: Window | null | undefined) {
  let h = -1;

  if (typeof win !== "undefined" && win) {
    const scrollHeight =
      document.documentElement.getBoundingClientRect().height;
    if (scrollHeight !== h) {
      h = scrollHeight || -1;
      const sendObject = {
        height: h,
      };

      win.postMessage(sendObject, "*");
    }
  }
}
