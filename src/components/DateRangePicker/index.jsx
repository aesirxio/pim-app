import ComponentDatePicker from 'components/ComponentDatePicker';
import ComponentSVG from 'components/ComponentSVG';
import React, { useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import './index.scss';

const DateRangePicker = (props) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const { t, viewModelArr } = props;

  return (
    <div
      style={{ minHeight: '50px' }}
      ref={datePickerRef}
      className="d-flex align-items-center bg-white rounded-1 shadow-sm daterange-picker-wrapper"
    >
      <ComponentDatePicker
        isOpen={openDatePicker}
        setIsOpen={setOpenDatePicker}
        datePickerRef={datePickerRef}
        placeholder={t('txt_select_date')}
        viewModelArr={viewModelArr}
      />
      <div className="calendar-icon position-absolute top-50 translate-middle-y">
        <ComponentSVG url="/assets/images/calendar.svg" color="#00B96D" />
      </div>
    </div>
  );
};

export default withTranslation('common')(DateRangePicker);
