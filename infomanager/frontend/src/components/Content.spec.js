import React from "react";
import { shallow } from "enzyme";

import Content from "./Content";
const div1 = () => <div>Some text in the div</div>;
const div2 = () => <div>different text in the other div</div>;

describe("Content", () => {
  it("should render two components as props", () => {
    const comp = shallow(
      <Content LeftComponent={div1} RightComponent={div1} />
    );

    expect(comp.find(div1).length).toBe(2);
  });

  it("should render two different components as props", () => {
    const comp = shallow(
      <Content LeftComponent={div1} RightComponent={div2} />
    );
    expect(comp.find(div1).length).toBe(1);
    expect(comp.find(div2).length).toBe(1);
  });
});
