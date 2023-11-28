import Nav from './components/Navigation/Nav';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { RevolvingDot } from 'react-loader-spinner'
import { UserContext } from './context/UserContext';
function App() {
  const { user } = useContext(UserContext)
  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className='loading-container'>
            <RevolvingDot
              height="120"
              width="120"
              radius="9"
              color='#1877f2'

            />
            <div>
              Loading data...
            </div>
          </div>

          :
          <>
            <div className='app-header'>
              <Nav />
            </div>
            <div className='app-container'>
              <AppRoutes />
            </div>
          </>
        }

      </Router>

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
    </>
  );

}

export default App;
