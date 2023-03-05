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

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match!');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            placeholder='Name'
          />
        </div>
        <div>
          <input
            type='text'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Email'
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Enter your password'
          />
        </div>
        <div>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            placeholder='Confirm your password'
          />
        </div>
        <div>
          <button type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
