import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import marked from 'marked';
import PracticePlanForm from './PracticePlanForm.jsx';
import * as practicePlanActions from '../../../actions/practicePlanActions';

class ManagePracticePlanPage extends React.Component {
    constructor(props) {
        super(props);

        // mutable state for this component
        this.state = {
            practicePlan: Object.assign({}, props.practicePlan),
            markdownPreview: Object.assign({}, props.markdownPreview),
            errors: {},
            saving: false
        };

        this.updatePracticePlanState = this.updatePracticePlanState.bind(this);
        this.savePracticePlan = this.savePracticePlan.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.generateMarkdownPreview = this.generateMarkdownPreview.bind(this);
    }

    cancelChanges(event) {
        event.preventDefault();
        this.setState({ saving: false });
        toast.info('Changes cancelled.', { autoClose: 2000 });
        this.props.history.push('/practicePlans');
    }

    componentDidMount() {
        const practicePlanId = this.props.practicePlanId;

        if (practicePlanId && this.props.practicePlans.length == 0) {
            this.props.actions.loadPracticePlans();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.practicePlan.startDate !== this.props.practicePlan.startDate) {
            this.setState({ practicePlan: Object.assign({}, this.props.practicePlan) });
        }

        if (prevProps.markdownPreview !== this.props.markdownPreview) {
            this.setState({ markdownPreview: Object.assign({}, this.props.markdownPreview) });
        }
    }

    generateMarkdownPreview(event) {
        let markdown = event.target.value;

        if(markdown === '')
        {
            markdown = defaultMessage;
        }

        return this.setState({ markdownPreview: generateHtmlFromMarkdown(markdown) });
    }

    practicePlanFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.practicePlan.startDate.trim() === '') {
            errors.startDate = 'Please enter the start date for this practice plan.';
            formIsValid = false;
        }

        if (this.state.practicePlan.details.trim() === '') {
            errors.details = 'Please enter the practice plan details.';
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    redirectAfterSave() {
        this.setState({ saving: false });
        toast.success('Practice plan saved!');
        this.props.history.push('/practicePlans');
    }

    savePracticePlan(event) {
        event.preventDefault();

        if (!this.practicePlanFormIsValid()) {
            return;
        }

        this.setState({ saving: true });

        this.props.actions
            .savePracticePlan(this.state.practicePlan)
            .then(() => this.redirectAfterSave())
            .catch(error => {
                let errorMessage = `An error occurred saving the practice plan: ${error.message || error}`;
                toast.error(errorMessage);
                this.setState({ saving: false });
            });
    }

    updatePracticePlanState(event) {
        const field = event.target.name;
        let practicePlan = Object.assign({}, this.state.practicePlan);
        practicePlan[field] = event.target.value;
        return this.setState({ practicePlan: practicePlan });
    }

    render() {
        return (
            <PracticePlanForm
                onChange={this.updatePracticePlanState}
                onSave={this.savePracticePlan}
                onCancel={this.cancelChanges}
                onMarkdownUpdate={this.generateMarkdownPreview}
                errors={this.state.errors}
                saving={this.state.saving}
                practicePlan={this.state.practicePlan}
                markdownPreview={this.state.markdownPreview} />
        );
    }
}

ManagePracticePlanPage.propTypes = {
    history: PropTypes.object.isRequired,
    practicePlanId: PropTypes.string,
    practicePlan: PropTypes.object.isRequired,
    practicePlans: PropTypes.array.isRequired,
    markdownPreview: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

const defaultMessage = '<h4>Enter some details to see the preview...</h4>';

function generateHtmlFromMarkdown(markdown) {
    let rawMarkup = marked(markdown);
    let htmlObject = { __html: rawMarkup };
    return htmlObject;
}

function getPracticePlanById(practicePlans, id) {
    const practicePlan = practicePlans.filter(practicePlan => practicePlan.startDateString === id);
    if (practicePlan.length) {
        return Object.assign({}, practicePlan[0]);
    }
    return null;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(practicePlanActions, dispatch)
    };
}

function mapStateToProps(state, ownProps) {
    const practicePlanId = ownProps.match.params.id;
    let practicePlan = { startDate: '', details: '' };
    let markdownPreview = { __html: defaultMessage };

    if (practicePlanId && state.practicePlans.length > 0) {
        practicePlan = getPracticePlanById(state.practicePlans, practicePlanId);
        markdownPreview = generateHtmlFromMarkdown(practicePlan.details);
    }

    return {
        practicePlanId: practicePlanId,
        practicePlan: practicePlan,
        practicePlans: state.practicePlans,
        markdownPreview: markdownPreview
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePracticePlanPage);
