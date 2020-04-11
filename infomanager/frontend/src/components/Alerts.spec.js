import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import * as errors from '../actions/errors'

import Alerts from "./Alerts";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { useAlert } from "react-alert";
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  info: {
    error: { msg: "fsdfds", status: "" },
    message: "",
  },
};
const store = mockStore(initialState);

/*eslint-disable no-undef*/
describe("Alerts", () => {
  // let props;
  let wrapper;
  // let useEffect;

  beforeEach(() => {
    store.clearActions();
  });

  it("should dispatch createError() when state has error", () => {
    // spyOnProperty(errors, 'createError', 'get')
  })

  // it("should call alert.error when error state changes", () => {
    // spyOn(foo, "setBar").and.returnValue(3);
    // console.log(bar);
    // console.log(foo.setBar(22));
    // console.log(bar);

    // wrapper = mount(<Alerts />)

    // console.log(store.getState().info)
    // wrapper = mount(
    //   <Provider store={store}>
    //     <Alerts />
    //   </Provider>
    // );
    // wrapper = mount(<Alerts store={store}/>)
  // });

});

/*eslint-disable no-undef*/
