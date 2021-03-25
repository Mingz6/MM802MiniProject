import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import CovidCases from './CovidCases';
import TreatmentsAndVaccines from './TreatmentsAndVaccines';

class Routes extends React.Component<any, {}> {
	public render() {
		return (
			<React.Fragment>
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route path="/covid-cases" component={CovidCases} />
					<Route path="/treatments-and-vaccines" component={TreatmentsAndVaccines} />
                </Switch>
            </React.Fragment>);
    }
}

export default Routes;