import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from './userSlice'
import { store } from './Store'

const Login = () => {
  let Navigate = useNavigate();
  let [user, setuser] = useState({ email: "", password: "" })
  const dispatch = useDispatch()
  const change = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <div className="row">
      <div className="col-sm-3 container shadow-lg mt-sm-5 rounded-5">
        <form onSubmit={(e) => {
          e.preventDefault();
          dispatch(login(user))
        }}>
          <div className="form-outline pt-sm-5">
            <h4 className='text-center text-danger'>User Login</h4>
            <label className="form-label fs-5 fw-semibold" >Email address</label>
            <input type="email" onChange={change} placeholder='enter email' value={user.email} required name='email' className="form-control fs-5" />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label fs-5 fw-semibold" for="form2Example2">Password</label>
            <input type="password" onChange={change} placeholder='enter password' value={user.password} required name='password' className="form-control fs-5" />
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                <label className="form-check-label" for="form2Example31"> Remember me </label>
              </div>
            </div>
          </div>
          <div className="col pb-sm-3 fw-semibold">
            <Link to={'/Home'}>Back to Home</Link>
          </div>
          <button onClick={() => {
            Navigate('/Home')
          }} className="btn btn-primary mb-4">Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Login