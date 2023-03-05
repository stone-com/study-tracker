import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Perform sign up logic here
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email:</label>
          <input type='text' name='email' value={email} onChange={onChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Name:</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
