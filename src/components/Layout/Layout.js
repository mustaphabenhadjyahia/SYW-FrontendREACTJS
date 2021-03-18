import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import mesarticles from "../../pages/mesarticles/mesarticles"
import mesavente, { mesvente } from "../../pages/mesarticles/mesvente"
import {messtat} from "../../pages/messtat/messtat"
import Demo from "../../pages/calendar/Calendar";

// context
import { useLayoutState } from "../../context/LayoutContext";
import ProfileBoutique from "../../pages/ProfilePage/ProfileBoutique";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
        <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/mesarticles" component={mesarticles} />
              <Route path="/app/mesvente" component={mesvente} />
              <Route path="/app/messtate" component={messtat} />
              <Route path="/app/profil" component={ProfileBoutique} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/notifications" component={Notifications} />
              <Route path="/app/calendar" component={Demo} />
             
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
