import React from 'react';
// import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import * as courseActions from '../../actions/courseActions';
// import CourseList from './CourseList';

// this is a container component
// the 5 major pieces of a container component
// see 1) 2) 3) 4) 5) below
class PracticePlansPage extends React.Component {

    // 1) constructor, where we initialize state and call our bind functions
    // any functions that need to be bound to the "this" context,
    // this is the best place to do so
    constructor(props, context) {
        super(props, context);
    }

    // 2) child functions called by render():
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // child functions called by render():

    // 3) render method... usually calls a child component
    // markup is usually kept separate from the container component
    render(){
        // const { practicePlans } = this.props;

        return (
            <div>
                <h1>Practice Plans</h1>
            </div>
        );
    }
}

// 4) prop types and prop type validation
// PracticePlansPage.propTypes = {}

// 5) redux "connect" and related functions
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
function mapStateToProps(/*state, ownProps*/) {
	return {
		// courses: state.courses
	};
}

function mapDispatchToProps(/*dispatch*/) {
	return {
		// actions: bindActionCreators(courseActions, dispatch)
	};
}

// these 2 lines of code:
// - const connectedStateAndProps =  connect(mapStateToProps, mapDispatchToProps);
// - export default connectedStateAndProps(CoursesPage);
// can be expressed by this one call: => the first function calls the second one
// this is just 2 functions calls; the connect functions returns a function
// and that function calls our container component with the result of the first function
export default connect(mapStateToProps, mapDispatchToProps)(PracticePlansPage);
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// redux "connect" and related functions
