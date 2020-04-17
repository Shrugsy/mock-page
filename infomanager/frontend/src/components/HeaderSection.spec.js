import React from "react";
import HeaderSection from "./HeaderSection";
import { mount } from "../../setupEnzyme";
describe("HeaderSection component", () => {
  let wrapperMobile, wrapperDesktop;
  beforeEach(() => {
    wrapperMobile = mount(<HeaderSection mobile />);
    wrapperDesktop = mount(<HeaderSection />);
  });
  it("should have reduced Y padding on mobile mode", () => {
    const mobilePaddingTop = parseFloat(
      wrapperMobile.find("Header").props().style.paddingTop
    );
    const mobilePaddingBottom = parseFloat(
      wrapperMobile.find("Header").props().style.paddingBottom
    );
    const desktopPaddingTop = parseFloat(
      wrapperDesktop.find("Header").props().style.paddingTop
    );
    const desktopPaddingBottom = parseFloat(
      wrapperDesktop.find("Header").props().style.paddingBottom
    );

    expect(mobilePaddingTop).toBeLessThan(desktopPaddingTop);
    expect(mobilePaddingBottom).toBeLessThan(desktopPaddingBottom);
  });
});
