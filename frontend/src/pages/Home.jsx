import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useGetClockOutsQuery,
  useAddClockInMutation,
  useAddClockOutMutation,
  useGetMostRecentClockInQuery,
} from '../features/clock/clockApi';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [clockIn] = useAddClockInMutation();
  const [clockOut] = useAddClockOutMutation();

  const {
    data: clockOuts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetClockOutsQuery();

  const { data: mostRecentClockIn } = useGetMostRecentClockInQuery();

  console.log(clockOuts);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <div>Hello {user && user.name}</div>
      <div>
        You are currently clocked{' '}
        {mostRecentClockIn?.isClockedOut ? 'Out' : 'In'}
      </div>
      <div>
        {clockOuts &&
          clockOuts.map((clockout) => (
            <div>
              <h1>Hours worked: {clockout.hoursWorked}</h1>
            </div>
          ))}
      </div>
      {mostRecentClockIn?.isClockedOut ? (
        <div>
          <button onClick={clockIn}>CLOCK IN TEST</button>
        </div>
      ) : (
        <div>
          <button onClick={clockOut}>CLOCK OUT TEST</button>
        </div>
      )}
    </>
  );
};
export default Home;
