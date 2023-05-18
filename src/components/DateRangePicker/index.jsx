import { AesirXDatePicker } from 'aesirx-uikit';
import ComponentSVG from 'components/ComponentSVG';
import React, { useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import './index.scss';
import moment from 'moment';

const DateRangePicker = (props) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const { placeholder, viewModel } = props;

  const [dateRange, setDateRange] = useState([
    moment(viewModel.filterDate['filter[start_date]']).toDate(),
    moment(viewModel.filterDate['filter[end_date]']).toDate(),
  ]);

  const [startDate, endDate] = dateRange;

  return (
    <div
      ref={datePickerRef}
      className="bg-white rounded-1 daterange-picker-wrapper position-relative z-index-10 h-100 cursor-pointer"
    >
      <AesirXDatePicker
        isOpen={openDatePicker}
        setIsOpen={setOpenDatePicker}
        datePickerRef={datePickerRef}
        placeholder={placeholder}
        onChange={setDateRange}
        dateStart={startDate}
        dateEnd={endDate}
        classContainer="h-auto"
      />
      <div className="calendar-icon calendar-icon-end position-absolute top-50 translate-middle-y">
        <i className="icons text-green">
          <ComponentSVG url="/assets/images/calendar.svg" className={'bg-green'} />
        </i>
      </div>
    </div>
  );
};

export default withTranslation()(DateRangePicker);
