import React from 'react';
import './admin.css';
import Header from './header';
import News from './news';
import NewsList from './newsList';
import withAuth from './services/withAuth';

class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            loading:true,
user:'',
error:''
        }
    }

    handleRerender = (userId) => {
        console.log("rerendering");
        this.setState({
        })
      }

   
      componentDidMount(){
this.getUser();
console.log(this.state.user);
       
    }

fetch = async () =>{
    try{
 const url = 'http://localhost:4000/user/'+localStorage['userId'];
     const response =  await  fetch(url, {
    method: 'get',
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
      'authorization' : localStorage['token']
    },
         })
        return response.json();

    }
    catch(error){
this.setState({
    error
})
    }    
}

getUser = async () =>{
    try{
  const data = await this.fetch();
    this.setState({ loading: false, user: data.data  });
    }
    catch(error){
console.log(error);
    }
 
}

    render(){
       const{user} = this.state;
        return(
      
            <div className="admin">   
                <Header user={user.firstname} />
        <div className="panels"> 
        
         <News rerenderHandler ={this.handleRerender} /> 
     <NewsList />
          </div>
        </div>
     
        )
    }
}

export default withAuth(Admin);