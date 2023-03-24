import { useState } from 'react';
import { useGetClockOutsQuery } from '../features/clock/clockApi';
import { useSelector } from 'react-redux';
import UpdatePayForm from './UpdatePayForm';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '3px solid',
    borderRadius: '10px',
    backgroundColor: '#52d1dcff',
  },
};

const Stats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetClockOutsQuery();
  const { user } = useSelector((state) => state.auth);

  let hoursArray;
  let totalHours;
  let averageHours;

  if (data) {
    hoursArray = data?.map((data) => data.hoursWorked);
    totalHours = hoursArray?.reduce((a, b) => a + b, 0).toFixed(2);
    averageHours = (totalHours / hoursArray.length).toFixed(2);
  }

  const hourlyRate = user.hourlyRate ? user.hourlyRate : 1;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className='statsContainer'>
        <div>
          <strong>Total Hours Worked:</strong> {totalHours}
        </div>
        <div>
          <strong>Average Shift Length:</strong>{' '}
          {isNaN(averageHours) ? 0 : averageHours} hours
        </div>
      </div>
      <div className='statsContainer'>
        <div>
          <strong>Hourly Pay:</strong> ${hourlyRate}{' '}
          <button onClick={openModal} className='openModalBtn'>
            Update
          </button>
        </div>
        <div>
          <strong>Total Earnings:</strong> $
          {(totalHours * hourlyRate).toFixed(2)}
        </div>

        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel='Update Pay Form'
          style={customStyles}
        >
          <UpdatePayForm closeModal={closeModal} hourlyRate={hourlyRate} />
        </Modal>
      </div>
    </>
  );
};
export default Stats;
