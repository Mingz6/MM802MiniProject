import * as React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {

    return (
        <div className="d-flex flex-column">
            <Link to="/covid-cases">Covid Cases</Link>
            <Link to="/covid-cases">TODO</Link>
            <Link to="/covid-cases">TODO</Link>
        </div>
    );
}

export default HomePage;