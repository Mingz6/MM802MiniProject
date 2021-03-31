import * as React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import CovidCases from "./CovidCases";
import TreatmentsAndVaccines from "./TreatmentsAndVaccines";
import HealthInfo from "./HealthInfo";
import Vaccines from "./Vaccines";

class Routes extends React.Component<any, {}> {
  public render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/covid-cases" component={CovidCases} />
          <Route
            path="/treatments-and-vaccines"
            component={TreatmentsAndVaccines}
          />
		  <Route path="/Vaccines" component={Vaccines}/>
        </Switch>
        <Route path="/health-info" component={HealthInfo} />
      </React.Fragment>
    );
  }
}

export default Routes;
