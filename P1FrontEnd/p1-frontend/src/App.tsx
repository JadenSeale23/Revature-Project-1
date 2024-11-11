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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
