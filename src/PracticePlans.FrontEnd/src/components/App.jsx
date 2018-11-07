import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Navbar from './common/Navbar.jsx';
import Loader from './common/Loader.jsx';
import PracticePlansPage from './practice plans/PracticePlansPage.jsx';
import PracticePlanPage from './practice plans/PracticePlanPage.jsx';
import ManagePracticePlanPage from './practice plans/admin/ManagePracticePlanPage.jsx';

library.add(faMusic);

export class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar />
                    {this.props.isLoading && <Loader />}
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

App.propTypes = {
	isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	return {
		isLoading: state.ajaxCallsInProgress > 0
	};
}

export default connect(mapStateToProps)(App);
