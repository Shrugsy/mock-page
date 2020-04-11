import React from "react";
import { mount } from "enzyme";
import FakeAlert from "./FakeAlert";
import { __RewireAPI__ as fakeAlertRewireApi } from './FakeAlert'
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

/*eslint-disable no-undef*/
describe("FakeAlert", () => {
  it('should call alert.success("hello") on render', () => {

    let useEffectSpy = spyOn(React, 'useEffect')
    // TODO: spy on 'alert.success()' function
    const fakeFuncSpy = jasmine.createSpy('fakeFunc')
    fakeAlertRewireApi.__Rewire__('fakeFunc', fakeFuncSpy);
    // FakeAlert.__Rewire__('fakeFunc', fakeFuncSpy);

    mount(
      <AlertProvider template={AlertTemplate}>
        <FakeAlert />
      </AlertProvider>
    );

    expect(useEffectSpy).toHaveBeenCalledTimes(2)
    expect(fakeFuncSpy).toHaveBeenCalled()
    // expect(alertSpy).toHaveBeenCalled()
    // (2 times because wrapping in AlertProvider seems to call it an extra time)

    // TODO: expect 'alert.success()' function to have been called once
  });
});
/*eslint-disable no-undef*/
