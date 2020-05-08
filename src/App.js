import React from 'react';
import './App.css';
import {  Router, Switch, Route} from "react-router-dom";
import Login from './components/login';
import Admin from './components/admin';
import EditArticle from './components/edit';
import History from './components/services/history';
function App() {
  return (
    <div className="App">
      <Router history ={History}>
      <Switch>
        <Route exact path='/' component={Admin} />
        <Route exact path='/admin' component={Admin} />
<Route exact path ='/login' component={Login} />
<Route  path ='/edit/:id' component={EditArticle} />
      </Switch>
      </Router>

    </div>
  );
}

export default App;
