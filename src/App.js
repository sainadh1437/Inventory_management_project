import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Add from './component/Add';
import Dashboard from './component/Dashboard';
import NavBar from './component/NavBar';
import Home from './component/Home';
import Login from './component/Login';
import Update from './component/Update';

function App() {
  const location = useLocation();
  const apiKey = "localhost:7050"
  console.log(apiKey)
  return (
    <>
    <div>
    <NavBar currentRoute={location.pathname} />
    <Routes>
    <Route path='/' element={<Home/>} /> 
    <Route path='/login' element={<Login apiKey={apiKey}/>}/> 
    <Route path='/add' element={<Add apiKey={apiKey}/>} />
    <Route path='/dashboard' element={<Dashboard apiKey={apiKey}/>} />
    <Route path='/update' element={<Update apiKey={apiKey}/>}/>
    </Routes>
    </div>
    </>
  );
}

export default App;