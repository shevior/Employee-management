// import logo from './logo.svg';
import './App.css';
import AddWorker from './worker/AddWorker';
import EditWorker from './worker/EditWorker';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Role from './role/Roles';
import Workers from './worker/Workers';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/workers' element={<Workers />} />
        <Route path='/workers/add' element={<AddWorker />} />
        <Route path='/workers/edit' element={<EditWorker />} />
        <Route path='/roles' element={<Role />} />
      </Routes>
  );
}

export default App;
