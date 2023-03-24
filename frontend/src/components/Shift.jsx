import { useMarkAsPaidMutation } from '../features/clock/clockApi';

const Shift = ({ startTime, endTime, hours, paid, id }) => {
  const date = new Date(startTime).toLocaleDateString('en-US');
  const start = new Date(startTime).toLocaleTimeString('en-US');
  const end = new Date(endTime).toLocaleTimeString('en-US');
  const roundedHours = Math.round(hours * 100) / 100;

  const [markAsPaid] = useMarkAsPaidMutation();

  return (
    <div className='shiftContainer'>
      <div className='shiftInfo'>
        <div>
          <div>
            <strong>Date:</strong> {date}
          </div>
          <div>
            <strong>Total Hours:</strong> {roundedHours}
          </div>
        </div>
        <div>
          <div>
            <strong>Start Time:</strong> {start}
          </div>
          <div>
            <strong>End Time:</strong> {end}
          </div>
        </div>
      </div>
      <div>
        {paid === true ? (
          <div>
            <strong>Paid</strong> ✅
          </div>
        ) : (
          <button className='btn payBtn' onClick={() => markAsPaid(id)}>
            Mark as paid
          </button>
        )}
      </div>
    </div>
  );
};
export default Shift;
