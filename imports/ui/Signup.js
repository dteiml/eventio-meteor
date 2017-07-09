import React from 'react'; //for component
import { Link } from 'react-router-dom'; //for actionText link
import { Accounts } from 'meteor/accounts-base'; //for registration

let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let minPasswordLength = 4;
let passwordFormat = /[0-9!@#$%^&*]/; //at least 1 number or special character

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(evt) {
    evt.preventDefault();

    let error = false;

    let emailRef = this.refs.email;
    let passwordRef = this.refs.password;
    let repeatPasswordRef = this.refs.repeatPassword;

    let firstName = this.refs.firstName.value.trim();
    let lastName = this.refs.lastName.value.trim();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value;
    let repeatPassword = this.refs.repeatPassword.value;

    if ( ! emailFormat.test( email ) ) {
      error = true;
      this.setState(
        {error: {email: 'Email must be a valid email.'}});
    }

    if (password.length < minPasswordLength || !passwordFormat.test(password)) {
      error = true;
      this.setState(
        {error: {password: 'Password must be at least ' + minPasswordLength +
        ' characters long and include at least one number or special character.'}});
    }

    if (password !== repeatPassword) {
      error = true;
      this.setState(
        {error:
          {password: "Password don't match.",
           repeatPassword: "Passwords don't match."}});
    }

    const date = new Date();

    if (!error) {
      Accounts.createUser({email: email, password: password, profile: {firstName: firstName,
        lastName: lastName, createdAt: date, updatedAt: date, attending: []}}, (err) => {
          console.log('createUser callback fired');
        if (err) {
          this.setState({error: {login: err.reason}});
        } else {
          this.setState({error: {login: ''}});
        }
      });

      Meteor.loginWithPassword({email}, password);

      this.props.history.push('/home');
    }

  }
  render() {
    return (
      <div className="signUp">
        <div className="signupNav">
          <p className="logo">E.</p>
          <p className="accountPC">Already have an account? <Link to="/" className="actionText">Sign in</Link></p>
        </div>

        <div className="signUpBox">

          <h1>Get started absolutely free.</h1>

          <p>Enter your details below.</p>

          <form onSubmit={this.onSubmit} noValidate>
            <input id="firstName" type="text" ref="firstName" name="firstName" placeholder="First name"/><br/>
            <div className="errorText">{this.state.error.firstName}</div>

            <input id="lastName" type="text" ref="lastName" name="lastName" placeholder="Last name"/><br/>
            <div className="errorText">{this.state.error.lastName}</div>

            <input id="email" style={this.state.error.email ? {borderBottomColor: 'red'} : undefined}
              type="email" ref="email" name="email" placeholder="Email"/><br/>
            <div className="errorText">{this.state.error.email}</div>

            <input id="password" style={this.state.error.password ? {borderBottomColor: 'red'} : undefined}
              type="password" ref="password" name="password" placeholder="Password"/><br/>
            <div className="errorText">{this.state.error.password}</div>

            <input id="repeatPassword" style={this.state.error.repeatPassword ? {borderBottomColor: 'red'} : undefined}
              type="password" ref="repeatPassword" name="repeatPassword" placeholder="Repeat password"/> <br />
            <div className="errorText">{this.state.error.repeatPassword}</div>

            <p className="accountMobile">Already have an account? <Link to="/" className="actionText">Sign in</Link></p>
            <button className="btn btn-success">Sign up</button>

          </form>
        </div>

      </div>
    );
  }
}
