import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PracticePlanList from './PracticePlanList.jsx';
import * as practicePlanActions from '../../actions/practicePlanActions';

class PracticePlansPage extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(practicePlanActions.fetchPracticePlansIfNeeded());
    }

    render() {
        const { practicePlans } = this.props;

        return (
            <div>
                <h1>Practice Plans</h1>
                <PracticePlanList practicePlans={practicePlans} />
            </div>
        );
    }
}

PracticePlansPage.propTypes = {
    practicePlans: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        practicePlans: state.practicePlans
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(practicePlanActions, dispatch),
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticePlansPage);
