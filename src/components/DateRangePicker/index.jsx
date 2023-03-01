import ComponentDatePicker from 'components/ComponentDatePicker';
import ComponentSVG from 'components/ComponentSVG';
import React, { useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import './index.scss';

const DateRangePicker = (props) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const { t, viewModel } = props;

  return (
    <div
      style={{ minHeight: '40px' }}
      ref={datePickerRef}
      className="d-flex align-items-center bg-white rounded-1 daterange-picker-wrapper"
    >
      <div className="calendar-icon calendar-icon-start position-absolute top-50 translate-middle-y">
        <ComponentSVG url="/assets/images/clock.svg" color="#C0C0C0" />
      </div>
      <ComponentDatePicker
        isOpen={openDatePicker}
        setIsOpen={setOpenDatePicker}
        datePickerRef={datePickerRef}
        placeholder={t('txt_select_date')}
        viewModel={viewModel}
      />
      <div className="calendar-icon calendar-icon-end position-absolute top-50 translate-middle-y">
        <i className="icons text-green">
          <ComponentSVG url="/assets/images/calendar.svg" className={'bg-green'} />
        </i>
      </div>
    </div>
  );
};

export default withTranslation('common')(DateRangePicker);
