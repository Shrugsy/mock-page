import formatMoney from "./formatMoney.js";

describe("format Money function", () => {
  it("should prefix a $ sign to a number and suffix .00 indicating cents", () => {
    expect(formatMoney(500)).toBe("$500.00");
    expect(formatMoney(-500)).toBe("$-500.00");
  });

  it("should also add 'thousands' commas to an amount more significant than +-999", () => {
      expect(formatMoney(3568)).toBe("$3,568.00")
      expect(formatMoney(-3568)).toBe("$-3,568.00")
  })

  it("should also add 'millions' commas to an amount more significant than +-999999", () => {
      expect(formatMoney(2456789)).toBe("$2,456,789.00")
      expect(formatMoney(-2456789)).toBe("$-2,456,789.00")
  })

});
