import Spinner from 'components/Spinner';
import React from 'react';
import { useState } from 'react';
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Sector, Text } from 'recharts';
import './index.scss';
import { withTranslation } from 'react-i18next';
import numberWithCommas from 'utils/formatNumber';
const PieChartComponent = ({ data, colors, height, chartTitle, link, pieTitle, ...props }) => {
  const [activeIndex, setActiveIndex] = useState();
  const RADIAN = Math.PI / 180;
  const total = data.reduce((a, b) => ({ value: a.value + b.value }));
  console.log('data', data);
  const customizedLegend = ({ payload }) => {
    return (
      <ul className="piechart-legend mb-0 mt-1">
        {payload.map((entry, index) => (
          <li
            style={{ color: entry.color }}
            key={`item-${index}`}
            className={entry.value == 'No data' ? 'd-none' : ""}
          >
            <div
              className="cursor-pointer fs-sm d-flex align-items-center justify-content-between text-color fw-light pb-sm text-body"
              onClick={() => onPieEnter(entry, index)}
            >
              <span>{entry.value}</span>
              <span>
                {!isNaN(entry.payload.percent) ? (entry.payload.percent * 100).toFixed(2) : '0.00'}{' '}
                %
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  const onPieEnter = (_, index) => {
    if (total.value > 0) {
      setActiveIndex(index);
    }
  };
  const onPieLeave = () => {
    setActiveIndex(-1);
  };
  const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    value,
  }) => {
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 6) * cos;
    const sy = cy + (outerRadius + 6) * sin;
    const mx = cx + (outerRadius + 12) * cos;
    const my = cy + (outerRadius + 12) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 8;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g className="bg-white">
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 2}
          outerRadius={outerRadius + 5}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <rect width="90" height="52" x={ex + (cos >= 0 ? -0.5 : -7) * 12} y={ey - 21} rx="3" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="var(--bs-body-color)"
          className="fs-sm fw-semibold"
        >{`${t('txt_value')}: ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
          className="fs-sm"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const { t } = props;

  return (
    <div className="p-24 bg-white rounded-3 shadow-sm h-100">
      {chartTitle && (
        <div className="d-flex justify-content-between mb-2">
          <h5 className="fw-bold text-blue-0 text-uppercase fs-6">{chartTitle} </h5>
          {link && (
            <a href={link} className="fs-14 text-body">
              <span className="pe-1 text-color">{t('txt_view_detail')}</span>
              <span
                className="icon arrow d-inline-block align-text-bottom ms-auto bg-success"
                style={{
                  WebkitMaskImage: `url(/assets/images/arrow-right.svg)`,
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  width: '10px',
                  height: '16px',
                }}
              ></span>
            </a>
          )}
        </div>
      )}
      {data ? (
        <ResponsiveContainer width="100%" height={height ?? 500} className="bg-white">
          <PieChart>
            <Pie
              data={total.value > 0 ? data : [...data, { name: 'No data', value: 100 }]}
              cx="40%"
              cy="50%"
              outerRadius={90}
              innerRadius={72}
              labelLine={false}
              fill="#8884D8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
            >
              <Label
                content={(props) => {
                  const {
                    viewBox: { cx, cy },
                  } = props;
                  const positioningProps = {
                    x: cx,
                    y: cy - 4,
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                  };

                  return (
                    <Text
                      {...positioningProps}
                      fontSize="24px"
                      fontWeight="bold"
                      fill="var(--bs-body-color)"
                    >
                      {numberWithCommas(total.value)}
                    </Text>
                  );
                }}
              />
              <Label
                content={(props) => {
                  const {
                    viewBox: { cx, cy },
                  } = props;
                  const positioningProps = {
                    x: cx,
                    y: cy + 20,
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                  };
                  return (
                    <Text {...positioningProps} fill="var(--bs-body-color)">
                      {pieTitle}
                    </Text>
                  );
                }}
              />
              {data &&
                colors &&
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Legend
              layout="vertical"
              content={customizedLegend}
              onClick={onPieEnter}
              verticalAlign="middle"
              align="right"
              width="50%"
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default withTranslation('common')(PieChartComponent);
