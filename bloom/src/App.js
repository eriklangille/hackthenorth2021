import './App.scss';
import FamilyLogin from './components/FamilyLogin';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import Home from './patient/page/home';
import FamilyTree from './patient/page/familyTree';
import FamilyHome from './components/FamilyHome'
import { backendEndpoint } from './static';
import SettingPage from './patient/page/setting';
import Photo from './patient/page/photo';
import { userId } from './Utils/ids';

function App() {
  let user = localStorage.getItem(userId)
  if (!user) {
    user = parseInt(Math.random() * 2000000000)
    localStorage.setItem(userId, user)

    const url = new URL(backendEndpoint + "user?user=" + user)

    fetch(url, {
      method: "post"
    })
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/family">
          <FamilyLogin>
            <FamilyHome />
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
      <p class="userid">User ID: {user}</p>
    </BrowserRouter>
  );
}

export default App;
