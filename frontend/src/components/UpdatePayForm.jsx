import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePay } from '../features/auth/authSlice';

const UpdatePayForm = ({ closeModal }) => {
  const [payRate, setPayRate] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const updatePayRate = (e) => {
    e.preventDefault();
    console.log('New pay rate:', payRate);
    const userData = { id: user._id, hourlyPay: payRate };
    dispatch(updatePay(userData));
    closeModal();
  };

  return (
    <form onSubmit={updatePayRate}>
      <label>
        Hourly Pay Rate:
        <input
          type='number'
          step='0.01'
          value={payRate}
          onChange={(e) => setPayRate(e.target.value)}
        />
      </label>
      <button type='submit'>Update Pay Rate</button>
    </form>
  );
};

export default UpdatePayForm;
