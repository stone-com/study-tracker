import { useState } from 'react';

const UpdatePayForm = ({ closeModal }) => {
  const [payRate, setPayRate] = useState('');

  const updatePayRate = (e) => {
    e.preventDefault();
    console.log('New pay rate:', payRate);
    closeModal();
    // Here you can perform some action with the new pay rate, like sending it to a server
  };

  return (
    <form onSubmit={updatePayRate}>
      <label>
        Hourly Pay Rate:
        <input
          type='number'
          step='0.01'
          value={payRate}
          onChange={(event) => setPayRate(event.target.value)}
        />
      </label>
      <button type='submit'>Update Pay Rate</button>
    </form>
  );
};

export default UpdatePayForm;
