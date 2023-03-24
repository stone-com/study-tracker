import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Shift from '../components/Shift';
import Stats from '../components/Stats';
import FilterSelector from '../components/FilterSelector';
import {
  useGetClockOutsQuery,
  useAddClockInMutation,
  useAddClockOutMutation,
  useGetMostRecentClockInQuery,
} from '../features/clock/clockApi';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('all');
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

  if (isLoading || recentClockinLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <section className='heading'>
        <h1>Hello {user && user.name}</h1>
        <p className='clockInfo'>
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

      <FilterSelector
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className='container shiftGroup'>
        {selectedOption === 'all' &&
          clockOuts &&
          clockOuts
            .map((clockout) => (
              <Shift
                startTime={clockout.startTime}
                endTime={clockout.endTime}
                hours={clockout.hoursWorked}
                comment={clockout.comment}
                key={clockout._id}
                id={clockout._id}
                paid={clockout.paid}
              />
            ))
            .reverse()}

        {selectedOption === 'paid' &&
          clockOuts &&
          clockOuts
            .filter((clockout) => clockout.paid === true)
            .map((clockout) => (
              <Shift
                startTime={clockout.startTime}
                endTime={clockout.endTime}
                hours={clockout.hoursWorked}
                comment={clockout.comment}
                key={clockout._id}
                id={clockout._id}
                paid={clockout.paid}
              />
            ))
            .reverse()}

        {selectedOption === 'unpaid' &&
          clockOuts &&
          clockOuts
            .filter((clockout) => clockout.paid === false)
            .map((clockout) => (
              <Shift
                startTime={clockout.startTime}
                endTime={clockout.endTime}
                hours={clockout.hoursWorked}
                comment={clockout.comment}
                key={clockout._id}
                id={clockout._id}
                paid={clockout.paid}
              />
            ))
            .reverse()}
      </div>
    </div>
  );
};
export default Home;
