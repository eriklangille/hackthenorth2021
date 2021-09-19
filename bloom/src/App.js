import './App.css';
import FamilyLogin from './components/FamilyLogin';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import Home from './patient/page/home';
import FamilyTree from './patient/page/familyTree';
import { backendEndpoint } from './static';
import SettingPage from './patient/page/setting';

function App() {
  let user = localStorage.getItem("myid")
  if (!user) {
    user = parseInt(Math.random() * 2000000000)
    localStorage.setItem("myid", user)

    const url = new URL(backendEndpoint + "user?user=" + user)

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
        <Route path="/setting">
          <SettingPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <p class="userid">User ID: {user}</p>
    </BrowserRouter>
  );
}

export default App;
