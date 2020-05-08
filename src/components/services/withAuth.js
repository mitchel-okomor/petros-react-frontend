import React, {Component} from 'react';
import checkLogin from '../helpers/checkLoggin';
import history from './history';


const withAuth = AuthComponent => {
  return class AuthWrapped extends Component {
    constructor (props) {
      super (props);
      this.state = {
        isAutenticated: false,
      };
    }
    
    componentDidMount () {
      console.log ('inside HOC');
      //check if it's still authenticated
      const isConfirmed = checkLogin ();
      console.log ('Auth is Confirm: ' + isConfirmed);

      if (!isConfirmed) {
        history.push ('/login');
      } else {
        this.setState ({
          isAutenticated: true,
        });
      }
    }

    render () {
      console.log (this.state.isAutenticated);
      if (this.state.isAutenticated) {
        console.log ('Authenticated');
        return (
          /* component that is currently being wrapper(App.js) */
          <AuthComponent />
        );
      } else {
        console.log ('not Authenticated!');
        return null;
      }
    }
  };
};
export default withAuth;
