import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import CovidCases from './CovidCases';

class Routes extends React.Component<any, {}> {
	public render() {
		return (
			<React.Fragment>
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route path="/covid-cases" component={CovidCases} />
                </Switch>
            </React.Fragment>);
    }
}

export default Routes;