import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import marked from 'marked';
import * as practicePlanActions from '../../actions/practicePlanActions';
import PracticePlan from './PracticePlan.jsx';

class PracticePlanPage extends React.Component {

    constructor(props) {
        super(props);

        this.redirectToPracticePlansPage = this.redirectToPracticePlansPage.bind(this);
    }

    componentDidMount() {
        const practicePlanId = this.props.practicePlanId;

        if (!practicePlanId) {
            this.props.actions.loadPracticePlans()
                .catch((error) => {
                    const errorMessage = `An error occurred loading the practice plans: ${error.message || error}`;
                    toast.error(errorMessage);
                });
        } else {
            this.props.actions.loadPracticePlanIfNeeded(this.props.practicePlanId)
                .catch((error) => {
                    const errorMessage = `An error occurred loading the practice plan: ${error.message || error}`;
                    toast.error(errorMessage);
                });
        }
    }

    redirectToPracticePlansPage() {
        this.props.history.push('/practicePlans');
    }

    render() {
        return (
            this.props.isLoading === false &&
            <PracticePlan practicePlan={this.props.practicePlan} />
        );
    }
}

PracticePlanPage.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object.isRequired,
    practicePlanId: PropTypes.string,
    practicePlan: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function generateHtmlFromMarkdown(markdown) {
    let rawMarkup = marked(markdown);
    let htmlObject = { __html: rawMarkup };
    return htmlObject;
}

function getPracticePlanById(practicePlans, id) {
    const practicePlan = practicePlans.filter(practicePlan => practicePlan.startDateString === id);
    if (practicePlan.length) {
        // since filter returns an array, need to grab first one
        return Object.assign({}, practicePlan[0], generateHtmlFromMarkdown(practicePlan[0].details));
    }
    return null;
}

function mapStateToProps(state, ownProps) {
    let planId = ownProps.match.params.id; // from the path '/practicePlans/:id'
    let practicePlan = { startDate: '', details: '', __html: '' };

    if (planId && state.practicePlans.length > 0) {
        // we have a planId and a list of plans
        // get the plan by the planId
        practicePlan = getPracticePlanById(state.practicePlans, planId);
    } else if (state.practicePlans.length > 0) {
        // no planId, but we have a list of plans
        // use the first plan in the list
        planId = state.practicePlans[0].startDateString;
        practicePlan = getPracticePlanById(state.practicePlans, planId);
    }

    return {
        practicePlanId: planId,
        practicePlan: practicePlan,
        isLoading: state.ajaxCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(practicePlanActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticePlanPage);
