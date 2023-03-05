import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Shift from '../components/Shift';
import {
  useGetClockOutsQuery,
  useAddClockInMutation,
  useAddClockOutMutation,
  useGetMostRecentClockInQuery,
} from '../features/clock/clockApi';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [clockIn] = useAddClockInMutation();
  const [clockOut] = useAddClockOutMutation();

  const { data: clockOuts, isLoading } = useGetClockOutsQuery();

  const { data: mostRecentClockIn, isLoading: recentClockinLoading } =
    useGetMostRecentClockInQuery();

  console.log(clockOuts);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (isLoading || recentClockinLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div>Hello {user && user.name}</div>
      <div>
        You are currently clocked{' '}
        {mostRecentClockIn?.isClockedOut || !mostRecentClockIn ? 'Out' : 'In'}
      </div>
      <div>
        {clockOuts &&
          clockOuts.map((clockout) => (
            <Shift
              startTime={clockout.startTime}
              endTime={clockout.endTime}
              hours={clockout.hoursWorked}
              comment={clockout.comment}
            />
          ))}
      </div>
      {mostRecentClockIn?.isClockedOut || !mostRecentClockIn ? (
        <div>
          <button onClick={clockIn} className='btn btn-block'>
            CLOCK IN
          </button>
        </div>
      ) : (
        <div>
          <button onClick={clockOut} className='btn btn-block'>
            CLOCK OUT
          </button>
        </div>
      )}
    </>
  );
};
export default Home;
