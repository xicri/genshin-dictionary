export const sleep = async (ms: number): Promise<void> =>
  new Promise(resolve =>
    setTimeout(() => resolve(), ms)
  );

export const escapeHtmlString = (html: string): string => {
  type mapType = {
    [key: string]: string,
  };
  const map: mapType = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  return html.replace(/[&<>]/g, (charToEscape) => map[charToEscape] ?? charToEscape);
};
