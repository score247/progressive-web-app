import * as React from "react";
import { shallow } from "enzyme";
import LeftBar from "./index";

describe("<LeftBar />", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<LeftBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
