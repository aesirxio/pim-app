// import PieChart from 'components/PieChartComponent';
import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import DateRangePicker from 'components/DateRangePicker';
import { VisitorStoreProvider } from 'store/VisitorStore/VisitorViewModelContextProvider';
import OverviewComponent from './Component/Overview';
import CardComponent from './Component/Card';
import VisitorViewModel from 'store/VisitorStore/VisitorViewModel';
import VisitorStore from 'store/VisitorStore/VisitorStore';
import { SummaryStoreProvider } from 'store/SummaryStore/SummaryViewModelContextProvider';
import SummaryViewModel from 'store/SummaryStore/SummaryViewModel';
import SummaryStore from 'store/SummaryStore/SummaryStore';

const visitorStore = new VisitorStore();
const visitorViewModel = new VisitorViewModel(visitorStore);

const summaryStore = new SummaryStore();
const summaryViewModel = new SummaryViewModel(summaryStore);

const AudiencePage = observer(
  class AudiencePage extends Component {
    constructor(props) {
      super(props);
      this.state = { loading: false };
    }

    render() {
      const { t } = this.props;
      // const listNewUser = [
      //   { email: 'phu.tran@r-digital.tech', status: 'Active' },
      //   { email: 'babila@gmail.com', status: 'Waiting' },
      //   { email: 'babila@gmail.com', status: 'Active' },
      //   { email: 'babila@gmail.com', status: 'Active' },
      //   { email: 'babila@gmail.com', status: 'Waiting' },
      //   { email: 'babila@gmail.com', status: 'Active' },
      //   { email: 'babila@gmail.com', status: 'Active' },
      //   { email: 'babila@gmail.com', status: 'Waiting' },
      // ];
      return (
        <>
          <div className="p-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h2 className="text-blue-0 fw-bold mb-8px">{t('txt_audience')}</h2>
                <p className="mb-0 text-color">{t('txt_analytic_details')}</p>
              </div>
              <div className="position-relative">
                <DateRangePicker
                  viewModelArr={[
                    summaryViewModel.summaryListViewModel,
                    visitorViewModel.visitorListViewModel,
                  ]}
                ></DateRangePicker>
              </div>
            </div>

            <Row className="mb-24">
              <Col lg={9}>
                <VisitorStoreProvider viewModel={visitorViewModel}>
                  <OverviewComponent></OverviewComponent>
                </VisitorStoreProvider>
              </Col>
              {/* <Col lg={3}>
                <div className="bg-white h-100 rounded-3 shadow-sm py-3 px-24">
                  <h5 className="mb-24 text-blue-0">{t('txt_new_registered_users')}</h5>
                  {listNewUser &&
                    listNewUser.map((item, index) => {
                      let color = item.status === 'Active' ? '#3EAD8A' : '#F59E0B';
                      let backgroundColor = item.status === 'Active' ? '#D0F4E8' : '#FFEAC8';
                      return (
                        <div
                          key={index}
                          className="d-flex justify-content-between mt-24 text-color"
                        >
                          {item.email}
                          <span
                            style={{ color: color, backgroundColor: backgroundColor }}
                            className="d-block rounded-pill px-1 py-sm fs-12 fw-semibold"
                          >
                            {item.status}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </Col> */}
            </Row>
            <Row>
              <Col lg={9}>
                <SummaryStoreProvider viewModel={summaryViewModel}>
                  <CardComponent></CardComponent>
                </SummaryStoreProvider>
              </Col>
              {/* <Col lg={3}>
                <PieChart
                  height={300}
                  chartTitle={t('txt_visitors')}
                  data={[
                    { name: 'Smart', value: 400 },
                    { name: 'Stupid', value: 600 },
                  ]}
                  colors={['#1AB394', '#1A73E8']}
                  legendPosition="bottom"
                />
              </Col> */}
            </Row>
          </div>
        </>
      );
    }
  }
);
export default withTranslation('common')(AudiencePage);
