const Shift = ({ startTime, endTime, hours, paid }) => {
  const date = new Date(startTime).toLocaleDateString('en-US');
  const start = new Date(startTime).toLocaleTimeString('en-US');
  const end = new Date(endTime).toLocaleTimeString('en-US');
  const roundedHours = Math.round(hours * 100) / 100;
  return (
    <div className='shiftContainer'>
      <div className='shiftInfo'>
        <div>
          <div>Date: {date}</div>
          <div>Total Hours: {roundedHours}</div>
        </div>
        <div>
          <div>Start time: {start}</div>
          <div>End time: {end}</div>
        </div>
      </div>
      <div>
        {paid ? (
          <div>Paid </div>
        ) : (
          <button className='btn payBtn'>Mark as paid</button>
        )}
      </div>
    </div>
  );
};
export default Shift;
