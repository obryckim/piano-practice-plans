import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Navbar from './common/Navbar.jsx';
import PracticePlansPage from './practice plans/PracticePlansPage.jsx';
import PracticePlanPage from './practice plans/PracticePlanPage.jsx';
import ManagePracticePlanPage from './practice plans/admin/ManagePracticePlanPage.jsx';

library.add(faMusic);

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={PracticePlanPage} />
                        <Route exact path='/practicePlans' component={PracticePlansPage} />
                        <Route exact path='/practicePlans/:id' component={PracticePlanPage} />
                        <Route exact path='/admin/practicePlan' component={ManagePracticePlanPage} />
                        <Route exact path='/admin/practicePlan/:id' component={ManagePracticePlanPage} />
                    </Switch>
                    <ToastContainer />
                </div>
            </Router>
        );
    }
}

export default App;
