import React from 'react';
import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;
    const onChange = () => {}


  return <>
  <section className="heading">
    <h1>
        <FaUser /> Register

    </h1>
    <p>Please create an account</p>
    </section>
    <section className="form">
    <form>
        <div className="form-group">
            <input type="text" className='form-control' placeholder="Enter the name" id='name' name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
            <input type="email" placeholder="Email Address" id='email' name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
            <input type="password" placeholder="Password" id='password' name="password" value={password} onChange={onChange} required />
        </div>
        <div className="form-group">
            <input type="password" placeholder="Confirm Password" id='password2' name="password2" value={password2} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
    </form>
    </section>
  </>
}

export default Register;
 