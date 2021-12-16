//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from "react";
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from "./SurveyField";
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';



class SurveyForm extends Component {
    renderField(){
        return _.map(formFields, ({label, name}) =>{
            return <Field component={SurveyField} type="text" label={label} name={name} key={name}/>
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderField()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

function validate(values){
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '')

    _.each(formFields, ({name})=>{
        if (!values[name]){// like dictionary
            errors[name] = 'You must provise a value here.'
        }
    })
    
    
    return errors; // if it returns an empty {}, redux will think that is good to go, but if there is sth in it, it will not pass the validation
}

export default reduxForm({ // Field will store the data into reducForm with the key of surveyTitle
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount:false // it will not dump the value if you go to other pages
})(SurveyForm);