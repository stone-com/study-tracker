import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePay } from '../features/auth/authSlice';

const UpdatePayForm = ({ closeModal, hourlyRate }) => {
  const [payRate, setPayRate] = useState(hourlyRate);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const updatePayRate = (e) => {
    e.preventDefault();
    console.log('New pay rate:', payRate);
    const userData = { id: user._id, hourlyRate: payRate };
    dispatch(updatePay(userData));
    closeModal();
  };

  return (
    <form onSubmit={updatePayRate} className='updatePayForm'>
      <label>
        Hourly Pay Rate:
        <input
          className='payInput'
          type='number'
          step='0.01'
          value={payRate}
          onChange={(e) => setPayRate(e.target.value)}
        />
      </label>
      <button type='submit' className='submitModalBtn'>
        Update Pay Rate
      </button>
    </form>
  );
};

export default UpdatePayForm;
