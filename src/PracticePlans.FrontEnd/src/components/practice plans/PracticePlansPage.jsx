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
    }

    componentDidMount() {
        this.props.actions.loadPracticePlans()
            .catch((error) => {
                const errorMessage = `An error occurred loading the practice plans: ${error.message || error}`;
                toast.error(errorMessage);
            });
    }

    redirectToAddPracticePlanPage() {
        this.props.history.push('/practicePlan');
    }

    render() {
        const { practicePlans } = this.props;

        return (
            <div>
                <h1>Benjamin&apos;s Piano Practice Plans</h1>
                <PracticePlanList practicePlans={practicePlans} />
                <input type='submit' value='Add Practice Plan' className='btn btn-primary' onClick={this.redirectToAddPracticePlanPage} />
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
