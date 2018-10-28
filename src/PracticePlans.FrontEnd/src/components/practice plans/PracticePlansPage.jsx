import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PracticePlanList from './PracticePlanList.jsx';
import * as practicePlanActions from '../../actions/practicePlanActions';

// Container component
// ES6 Class Component
class PracticePlansPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.loadPracticePlans();
    }

    render() {
        const { practicePlans } = this.props;

        return (
            <div>
                <h1>Benjamin&apos;s Piano Practice Plans</h1>
                <PracticePlanList practicePlans={practicePlans} />
            </div>
        );
    }
}

PracticePlansPage.propTypes = {
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
