export const sleep = async (ms: number): Promise<void> =>
  new Promise(resolve =>
    setTimeout(() => resolve(undefined), ms)
  );

export const escapeHtmlString = (html: string): string => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  return html.replace(/[&<>]/g, (charToEscape) => {
    if (
      charToEscape === "&" ||
      charToEscape === "<" ||
      charToEscape === ">"
    ) {
      return map[charToEscape];
    } else {
      return charToEscape;
    }
  });
};
