import ComponentNoData from 'components/ComponentNoData';
import HeaderFilterComponent from 'components/HeaderFilterComponent';
import PAGE_STATUS from 'constants/PageStatus';
import React from 'react';
import { withTranslation } from 'react-i18next';
import './index.scss';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import RingLoaderComponent from 'components/Spinner/ringLoader';
const AreaChartComponent = ({
  data,
  height,
  lineType,
  areaColors,
  lineColors,
  chartTitle,
  lines,
  isDot,
  hiddenGrid,
  XAxisOptions, // Line Ngang
  YAxisOptions, // Line Doc
  loading,
  tooltipComponent,
  // ...props
}) => {
  const customizedTooltip = ({ payload }) => {
    return (
      <div className="areachart-tooltip p-15 text-white bg-blue-5 rounded-3">
        <p className="text-uppercase fw-semibold fs-12 mb-sm">{tooltipComponent.header}</p>
        {payload &&
          payload.map((item, index) => {
            return (
              <p key={index} className="mb-0 fw-bold">
                {payload.length > 1 && `${item.name}: `}
                {tooltipComponent.value} {item.value}
              </p>
            );
          })}
      </div>
    );
  };
  return (
    <div className="bg-white rounded-3 p-24 shadow-sm h-100 ChartWrapper">
      <HeaderFilterComponent chartTitle={chartTitle} isSelection={true} filterButtons={true} />
      {loading === PAGE_STATUS.LOADING ? (
        <RingLoaderComponent className="d-flex justify-content-center align-items-center bg-white" />
      ) : data.length ? (
        <>
          <ResponsiveContainer width="100%" height={height ?? 500}>
            <AreaChart data={data}>
              {lines && (
                <defs>
                  {lines.map((item, index) => {
                    return (
                      <linearGradient
                        key={index}
                        id={`${item}_${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={areaColors[index]} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={areaColors[index]} stopOpacity={0} />
                      </linearGradient>
                    );
                  })}
                </defs>
              )}
              <CartesianGrid
                strokeDasharray="7 7"
                vertical={hiddenGrid?.vertical ?? true}
                horizontal={hiddenGrid?.horizontal ?? true}
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={XAxisOptions?.axisLine ?? false}
                padding={XAxisOptions?.padding}
                style={{
                  fontSize: '14px',
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={YAxisOptions?.axisLine ?? false}
                padding={YAxisOptions?.padding}
                style={{
                  fontSize: '14px',
                }}
              />
              <Tooltip content={customizedTooltip} />
              {lines &&
                lines.map((item, index) => {
                  return (
                    <Area
                      key={index}
                      dot={isDot && { strokeWidth: 4 }}
                      activeDot={{ strokeWidth: 2, r: 7 }}
                      type={lineType ?? 'temperature'}
                      dataKey={item}
                      stroke={lineColors[index]}
                      fillOpacity={1}
                      fill={`url(#${item}_${index})`}
                      strokeWidth={2}
                    />
                  );
                })}
            </AreaChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div className="position-absolute top-50 start-50 translate-middle">
          <ComponentNoData icons="/assets/images/ic_project.svg" title="No Data" width="w-50" />
        </div>
      )}
    </div>
  );
};
export default withTranslation('common')(AreaChartComponent);
