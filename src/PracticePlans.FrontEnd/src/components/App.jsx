﻿import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PracticePlansPage from './practice plans/PracticePlansPage.jsx';
import ManagePracticePlanPage from './practice plans/ManagePracticePlanPage.jsx';


class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='container-fluid'>
                    <Switch>
                        <Route exact path='/' component={PracticePlansPage} />
                        <Route exact path='/practicePlan' component={ManagePracticePlanPage} />
                    </Switch>
                    <ToastContainer />
                </div>
            </Router>
        );
    }
}

export default App;
