import './App.css';
import FamilyLogin from './components/FamilyLogin';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import Home from './patient/page/home';
import FamilyTree from './patient/page/familyTree';
import { backendEndpoint } from './static';
import SettingPage from './patient/page/setting';
import Photo from './patient/page/photo';

function App() {
  const user = localStorage.getItem("myid")
  if (!user) {
    const newUserId = parseInt(Math.random() * 2000000000)
    localStorage.setItem("myid", newUserId)

    const url = new URL(backendEndpoint + "user?user=" + newUserId)

    fetch(url, {
      method: "post"
    })
  }

  return (
    <BrowserRouter>
      {/* <Link to="/setting">Settings</Link> */}
      <Switch>
        <Route path="/family">
          <FamilyLogin>
            Hello World
          </FamilyLogin>
        </Route>
        <Route path="/tree">
          <FamilyTree />
        </Route>
        <Route path="/photo">
          <Photo />
        </Route>
        <Route path="/setting">
          <SettingPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
