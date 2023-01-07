import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'

function App() {

  const websiteuser = useSelector(state => state.user.websiteuser) // "const websiteuser" is declared to be equal to the "websiteuser" property of the object which i named "user" at some point in userSlice.jsx. The properties of the "user" were written in the "initial state" part of the userSlice.jsx where i stated their initial state values.

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={websiteuser ? <Home /> : <Navigate to="/login" />} />
            <Route path="login" element={!websiteuser ? <Login /> : <Navigate to="/" />} />
            <Route path="register" element={!websiteuser ? <Register /> : <Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
