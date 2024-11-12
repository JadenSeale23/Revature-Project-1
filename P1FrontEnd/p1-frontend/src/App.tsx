import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Component/LoginRegister/Login';
import { Register } from './Component/LoginRegister/Register';
import 'bootstrap/dist/css/bootstrap.css';
import { ReimbursementContainer } from './Component/Reimbursement/ReimbursementContainer';
import { NewReimbursement } from './Component/Reimbursement/NewReimbursement';
import { ChangeStatus } from './Component/Reimbursement/ChangeStatus';
import { PendingReimbursementContainer } from './Component/Reimbursement/PendingReimbursementContainer';
import { UserContainer } from './Component/User/UserContainer';
import { DeleteUser } from './Component/User/DeleteUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element = {<Login/>}/>
          <Route path="/register" element = {<Register/>}/>
          <Route path="/reimbursements" element = {<ReimbursementContainer/>}/>
          <Route path="/newReimbursements" element = {<NewReimbursement/>}/> 
          <Route path="/changeStatus" element = {<ChangeStatus/>}/>
          <Route path="/pendingReimbursements" element = {<PendingReimbursementContainer/>}/>
          <Route path="/users" element = {<UserContainer/>}/>
          <Route path="/deleteUser" element = {<DeleteUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
