import { useGetClockOutsQuery } from '../features/clock/clockApi';

const Stats = () => {
  const { data } = useGetClockOutsQuery();
  const hoursArray = data?.map((data) => data.hoursWorked);
  const totalHours = hoursArray?.reduce((a, b) => a + b, 0).toFixed(2);
  const averageHours = (totalHours / hoursArray.length).toFixed(2);
  const hourlyPay = 0.5;

  return (
    <>
      <div className='statsContainer'>
        <div>Total Hours Worked: {totalHours}</div>
        <div>
          Average Shift Length: {isNaN(averageHours) ? 0 : averageHours} hours
        </div>
      </div>
      <div className='statsContainer'>
        <div>Hourly Pay: ${hourlyPay}</div>
        <div>Total Earnings: ${totalHours * hourlyPay}</div>
      </div>
    </>
  );
};
export default Stats;
