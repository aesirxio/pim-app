import ComponentDatePicker from 'components/ComponentDatePicker';
import ComponentSVG from 'components/ComponentSVG';
import React, { useRef, useState } from 'react';

function DatePicker() {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  return (
    <div
      style={{ height: '50px' }}
      ref={datePickerRef}
      className="d-flex align-items-center px-24 bg-white rounded-3 shadow-sm"
    >
      <ComponentDatePicker
        isOpen={openDatePicker}
        setIsOpen={setOpenDatePicker}
        datePickerRef={datePickerRef}
      />
      <ComponentSVG url="/assets/images/calendar.svg" color="#00B96D" />
    </div>
  );
}

export default DatePicker;
