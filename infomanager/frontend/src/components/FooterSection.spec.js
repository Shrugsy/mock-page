import React from "react";
import { shallow } from "../../setupEnzyme";

import FooterSection from "./FooterSection";

describe("FooterSection", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<FooterSection />);
  });
  it("should render a center aligned segment", () => {
    expect(wrapper.prop("textAlign")).toBe("center");
  });

  it("should display a copyright message with the current year", () => {
    expect(wrapper.childAt(1).text()).toBe(new Date().getFullYear().toString());
  });
});
