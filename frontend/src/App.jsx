
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Body from './Body';
import Login from "./Login";
import Profile from './Profile';

function App() {

  return (
    <div>
      <BrowserRouter basemame="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  )
}

export default App
