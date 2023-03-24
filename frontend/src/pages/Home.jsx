import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Shift from '../components/Shift';
import Stats from '../components/Stats';
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

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // `Clocked in at ${new Date(
  //   mostRecentClockIn.startTime
  // ).toLocaleTimeString('en-US')}`

  if (isLoading || recentClockinLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <section className='heading'>
        <h1>Hello {user && user.name}</h1>
        <p>
          {mostRecentClockIn?.isClockedOut || !mostRecentClockIn
            ? 'You are currently clocked out'
            : `Clocked in at ${new Date(
                mostRecentClockIn.startTime
              ).toLocaleTimeString('en-US')}`}
        </p>
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
      </section>
      <h2 className='label'>Your Stats</h2>
      <Stats />
      <h2 className='label'>Your shifts</h2>
      <div className='container'>
        {clockOuts &&
          clockOuts
            .map((clockout) => (
              <Shift
                startTime={clockout.startTime}
                endTime={clockout.endTime}
                hours={clockout.hoursWorked}
                comment={clockout.comment}
                key={clockout._id}
              />
            ))
            .reverse()}
      </div>
    </div>
  );
};
export default Home;
