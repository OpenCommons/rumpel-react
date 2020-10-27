import { configureStore } from "@reduxjs/toolkit";
import { createMemoryHistory } from "history";
import { fireEvent, render, screen } from "@testing-library/react";
import { Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import profileSlice from "./profileSlice";
import TEST_PROFILE from "../../testData/Profile";
import ProfileHeader from "./ProfileHeader";

export const store = configureStore({
  reducer: {
    profile: profileSlice,
  },
  preloadedState: {
    profile: {
      profile: [TEST_PROFILE]
    }
  },
});

describe('Profile Header', () => {
  test('renders and displays the correct profile details', () => {
    const history = createMemoryHistory({ initialEntries: ['/profile'] });

    render(
      <Router history={history}>
        <Route path="/profile">
          <Provider store={store}>
            <ProfileHeader />
          </Provider>
        </Route>
      </Router>,
    );

    expect(screen.getByAltText('Profile avatar')).toBeInTheDocument();
    expect(screen.getByText('exit_to_app')).toBeInTheDocument();
    expect(screen.getByAltText('blog social link')).toBeInTheDocument();
    expect(screen.getByAltText('website social link')).toBeInTheDocument();
  });

  test('the correct location is called when the user clicks on the public profile button', () => {
    const history = createMemoryHistory({ initialEntries: ['/profile'] });

    render(
      <Router history={history}>
        <Route path="/profile">
          <Provider store={store}>
            <ProfileHeader />
          </Provider>
        </Route>
      </Router>,
    );

    fireEvent.click(screen.getByText('exit_to_app'));

    expect(history.location.pathname).toEqual('/public/profile');
  });
});
