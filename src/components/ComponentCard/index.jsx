import React from 'react';
import './index.scss';
import PulseLoaderComponent from 'components/Spinner/pulseLoader';
import PAGE_STATUS from 'constants/PageStatus';
import history from 'routes/history';
const ComponentCard = ({
  title,
  icon,
  iconColor,
  value,
  isIncrease,
  percent,
  textPercent,
  loading,
  titleLink,
  link,
}) => {
  return (
    <div className="bg-white p-24 shadow-sm rounded-3 h-100">
      <div className="d-flex justify-content-between align-items-center mb-8px">
        <div className="d-flex align-items-center flex-wrap">
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
          <h6 className="mb-0 text-gray w-100 mt-24 text-uppercase">{title}</h6>
        </div>
      </div>
      <div className="d-flex justify-content-between position-relative">
        {loading === PAGE_STATUS.LOADING && (
          <PulseLoaderComponent
            className="d-flex justify-content-start align-items-center bg-white"
            size="10px"
          />
        )}
        <h3 className="mb-0 fw-bold fs-1 text-color">{value}</h3>
        <div className="d-flex flex-wrap align-item-center">
          {percent && (
            <div className="d-flex w-100 mb-sm justify-content-end">
              <span
                className={`icon-arrow d-inline-block align-text-bottom ms-auto text-primary ${
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
      <hr className="border my-24" />
      <a
        className="mb-0 fs-6 w-100 text-uppercase text-body fw-semibold d-flex align-items-center text-decoration-none cursor-pointer"
        onClick={() => {
          history.push(link);
        }}
      >
        {titleLink}
        <span
          className={`icon-arrow d-inline-block ms-16 bg-black`}
          style={{
            WebkitMaskImage: `url("/assets/images/arrow-long-right.svg")`,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
          }}
        ></span>
      </a>
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
