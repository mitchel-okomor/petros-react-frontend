import React from 'react';
import './newsList.css';
import NewsListItem from './newsListItem';


class NewsList extends React.Component{
constructor(props){
    super(props);
    this.state = {
        isLoading:true,
        articles:[]
    };
}

componentDidMount(){
this.getArticles(); 
    
}

fetch  = async () =>{
    try{
 const url = 'http://localhost:4000/articles';
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
    console.log("data is: " +data.data[0]);
    this.setState({ loading: false, articles: data.data });
}

    render(){
   const {articles} = this.state;
        return(
            <div className="news-edit-panel">
            <div className="news">
               <h2>Latest News</h2>
               <br />
               <ul>
               {articles.map(article=>{
   return <NewsListItem key={article.id} article={article} />
})}

               
               </ul>
             
             </div>
         </div>
        )
    }
}

export default NewsList;