import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PracticePlansPage from './practice plans/PracticePlansPage.jsx';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='container-fluid'>
                    <Switch>
                        <Route exact path='/' component={PracticePlansPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
