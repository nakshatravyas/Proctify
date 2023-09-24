import * as React from 'react';
import { useNavigate } from "react-router-dom";

export default function DisableElevation() {
  const navigate = useNavigate()
  return (
    <div className="container">
      <div class="home">
        <h1 style={{margin:"0px",fontSize:"3rem",color:"black"}}>Proctify</h1>
        <p id='tagline'>Lets catch the cheater m*therfucker</p>
        <button className='btn_login' id='login' onClick={e => navigate('/login')}>Login</button>
        <button className='btn_login'onClick={e => navigate('/register')}>Register</button>
      </div>
    </div>
  );
}

    