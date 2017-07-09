import React from 'react';
import {Link} from 'react-router-dom';

export default class NotFound extends React.Component {
  render() {
    return (        
      <div className="signUp">
      <div className="container">
        <div className="row nav">
        <p className="logo" style={{color: 'white'}}> E.</p>
        <p className="alreadyHaveAccount">Don&#39;t have an account? <Link to="/signup" style={{ textDecoration: 'none',
        color: '#dddddd',
        textTransform: 'uppercase',
        fontWeight: '400'}}>Sign up</Link></p>
        </div>
      </div>
      <div className="signUpBox">

        <h1>404 Error - page not found</h1>
        <h3>Seems like Darth Vader just hit our website and dropped it down.<br />
        Please press the refresh button and everything should be fine.</h3>
          <Link to="/"><button className="btn btn-black">Refresh</button></Link>
        </div>

      </div>
    )
  }
}
