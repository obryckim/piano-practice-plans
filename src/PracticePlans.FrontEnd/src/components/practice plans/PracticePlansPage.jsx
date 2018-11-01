import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PracticePlanList from './PracticePlanList.jsx';
import * as practicePlanActions from '../../actions/practicePlanActions';

// Container component
// ES6 Class Component
class PracticePlansPage extends React.Component {
    constructor(props) {
        super(props);

        this.redirectToAddPracticePlanPage = this.redirectToAddPracticePlanPage.bind(this);
        this.redirectToHomePage = this.redirectToHomePage.bind(this);
    }

    componentDidMount() {
        this.props.actions.loadPracticePlans()
            .catch((error) => {
                const errorMessage = `An error occurred loading the practice plans: ${error.message || error}`;
                toast.error(errorMessage);
            });
    }

    redirectToAddPracticePlanPage() {
        this.props.history.push('/admin/practicePlan');
    }

    redirectToHomePage() {
        this.props.history.push('/');
    }

    render() {
        const { practicePlans } = this.props;

        return (
            <div>
                <h1>Benjamin&apos;s Piano Practice Plans</h1>
                <PracticePlanList practicePlans={practicePlans} />
                <div>
                    <input type='submit' value='Home' className='btn btn-primary' onClick={this.redirectToHomePage} />&nbsp;
                    <input type='submit' value='Add Practice Plan' className='btn btn-default' onClick={this.redirectToAddPracticePlanPage} />
                </div>
            </div>
        );
    }
}

PracticePlansPage.propTypes = {
    history: PropTypes.object,
    practicePlans: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        practicePlans: state.practicePlans
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(practicePlanActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticePlansPage);
