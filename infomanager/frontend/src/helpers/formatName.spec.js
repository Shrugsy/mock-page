import formatName from "./formatName.js";

describe("format name function", () => {
  it("should uppercase first letter of an all lowercase string and keep rest lowercase", () => {
    expect(formatName("john")).toBe("John");
  });

  it("should keep first letter uppercase of an all uppercase string and make rest lowercase", () => {
    expect(formatName("JOHN")).toBe("John");
  })

  it("should not alter a string with differing case", () => {
    expect(formatName("McKenzie")).toBe("McKenzie")
  })

  it("should return an empty string if input is not a string", () => {
    expect(formatName(43)).toBe("")
  })
});
