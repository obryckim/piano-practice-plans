import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import marked from 'marked';
import PracticePlanForm from './PracticePlanForm.jsx';
import * as practicePlanActions from '../../actions/practicePlanActions';

class ManagePracticePlanPage extends React.Component {
    constructor(props) {
        super(props);

        // mutable state for this component
        this.state = {
            practicePlan: Object.assign({}, props.practicePlan),
            markdownPreview: { __html: '<h1>NO PREVIEW</h1>' },
            errors: {},
            saving: false
        };

        this.updatePracticePlanState = this.updatePracticePlanState.bind(this);
        this.savePracticePlan = this.savePracticePlan.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.generateMarkdownPreview = this.generateMarkdownPreview.bind(this);
    }

    updatePracticePlanState(event) {
        const field = event.target.name;
        let practicePlan = Object.assign({}, this.state.practicePlan);
        practicePlan[field] = event.target.value;
        return this.setState({ practicePlan: practicePlan });
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

    cancelChanges(event) {
        event.preventDefault();
        this.setState({ saving: false });
        toast.info('Changes cancelled.', { autoClose: 2000 });
        this.props.history.push('/');
    }

    redirectAfterSave() {
        this.setState({ saving: false });
        toast.success('Practice plan saved!');
        this.props.history.push('/');
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

    generateMarkdownPreview(event) {
        let rawMarkup = marked(event.target.value);
        let markdownPreview = Object.assign({}, this.state.markdownPreview);
        /* eslint-disable no-underscore-dangle */
        markdownPreview.__html = rawMarkup;
        return this.setState({ markdownPreview: markdownPreview });
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
    history: PropTypes.object,
    practicePlan: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps() {
    let practicePlan = { startDate: '', details: '' };

    return {
        practicePlan: practicePlan
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(practicePlanActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePracticePlanPage);
