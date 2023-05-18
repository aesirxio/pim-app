import { AesirXDatePicker } from 'aesirx-uikit';
import ComponentSVG from 'components/ComponentSVG';
import React, { useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import './index.scss';
import moment from 'moment';
import { FORMAT_DATE_UPDATE_POST } from 'constants/FormFieldType';

const DateRangePicker = (props) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const { placeholder, isDays, viewModel } = props;

  const [dateRange, setDateRange] = useState([
    viewModel.filterDate['filter[start_date]']
      ? moment(viewModel.filterDate['filter[start_date]']).toDate()
      : null,
    viewModel.filterDate['filter[start_date]']
      ? moment(viewModel.filterDate['filter[end_date]']).toDate()
      : null,
  ]);

  const [startDate, endDate] = dateRange;
  const handleChangeDate = (startDate, endDate) => {
    setDateRange([startDate, endDate]);
  };

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
        onChange={handleChangeDate}
        dateStart={startDate}
        dateEnd={endDate}
        isDays={isDays}
        setDateFilter={async (startDate, endDate) => {
          await viewModel?.getStatisticalDataByDate(
            moment(startDate).format(FORMAT_DATE_UPDATE_POST),
            moment(endDate).format(FORMAT_DATE_UPDATE_POST)
          );
        }}
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
