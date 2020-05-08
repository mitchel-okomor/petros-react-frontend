
//news article form

import React from 'react';
import './news.css';
import axios from 'axios';

class News extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
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
  
     const url = `http://localhost:4000/article/${localStorage["userId"]}`;
      event.preventDefault()
   const response = await  axios.post(
 url, 
 fd,
 {
  onUploadProgress: progressEvent => {
    console.log("upload progress " + Math.round((progressEvent.loaded / progressEvent.total)*100) + "%");
  }}
      );
      if(response.status === 200){
        alert("Article Added successfully");
 window.location.reload();
      
      }
  }catch(error){
  console.log(error);
  alert(error);
  }
     
    }
    render(){
        return(
            <div className="news-panel">
              <h2> Create News</h2>
              <hr />
              <br />
              <form >
      <fieldset>

      <div>
          <label htmlFor="title" >Title:</label> <br />
          <input
            name="title"
            placeholder="Enter title"
            value={this.state.value}
            onChange={this.handleChange}  
            required
          />
        </div>
<div>
          <label htmlFor="description" >body:</label> <br />
          <input placeholder="Enter description"
          name="description"
            value={this.state.value}
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
            value={this.state.value}
            onChange={this.handleChange}  
            required
       />
</div>
        <button onClick={this.handleSubmit}>Submit</button>
      </fieldset>
    </form>
  
          </div>
        );
    }
}

export default News;