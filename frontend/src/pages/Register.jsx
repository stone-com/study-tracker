import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match!');
    } else {
      const userData = {
        name,
        email: email.toLowerCase(),
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <div>
      <section className='heading'>
        <h1>Register</h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Name'
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Email'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter your password'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm your password'
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
