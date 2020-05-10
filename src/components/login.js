import React from 'react';
import './login.css';
import history from '../components/services/history';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loginMessage:""
        };
    }
    
    componentDidCatch(){

    }

      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
   handleSubmit = event => {
   event.preventDefault();
       const url = 'http://localhost:4000/login';
        
        fetch(url, {
method: 'post',
headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/json' 
},
body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data =>{ 
          if(data.status ==="error"){
            this.setState({
              loginStatus : data.status,
              loginMessage: data.message,
          })
          }
          else{
            this.setState({
            loginStatus : data.status,
            loginMessage: data.message,
            token: data.data.token,
            userId: data.data.user
        });
        //save user datat 
        localStorage.setItem('token', this.state.token);
        localStorage.setItem('userId', this.state.userId);
    history.push('/admin');
          }
          })
        .catch((err)=>{
            console.log(err);
        })
    
      }
    
    render(){ 

        return(
         
  <div className="login">
  <br />
  <br />
<br />
    <h1>Login to Admin Panel</h1>
    <br />

    <form >
      <fieldset>
    
<div>
          <label htmlFor="first_name" >email:</label> <br />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            value={this.state.value}
            onChange={this.handleChange}  
            required
       />
</div>
        <div>
          <label htmlFor="last_name" >Password:</label><br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={this.state.value}
            onChange={this.handleChange}  
            required
          />
        </div>
        <div className={this.state.loginStatus}>{this.state.loginMessage}</div>
        <button onClick={this.handleSubmit}>Submit</button>
      </fieldset>
    </form>
  

    </div>
        )
    }
}

export default Login;