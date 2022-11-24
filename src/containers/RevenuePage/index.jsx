import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
// import AreaChartComponent from 'components/AreaChartComponent';
// import RevenueList from './Component/RevenueList';

class RevenuePage extends Component {
  render() {
    const { t } = this.props;
    return (
      <>
        <div className="p-3">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h2 className="text-blue-0 fw-bold mb-8px">{t('txt_menu_revenue')}</h2>
            </div>
          </div>
          {/* <AreaChartComponent
            chartTitle={t('txt_total_revenue')}
            height={390}
            data={[
              {
                name: 'Jan',
                line1: 400,
              },
              {
                name: 'Feb',
                line1: 930,
              },
              {
                name: 'Mar',
                line1: 210,
              },
              {
                name: 'Apr',
                line1: 395,
              },
              {
                name: 'May',
                line1: 780,
              },
              {
                name: 'Jun',
                line1: 204,
              },
              {
                name: 'Jul',
                line1: 420,
              },
              {
                name: 'Aug',
                line1: 280,
              },
              {
                name: 'Sep',
                line1: 670,
              },
              {
                name: 'Oct',
                line1: 168,
              },
              {
                name: 'Nov',
                line1: 940,
              },
              {
                name: 'Dec',
                line1: 120,
              },
            ]}
            colors={['#1AB394']}
            hiddenGrid={{ vertical: false }}
            lineType="monotone"
            XAxisOptions={{ axisLine: true, padding: { left: 80, right: 80 } }}
            isDot
            areaColors={['#165DFF']}
            lineColors={['#751FF9']}
            lines={['line1']}
            tooltipComponent={{
              header: t('txt_in_total'),
              value: `$`,
            }}
          />
          <div className="mt-4">
            <RevenueList></RevenueList>
          </div> */}
        </div>
      </>
    );
  }
}
export default withTranslation('common')(RevenuePage);
