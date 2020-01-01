import { classify, welcomeMessage, labelProbabilities } from "./nb";

describe("the file", () => {
  it("classifies", () => {
    const classified = classify([
      "f#m7",
      "a",
      "dadd9",
      "dmaj7",
      "bm",
      "bm7",
      "d",
      "f#m"
    ]);

    expect(classified.get("easy")).toEqual(1.3433333333333333);
    expect(classified.get("medium")).toEqual(1.5060259259259259);
    expect(classified.get("hard")).toEqual(1.6884223991769547);
  });

  it("classifies again", () => {
    const classified = classify(["d", "g", "e", "dm"]);

    expect(classified.get("easy")).toEqual(2.023094827160494);
    expect(classified.get("medium")).toEqual(1.855758613168724);
    expect(classified.get("hard")).toEqual(1.855758613168724);
  });

  it("sets welcome message", () => {
    expect(welcomeMessage()).toEqual(`Welcome to nb.ts`);
  });

  it("label propabilities", () => {
    console.log(labelProbabilities);
  });
});
