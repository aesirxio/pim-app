import { AesirXDatePicker as ComponentDatePicker, SVGComponent } from 'aesirx-uikit';

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
        classContainer="h-auto"
      />
      <SVGComponent url="/assets/images/calendar.svg" color="#00B96D" />
    </div>
  );
}

export default DatePicker;
