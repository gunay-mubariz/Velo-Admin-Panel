import './App.css';
import { Switch, Route } from 'react-router-dom';

import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Edit from './pages/Edit/Edit';
import Create from './pages/Create/Create';
import SingleProduct from './pages/SingleProduct/SingleProduct';

axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products/:id' component={SingleProduct} />
        <Route exact path='/edit/:id' component={Edit} />
        <Route exact path='/create' component={Create} />
      </Switch>
    </div>
  );
}

export default App;
