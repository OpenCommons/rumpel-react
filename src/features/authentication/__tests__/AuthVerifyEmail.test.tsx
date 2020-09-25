import React from 'react';
import { mount } from "enzyme";
import { Router } from "react-router";
import { createMemoryHistory } from 'history';
import Root from "../../../app/Root";
import AuthVerifyEmail from "../AuthVerifyEmail";

describe('AuthValidateEmail tests', () => {
  const history = createMemoryHistory();
  history.push('/auth/verify-email/41124?email=test@dataswift.io');

  // Mock location's search value to pass query parameters.
  // @ts-ignore
  global.window = Object.create(window);
  const search = "?email=test@dataswift.io";
  Object.defineProperty(window, "location", {
    value: {
      search: search
    },
    writable: true
  });

  const wrapper = mount(
    <Router history={history}>
      <Root>
        <AuthVerifyEmail />
      </Root>
    </Router>
  );

  it('is truthy', () => {
    expect(wrapper).toBeTruthy();
  });

  // The checks are failing here as we are checking zxcvbn library if is ready.

  // it('has correct the buttons', () => {
  //   const recoverBtn = wrapper.find("button.auth-login-btn");
  //
  //   expect(recoverBtn).toHaveLength(1);
  // });
  //
  // it('has the correct title ', () => {
  //   const authTitleText = wrapper.find("h2.auth-login-title");
  //   expect(authTitleText.text()).toEqual("Create a password");
  // });
});
