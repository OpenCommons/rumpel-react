import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";
import { PrivateSpace } from "../components/PrivateSpace/PrivateSpace";
import { Feed } from "../features/feed/Feed";
const HatClaim = React.lazy(() =>
  import(
    /* webpackChunkName: "hat_claim" */
    '../features/hat-claim/HatClaim'
  )
);
const Login = React.lazy(() =>
  import(
    /* webpackChunkName: "user_login" */
    '../components/user/Login'
  )
);
const HatLogin = React.lazy(() =>
  import(
    /* webpackChunkName: "hat_login" */
    '../features/hat-login/HatLogin'
  )
);

const HatSetupLogin = React.lazy(() =>
  import(
    /* webpackChunkName: "hat_setup_login" */
    '../features/hat-setup-login/HatSetupLogin'
  )
);
const PasswordRecover = React.lazy(() =>
  import(
    /* webpackChunkName: "password_recover" */
    '../components/user/PasswordRecover'
  )
);

const PrivateSpaceRoutes = () => {
  return (
    <PrivateSpace>
      <PrivateRoute path={'/feed'}>
        <Feed />
      </PrivateRoute>
    </PrivateSpace>
  );
};

const AppRouter = () => (
  <Router>
    <Suspense fallback={<LoadingSpinner loadingText={'Loading'}/>}>
      <Switch>
        <Route path="/hat/claim/:claimToken" component={HatClaim} />
        <Route path="/user/login/" component={Login} />
        <Route path="/user/password/recover" component={PasswordRecover} />

        <PrivateRoute path={'/hatlogin'}>
          <HatLogin />
        </PrivateRoute>

        <PrivateRoute path={'/hat-setup-login'}>
          <HatSetupLogin />
        </PrivateRoute>

        <PrivateSpaceRoutes />

        <Route exact path="/" render={({ location }) => <Redirect to={location.hash.replace('#', '')} />} />
      </Switch>
    </Suspense>
  </Router>
);
export default AppRouter;
