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

    // Use this in the future to calculate average hours per week and total number of hours per week

  // function getLastSunday() {
  //   const date = new Date();
  //   const today = date.getDate();
  //   const currentDay = date.getDay();
  //   const newDate = date.setDate(today - (currentDay || 7));
  //   return new Date(newDate);
  // }

  // console.log(getLastSunday());

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (isLoading || recentClockinLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <section className='heading'>
        <h1>Hello {user && user.name}</h1>
        <p>
          You are currently clocked{' '}
          {mostRecentClockIn?.isClockedOut || !mostRecentClockIn ? 'Out' : 'In'}
        </p>
      </section>
      <Stats />
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
      <div className='container'>
        {clockOuts &&
          clockOuts
            .map((clockout) => (
              <Shift
                startTime={clockout.startTime}
                endTime={clockout.endTime}
                hours={clockout.hoursWorked}
                comment={clockout.comment}
              />
            ))
            .reverse()}
      </div>
    </div>
  );
};
export default Home;
