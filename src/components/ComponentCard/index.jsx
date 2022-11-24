import React from 'react';
import './index.scss';
import SelectComponent from 'components/Select';
import PulseLoaderComponent from 'components/Spinner/pulseLoader';
import PAGE_STATUS from 'constants/PageStatus';
const ComponentCard = ({
  title,
  icon,
  iconColor,
  value,
  isIncrease,
  percent,
  textPercent,
  options,
  defaultValue,
  handleChange,
  loading,
}) => {
  return (
    <div className="bg-white p-24 shadow-sm rounded-3">
      <div className="d-flex justify-content-between align-items-center mb-16">
        <div className="d-flex align-items-center">
          {icon && (
            <div
              className={`icon-card rounded-circle me-16`}
              style={{ background: hexToRGB(iconColor, 0.15) }}
            >
              <span
                className={`icon arrow d-inline-block align-text-bottom ms-auto`}
                style={{
                  WebkitMaskImage: `url(${icon})`,
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  backgroundColor: hexToRGB(iconColor),
                }}
              ></span>
            </div>
          )}
          <h6 className="mb-0 fw-semibold text-blue-0">{title}</h6>
        </div>
        {options && (
          <SelectComponent
            defaultValue={defaultValue}
            options={options}
            className={`fs-sm`}
            isBorder={true}
            arrowColor={'#222328'}
            onChange={handleChange}
          />
        )}
      </div>
      <div className="d-flex justify-content-between position-relative">
        {loading === PAGE_STATUS.LOADING && (
          <PulseLoaderComponent
            className="d-flex justify-content-start align-items-center bg-white"
            size="10px"
          />
        )}
        <h3 className="mb-0 fw-semibold fs-1 text-color">{value}</h3>
        <div className="d-flex flex-wrap align-item-center">
          {percent && (
            <div className="d-flex w-100 mb-sm justify-content-end">
              <span
                className={`icon-grown arrow d-inline-block align-text-bottom ms-auto text-primary ${
                  isIncrease ? 'bg-green' : 'bg-red'
                }`}
                style={{
                  WebkitMaskImage: `url(${
                    isIncrease ? '/assets/images/grown-up.svg' : '/assets/images/grown-down.svg'
                  })`,
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              ></span>
              <span className={`${isIncrease ? 'text-green' : 'text-danger'} fw-semibold`}>
                {isIncrease ? '+' : '-'}
                {percent}
              </span>
            </div>
          )}
          <div className="w-100 text-gray fs-sm text-end">{textPercent}</div>
        </div>
      </div>
    </div>
  );
};
function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

export default ComponentCard;
