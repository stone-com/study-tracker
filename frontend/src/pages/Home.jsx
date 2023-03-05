import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);
  
  return <div>Hello {user && user.name}</div>;
};
export default Home;
