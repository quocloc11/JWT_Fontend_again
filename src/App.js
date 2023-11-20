import Nav from './components/Navigation/Nav';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from "lodash"
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/register/Register';
import Users from './components/ManageUsers/Users';
import { useEffect, useState } from 'react';

function App() {
  const [account, setAccount] = useState({})
  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session))
    }
  }, [])

  return (
    <Router>
      <div className='app-container'>
        {
          account && !_.isEmpty(account) && account.isAuthenticated
          && <Nav />
        }

        <Switch>
          <Route path="/about">
            About
          </Route>
          <Route path="/news">
            News
          </Route>
          <Route path="/contact">
            contact
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/" exact>
            Home
          </Route>
          <Route path="*">
            404 not pound
          </Route>
        </Switch>

      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );

}

export default App;
