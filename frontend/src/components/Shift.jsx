const Shift = ({ startTime, endTime, hours, comment }) => {
  const start = new Date(startTime).toLocaleDateString('en-US');
  const end = new Date(endTime).toLocaleDateString('en-US');
  return (
    <div className='container'>
      <div>Start time: {start}</div>
      <div>End time: {end}</div>
      <div>Total Hours: {hours}</div>
      <div>Comment: {comment}</div>
    </div>
  );
};
export default Shift;
