
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from './components/Body';
import Login from "./components/Login";
import Profile from './components/Profile';
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

function App() {

  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basemame="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/feed" element={<Feed />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div >
  )
}

export default App
