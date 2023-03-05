import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetClockOutsQuery } from '../features/clock/clockApi';
import { clockApi } from '../features/clock/clockApi';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    data: clockOuts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetClockOutsQuery();

  console.log(clockOuts);

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   }
  // }, [user, navigate]);

  return (
    <>
      <div>Hello {user && user.name}</div>
    </>
  );
};
export default Home;
