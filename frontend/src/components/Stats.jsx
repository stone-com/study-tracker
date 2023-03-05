import { useGetClockOutsQuery } from '../features/clock/clockApi';

const Stats = () => {
  const { data } = useGetClockOutsQuery();
  const hoursArray = data.map((data) => data.hoursWorked);
  const totalHours = hoursArray.reduce((a, b) => a + b, 0).toFixed(2);
  const averageHours = totalHours / hoursArray.length;

  return (
    <div className='statsContainer'>
      <div>Total Hours Worked: {totalHours}</div>
      <div>Average Shift Length: {averageHours} hours</div>
    </div>
  );
};
export default Stats;
