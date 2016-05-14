import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR} from './types';


const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}){
  return function(dispatch){
      //submit email/password to the server
      axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(res => {
        // if success

        //update the state to indicate the user is authenticated
        dispatch({type:AUTH_USER});
        localStorage.setItem('token', res.data.token);
        browserHistory.push('/feature');
      })
      .catch(()=>{
          //dispatch({type:UNAUTH_USER});
          dispatch(authError('bad login info'));
      });
  }
}

export function signupUser({email, password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`, {email, password})
    .then((res)=> {
      dispatch({type:AUTH_USER});
      localStorage.setItem('token', res.data.token);
      browserHistory.push('/feature');
    })
    .catch((res)=> {
      dispatch(authError(res.data.error));
    })
  }
}

export function authError(error){
  return {
    type:AUTH_ERROR,
    payload:error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {type:UNAUTH_USER}
}
