import './App.css';
import FamilyLogin from './components/FamilyLogin';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

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
          <FamilyLogin>
            Hello World
          </FamilyLogin>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
