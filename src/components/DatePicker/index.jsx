/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ComponentSVG from 'components/ComponentSVG';
import { FORMAT_DATE_TIME_UPDATE_POST } from 'constants/FormFieldType';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import './index.scss';

const CustomizedDatePicker = ({
  handleOnChange,
  defaultDate,
  dateFormat,
  isDisabled,
  showTimeSelect,
  placeholderText,
  isUTC,
}) => {
  const [startDate, setStartDate] = useState();
  useEffect(() => {
    defaultDate &&
      setStartDate(
        isUTC
          ? new Date(moment(defaultDate).utc().format(FORMAT_DATE_TIME_UPDATE_POST))
          : new Date(moment(defaultDate).format(FORMAT_DATE_TIME_UPDATE_POST))
      );
  }, [defaultDate]);
  return (
    <div className="d-flex align-items-center bg-white position-relative date-picker">
      <div className="calendar-icon calendar-icon-start position-absolute top-50 translate-middle-y">
        <ComponentSVG url="/assets/images/clock.svg" color="#C0C0C0" />
      </div>
      <DatePicker
        dateFormat={dateFormat ?? 'MMM d, yyyy'}
        selected={startDate}
        wrapperClassName="w-100"
        onChange={(date) => {
          handleOnChange(date);
          setStartDate(date);
        }}
        showTimeSelect={showTimeSelect}
        adjustDateOnChange
        fixedHeight={40}
        className={`ps-4 m-0 border-0 outline-none position-relative border-1 rounded-1 ${
          isDisabled ? 'bg-gray-300 text-body' : 'bg-white text-body'
        }`}
        readOnly={isDisabled}
        placeholderText={placeholderText ?? dateFormat ?? null}
      />
    </div>
  );
};
export default CustomizedDatePicker;
