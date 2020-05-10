import React from 'react';
import {Link} from 'react-router-dom';

const NewsListItem = (props)=>{

const deleteArticle= async (id)=>{
    console.log("article id is: " +id);
    try{
         const url = `http://localhost:4000/article/${id}/${localStorage['userId']}`;
       const response = await  fetch(url,{
method: 'delete',
headers: {
  'Content-Type': 'application/json',
  'authorization' : localStorage['token']
},
       }   
       
      );
      console.log(response);
          if(response.status === 200){
            alert("Article deleted successfully");
     window.location.reload();
          }
      }catch(error){
      console.log(error);
      alert(error);
      }
         
        }


   return (<li>
<em>{props.article.date_created}</em><br />
<img src={"http://localhost:4000/" + props.article.image_url} alt="article"/> <br />
<Link to="#"> {props.article.title}</Link>
                <br />
              <p>{props.article.description}</p>  
                <br />
<div className="list-action"> <Link to={"/edit/" + props.article.id} article={props.article}><button id="edit">Edit</button></Link> <span><button id="delete" onClick={()=>{ 
 if(window.confirm('Delete the item?')) {
        //Logic to delete the item
        deleteArticle(props.article.id);
    }
   }}>Delete</button></span></div>
</li>)
}

export default NewsListItem;