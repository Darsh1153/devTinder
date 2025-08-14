
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Body from './Body'
import Login from './components/Login'
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Connections from './components/Connections';
import Requests from "./components/RequestConnections";

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path='/' element={<Feed />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/connections' element={<Connections />}></Route>
              <Route path='/requests' element={<Requests />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
