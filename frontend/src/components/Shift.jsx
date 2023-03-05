const Shift = ({ startTime, endTime, hours, comment }) => {
  const date = new Date(startTime).toLocaleTimeString('en-US');
  const start = new Date(startTime).toLocaleTimeString('en-US');
  const end = new Date(endTime).toLocaleTimeString('en-US');
  const roundedHours = Math.round(hours * 100) / 100;
  return (
    <div className='container'>
      <div>Date: {start}</div>
      <div>Start time: {start}</div>
      <div>End time: {end}</div>
      <div>Total Hours: {roundedHours}</div>
      <div>Comment: {comment}</div>
    </div>
  );
};
export default Shift;
