import './App.css';
import FamilyLogin from './components/FamilyLogin';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './patient/page/home';
import FamilyTree from './patient/page/familyTree';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/family">
          <FamilyLogin>
            Hello World
          </FamilyLogin>
        </Route>
        <Route path="/tree">
          <FamilyTree />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
