import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Layout from "./components/layout";

const faqPage = React.lazy(() => import("./pages/faq"));
const Add = React.lazy(() => import("./pages/forms/Add"));
const Edit = React.lazy(() => import("./pages/forms/Edit"));
const Home = React.lazy(() => import("./pages/home/Home"));

function NoMatch() {
  const location = useLocation();

  return (
    <div>
      <h3>Error 404</h3>
      <p>
        No match for <code>{location.pathname}</code>
      </p>
    </div>
  );
}

export default function Routes() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<code>Loading...</code>}>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Home} />
            <Route path="/add" component={Add} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/faq" component={faqPage} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
}
