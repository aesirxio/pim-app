import Spinner from 'components/Spinner';
import React from 'react';
import { useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import './index.scss';
import { withTranslation } from 'react-i18next';
const PieChartComponent = ({ data, colors, height, chartTitle, link, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const RADIAN = Math.PI / 180;

  const customizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="fw-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const customizedLegend = ({ payload }) => {
    return (
      <ul className="piechart-legend mb-0 mt-1">
        {payload.map((entry, index) => (
          <li style={{ color: entry.color }} key={`item-${index}`}>
            <span
              onClick={() => onPieEnter(entry, index)}
              className="cursor-pointer fs-sm text-color"
            >
              {entry.value}
            </span>
          </li>
        ))}
      </ul>
    );
  };
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
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
      <g>
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
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="var(--body-color)"
          className="fw-semibold"
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
        <div className="d-flex justify-content-between">
          <h5 className="fw-semibold text-blue-0">{chartTitle} </h5>
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
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              labelLine={false}
              label={customizedLabel}
              fill="#8884D8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
            >
              {data &&
                colors &&
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Legend content={customizedLegend} onClick={onPieEnter} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default withTranslation('common')(PieChartComponent);
