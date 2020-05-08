import React from 'react';
import {Link} from 'react-router-dom';
import history from '../components/services/history';
import './edit.css';
import axios from 'axios';


class Edit extends React.Component{
constructor(props){
    super(props);
    this.state = {};
}


componentDidMount(){
  this.getArticles(); 
  }
  
  fetch  = async () =>{
      try{
        const url = `http://localhost:4000/article/${this.props.match.params.id}`;
        const response = await fetch(url, {
  method: 'get'
       })
       return response.json();
      
  }
      catch(error){
  this.setState({error});
      }
      
  }
  
  getArticles = async () =>{
      const data = await this.fetch();
      const stateData=data.data[0];
      console.log("data is: " + JSON.stringify( ));
      this.setState(stateData);
      console.log(this.state);

  }

  handleChange = event => {
    const target = event.target;
    const value = target.name === 'image' ? target.files[0] : target.value;
    const name = target.name;
        this.setState({
          [name]: value

      });
    }
  

handleSubmit = async event => {
console.log(this.state);
const data = this.state;
try{
  const fd = new FormData();
  fd.append("title", this.state.title);
  fd.append("description", this.state.description);
  fd.append("image", this.state.image, this.state.image.name);
  fd.append("date", this.state.date);

   const url = `http://localhost:4000/article/${this.props.match.params.id}`;
    event.preventDefault()
 const response = await  axios.put(
url, 
fd,
{
onUploadProgress: progressEvent => {
  console.log("upload progress " + Math.round((progressEvent.loaded / progressEvent.total)*100) + "%");
}}
    );
    if(response.status === 200){
      alert("Article updated successfully");
history.push('/admin');
    
    }
}catch(error){
console.log(error);
alert(error);
}
   
  }

    render(){
        return( 
  
            <div className="edit-form">
               
                <div className="edit-news-panel">
          <div className="heading"> <Link to="/admin"><a>Go back</a> </Link>     <span> Edit news</span> </div>   
          
          <form >
      <fieldset>

      <div>
          <label htmlFor="title" >Title:</label> <br />
          <input
            name="title"
            placeholder="Enter title"
            value={this.state.title}
            onChange={this.handleChange}  
            required
          />
        </div>
<div>
          <label htmlFor="description" >body:</label> <br />
          <input placeholder="Enter description"
          name="description"
            value={this.state.description}
            onChange={this.handleChange}  
            required
       />
</div>
<div>
          <label htmlFor="file" >Image Upload:</label> <br />
          <input placeholder="select image"
          name="image"
          type="file"
            value={this.state.value}
            onChange={this.handleChange}  
       />
</div>
<div>
          <label htmlFor="date" >Date:</label> <br />
          <input placeholder="E.g 21st December, 2018"
          name="date"
            value={this.state.date_created}
            onChange={this.handleChange}  
            required
       />
</div>
        <button onClick={this.handleSubmit}>Submit</button>
      </fieldset>
    </form>
  
          </div>
            </div>
       
        );
    }
}

export default Edit;
