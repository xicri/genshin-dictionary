class CandidateString {
  #candidate: string | undefined;

  constructor(candidate: string | undefined) {
    this.#candidate = candidate;
  }

  #normalize(str: string): string {
    return str
      // replace Katakana with Hiragana
      .replace(/[ァ-ヴ]/g, (str) => String.fromCharCode(str.charCodeAt(0) - 0x60))
      // ignore symbols
      // e.g. search query: "勤労の導き" -> result: "「勤労」の導き"
      // e.g. search query: "氷元素" -> result: "氷 (元素)"
      // e.g. search query: "ジングンヒルド" -> result: "ジン・グンヒルド"
      .replace(/[（）()「」・ ]/g, "")
      .replace(/ゔぁ/g, "ば")
      .replace(/ゔぃ/g, "び")
      .replace(/ゔぇ/g, "べ")
      .replace(/ゔぉ/g, "ぼ")
      .replace(/ゔ/g, "ぶ") // You need to replace after ゔぇ & ゔぉ, or ゔぇ & ゔぉ would be converted to ぶぇ & ぶぉ.
      .toLowerCase();
  }

  equals(searchElement: string): boolean {
    if (!this.#candidate) {
      return false;
    }

    return this.#normalize(this.#candidate) === this.#normalize(searchElement);
  }

  includes(searchElement: string): boolean {
    if (!this.#candidate) {
      return false;
    }

    const candidate = this.#normalize(this.#candidate);
    const _searchElement = this.#normalize(searchElement);
    return candidate.includes(_searchElement);
  }
}

export const candidate = (str: string | undefined): CandidateString => new CandidateString(str);

export const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(undefined), ms),
  );
