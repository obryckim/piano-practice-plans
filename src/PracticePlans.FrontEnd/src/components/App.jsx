import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PracticePlansPage from './practice plans/PracticePlansPage.jsx';
import PracticePlanPage from './practice plans/PracticePlanPage.jsx';
import ManagePracticePlanPage from './practice plans/admin/ManagePracticePlanPage.jsx';


class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='container-fluid'>
                    <Switch>
                        <Route exact path='/' component={PracticePlanPage} />
                        <Route exact path='/practicePlans' component={PracticePlansPage} />
                        <Route exact path='/practicePlans/:id' component={PracticePlanPage} />
                        <Route exact path='/admin/practicePlan' component={ManagePracticePlanPage} />
                    </Switch>
                    <ToastContainer />
                </div>
            </Router>
        );
    }
}

export default App;
