import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PracticePlanForm from './PracticePlanForm.jsx';
import * as practicePlanActions from '../../actions/practicePlanActions';

class ManagePracticePlanPage extends React.Component {
    constructor(props) {
        super(props);

        // mutable state for this component
        this.state = {
            practicePlan: Object.assign({}, props.practicePlan),
            errors: {},
            saving: false
        };

        this.updatePracticePlanState = this.updatePracticePlanState.bind(this);
        this.savePracticePlan = this.savePracticePlan.bind(this);
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
			.then(() => this.redirect())
			.catch(error => {
                let errorMessage = `An error occurred saving the practice plan: ${error.message || error}`;
				toast.error(errorMessage);
				this.setState({ saving: false });
			});
    }

    redirect() {
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

    render() {
        return (
            <PracticePlanForm
                onChange={this.updatePracticePlanState}
                onSave={this.savePracticePlan}
                errors={this.state.errors}
                saving={this.state.saving}
                practicePlan={this.state.practicePlan} />
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
