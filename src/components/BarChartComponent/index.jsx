import HeaderFilterComponent from 'components/HeaderFilterComponent';
import Spinner from 'components/Spinner';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar } from 'recharts';
const BarChartComponent = (props) => {
  return (
    <div className="bg-white rounded-3 px-24 py-3 shadow-sm">
      {props.data ? (
        <>
          <HeaderFilterComponent
            chartTitle={props.chartTitle}
            viewMoreLink={props.viewMoreLink}
            filterButtons={props.filterButtons}
          />
          <ResponsiveContainer width="100%" height={props.height ?? 500}>
            <BarChart data={props.data} layout={'vertical'} margin={props.margin}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                axisLine={props.XAxisOptions?.axisLine ?? false}
                tickLine={false}
                style={{
                  fontSize: '12px',
                }}
              />
              <YAxis
                type="category"
                axisLine={props.YAxisOptions?.axisLine ?? false}
                tickLine={false}
                dataKey="name"
                style={{
                  fontSize: '12px',
                }}
              />
              <Tooltip />
              {props.bars &&
                props.bars.map((item, index) => {
                  return (
                    <Bar barSize={32} key={index} dataKey={item} fill={props.barColors[index]} />
                  );
                })}
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
export default withTranslation('common')(BarChartComponent);
