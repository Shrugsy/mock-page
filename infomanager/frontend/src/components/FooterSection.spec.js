import React from "react";
import { shallow } from "enzyme";

import FooterSection from "./FooterSection";

describe("FooterSection", () => {
  let comp;
  beforeAll(() => {
    comp = shallow(<FooterSection />);
  });
  it("should render a center aligned segment", () => {
    expect(comp.prop("textAlign")).toBe("center");
  });

  it("should display a copyright message with the current year", () => {
    expect(comp.childAt(1).text()).toBe(new Date().getFullYear().toString());
  });
});
