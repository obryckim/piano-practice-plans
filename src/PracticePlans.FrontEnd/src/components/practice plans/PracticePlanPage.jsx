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
        this.props.actions.loadPracticePlanIfNeeded(this.props.practicePlanId)
            .catch((error) => {
                const errorMessage = `An error occurred loading the practice plan: ${error.message || error}`;
                toast.error(errorMessage);
            });
    }

    redirectToPracticePlansPage() {
        this.props.history.push('/practicePlans');
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <PracticePlan practicePlan={this.props.practicePlan} />
                    </div>
                </div>
                <div className='row pt-2'>
                    <div className='col'>
                        <input type='submit' value='View All Plans' className='btn btn-primary' onClick={this.redirectToPracticePlansPage} />
                    </div>
                </div>
            </div>
        );
    }
}

PracticePlanPage.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object.isRequired,
    practicePlanId: PropTypes.string.isRequired,
    practicePlan: PropTypes.object.isRequired
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
    const planId = ownProps.match.params.id; // from the path '/practicePlans/:id'
    let practicePlan = { startDate: '', details: '', __html: '' };

    if (planId && state.practicePlans.length > 0) {
        practicePlan = getPracticePlanById(state.practicePlans, planId);
    }

    return {
        practicePlanId: planId,
        practicePlan: practicePlan
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(practicePlanActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticePlanPage);
