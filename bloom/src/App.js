import logo from './logo.svg';
import './App.css';
import FamilyLogin from './components/FamilyLogin';
import { Route, Router, BrowserRouter, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/user">
          <div>Hello world</div>
        </Route>
      </Switch>
      <Switch>
        <Route path="/family">
          <FamilyLogin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
