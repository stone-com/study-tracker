import { useState } from 'react';

function FilterSelector() {
  const [selectedOption, setSelectedOption] = useState('all');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='radioContainer'>
      <div className='selector'>
        <div className='selector-item'>
          <input
            type='radio'
            id='radio1'
            name='selector'
            className='selector-item_radio'
            value='all'
            checked={selectedOption === 'all'}
            onChange={handleOptionChange}
          />
          <label htmlFor='radio1' className='selector-item_label'>
            All Shifts
          </label>
        </div>
        <div className='selector-item'>
          <input
            type='radio'
            id='radio2'
            name='selector'
            className='selector-item_radio'
            value='paid'
            checked={selectedOption === 'paid'}
            onChange={handleOptionChange}
          />
          <label htmlFor='radio2' className='selector-item_label'>
            Paid
          </label>
        </div>
        <div className='selector-item'>
          <input
            type='radio'
            id='radio3'
            name='selector'
            className='selector-item_radio'
            value='unpaid'
            checked={selectedOption === 'unpaid'}
            onChange={handleOptionChange}
          />
          <label htmlFor='radio3' className='selector-item_label'>
            Unpaid
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterSelector;
