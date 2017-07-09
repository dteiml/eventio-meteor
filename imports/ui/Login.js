import React from 'react'; //for component
import { Link } from 'react-router-dom'; //for link
import { Meteor } from 'meteor/meteor'; //for login
import { fontawesome } from 'meteor/fortawesome:fontawesome';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
  }

  //login function
  onSubmit(evt) {
    evt.preventDefault();

    let emailRef = this.refs.email;
    let passwordRef = this.refs.password;

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value;

    Meteor.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState(
          {error: 'Oops, that email and password combination is not valid.'}
        );
      }
      else {
        this.props.history.push('/home');
      }
    });
  }

  //eye icon onClick function
  handleShowPassword() {
    let passwordRef = this.refs.password;
    if(passwordRef.type === 'password') {
      password.setAttribute('type', 'text');
    } else if(password.type === 'text') {
      passwordRef.setAttribute('type', 'password');
    }
  }

  render() {
    return (
      <div className="signUp"> {/* for background */}
        <div className="signupNav">
          <p className="logo">E.</p>
          <p className="accountPC">Don&#39;t have an account? <Link to="/signup" className="actionText">Sign up</Link></p>
        </div>

        <div className="signUpBox">

          <h1>Sign in to Eventio</h1>

          <p>Enter your details below.</p>

          {this.state.error && <div className="errorText"> {this.state.error} </div>}

          <form onSubmit={this.onSubmit} noValidate>
            <input id="email" style={this.state.error ? {borderBottomColor: 'red'} : undefined}
              type="email" ref="email" name="email" placeholder="Email"/><br/>
            <span className="passwordSpan">

            <input id="password" style={this.state.error ? {borderBottomColor: 'red'} : undefined}
              type="password" ref="password" name="password" placeholder="Password"/>
            <i onClick={this.handleShowPassword} className="fa fa-eye showPassword">
              </i></span><br/>

            <p className="accountMobile">Don&#39;t have an account? <Link to="/signup" className="actionText">Sign up</Link></p>
            <button className="btn btn-success">Sign in</button>

          </form>

        </div>
      </div>
    );
  }
}
