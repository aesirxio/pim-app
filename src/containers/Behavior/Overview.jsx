// import AreaChartComponent from 'components/AreaChartComponent';
// import BarChartComponent from 'components/BarChartComponent';
import DateRangePicker from 'components/DateRangePicker';
// import PieChartComponent from 'components/PieChartComponent';
import React, { Component } from 'react';
// import { Col, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
// import BehaviorTable from './Component/BehaviorTable';
// import ComponentFilter from 'components/ComponentFilter';

class BehaviorOverviewPage extends Component {
  render() {
    const { t } = this.props;
    // const dataAreaChart = [
    //   {
    //     name: 'Jan',
    //     line1: 400,
    //     line2: 700,
    //   },
    //   {
    //     name: 'Feb',
    //     line1: 530,
    //     line2: 730,
    //   },
    //   {
    //     name: 'Mar',
    //     line1: 410,
    //     line2: 710,
    //   },
    //   {
    //     name: 'Apr',
    //     line1: 395,
    //     line2: 795,
    //   },
    //   {
    //     name: 'May',
    //     line1: 380,
    //     line2: 780,
    //   },
    //   {
    //     name: 'Jun',
    //     line1: 204,
    //     line2: 704,
    //   },
    //   {
    //     name: 'Jul',
    //     line1: 420,
    //     line2: 720,
    //   },
    //   {
    //     name: 'Aug',
    //     line1: 680,
    //     line2: 780,
    //   },
    //   {
    //     name: 'Sep',
    //     line1: 670,
    //     line2: 770,
    //   },
    //   {
    //     name: 'Oct',
    //     line1: 568,
    //     line2: 768,
    //   },
    //   {
    //     name: 'Nov',
    //     line1: 940,
    //     line2: 740,
    //   },
    //   {
    //     name: 'Dec',
    //     line1: 360,
    //     line2: 760,
    //   },
    // ];
    // const dataBarChart = [
    //   {
    //     name: 'Click',
    //     bar1: 4000,
    //   },
    //   {
    //     name: 'Anchor',
    //     bar1: 3000,
    //   },
    //   {
    //     name: 'Scroll',
    //     bar1: 2000,
    //   },
    //   {
    //     name: 'Download',
    //     bar1: 2780,
    //   },
    //   {
    //     name: 'Purchase',
    //     bar1: 1890,
    //   },
    //   {
    //     name: 'Register',
    //     bar1: 2390,
    //   },
    // ];
    // const dataPieChart = [
    //   { name: 'Female', value: 400 },
    //   { name: 'Male', value: 600 },
    //   { name: 'Non-binary', value: 600 },
    // ];

    return (
      <>
        <div className="py-4 px-3 h-100 d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <div className="position-relative">
              <h2 className="text-blue-0 fw-bold mb-8px">{t('txt_behavior')}</h2>
            </div>
            <div className="position-relative">
              <DateRangePicker></DateRangePicker>
            </div>
          </div>
          {/* <ComponentFilter isContinent />
          <Row className="gx-24 mb-24">
            <Col lg={6}>
              <AreaChartComponent
                chartTitle={t('txt_menu_overview')}
                height={390}
                data={dataAreaChart}
                colors={['#1AB394']}
                areaColors={['#1AB394', '#9747FF']}
                lineColors={['#1AB394', '#9747FF']}
                lines={['line1', 'line2']}
                tooltipComponent={{
                  header: t('txt_in_total'),
                  value: `$`,
                }}
              />
            </Col>
            <Col lg={6}>
              <BarChartComponent
                chartTitle={'Event count'}
                height={390}
                bars={['bar1']}
                barColors={['#2C94EA']}
                data={dataBarChart}
                margin={{ left: 40 }}
                isFilterButtons={true}
                filterButtons={true}
              ></BarChartComponent>
            </Col>
          </Row>
          <Row className="gx-24 mb-24">
            <Col lg={9}>
              <BehaviorTable></BehaviorTable>
            </Col>
            <Col lg={3}>
              <div>
                <PieChartComponent
                  height={300}
                  chartTitle={t('txt_gender')}
                  data={dataPieChart}
                  colors={['#2C94EA', '#8E30FF', '#FF7723']}
                  legendPosition="bottom"
                />
              </div>
            </Col>
          </Row> */}
        </div>
      </>
    );
  }
}
export default withTranslation('common')(BehaviorOverviewPage);
