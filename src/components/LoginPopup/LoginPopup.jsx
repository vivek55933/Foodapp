import React, { useState, useEffect } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
const LoginPopup = ({setShowLogin}) => {

  const[currState,setCurrState] = useState("Login")
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(()=>{
    // Clear fields when component mounts so popup always opens empty
    setName('')
    setEmail('')
    setPassword('')
  }, [])

  return (
    <div className='login-popup'>
      <form className='login-popup-container' autoComplete='off' onSubmit={e=>e.preventDefault()}>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=''/>
        </div>
        <div className='login-popup-inputs'>
          {currState==='Login'?<></>:<input type='text' name='name' autoComplete='name' value={name} onChange={e=>setName(e.target.value)} placeholder='Your name' required/>}
          <input type='email' name='email' autoComplete='off' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Your email' required/>
          <input type='password' name='password' autoComplete='new-password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' required/>
        </div>
        <button>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className='login-popup-condition'>
          <input type='checkbox' required/>
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here </span></p>
      :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here </span></p>}
      </form>
      </div>
  )
}

export default LoginPopup
