import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AllDevices from './Component/AllDevices/AllDevices';
import ViewData from './Component/ViewData/ViewData';
import AddData from './Component/AddData/AddData';
import EditData from './Component/EditData/EditData';
import AddDevice from './Component/AddDevice/AddDevice';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/home' element={
          <ProtectedRoute>
          <AllDevices/>
          </ProtectedRoute>
          }/>
        <Route path='/addDevice' element={
          <ProtectedRoute>
          <AddDevice/>
          </ProtectedRoute>
          }/>
        <Route path='/view/:id' element={
          <ProtectedRoute>
          <ViewData/>
          </ProtectedRoute>
          }/>
        <Route path='/addData/:Id' element={
          <ProtectedRoute>
          <AddData/>
          </ProtectedRoute>
          }/>
        <Route path='/editData/:id' element={
          <ProtectedRoute>
          <EditData/>
          </ProtectedRoute>
          }/>
      </Routes>
    </div>
  );
}

export default App;
