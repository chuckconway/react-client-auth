import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

 handleFormSubmit(){

 }

  render() {

    const {handleSubmit, fields:{email, password, passwordConfirm}} = this.props;

    return (
      <form>
          <fieldset onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}  className="form-group" >
            <label>Email:</label>
            <input className="form-control" {...email} />
          </fieldset>
          <fieldset className="form-group" >
            <label>Password:</label>
            <input type="password" className="form-control" {...password} />
            {password.touched && password.error && <div className="error">{password.error}</div>}
          </fieldset>
          <fieldset className="form-group" >
            <label>Confirm Password:</label>
            <input type="password" className="form-control" {...passwordConfirm} />
          </fieldset>
          <button action="submit" className="btn btn-primary" >Create</button>
      </form>
    )
  }
}

function validate(formProps){
  const errors= {};

  if(formProps.password !== formProps.passwordConfirm){
    errors.password = 'Passwords must match';
  }

  return errors;
}

export default reduxForm({
  form:'signup',
  fields:['email', 'password', 'passwordConfirm'],
  validate
})(Signup);
