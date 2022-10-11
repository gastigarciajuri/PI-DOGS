import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import { Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component= {LandingPage}/>
        <Route path = '/home' component= {Home}/>
      </Switch>
      <h1>Henry Dogs</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
