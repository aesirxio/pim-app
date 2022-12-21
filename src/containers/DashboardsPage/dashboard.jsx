/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
// import DateRangePicker from 'components/DateRangePicker';
import { withRouter } from 'react-router-dom';
import PieChartComponent from 'components/PieChartComponent';
import { Col, Row } from 'react-bootstrap';
import ComponentCard from 'components/ComponentCard';
import numberWithCommas from 'utils/formatNumber';
import './index.scss';
import RecentsActivities from './Component/RecentsActivities';
import DataCompleteness from './Component/DataCompleteness';
import { withDashboardViewModel } from './DashboardViewModel/DashboardViewModelContextProvider';

const Dashboard = observer(
  class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel.dashboardDetailViewModel;
    }
    componentDidMount() {
      this.viewModel.initializeData();
    }
    render() {
      const { t } = this.props;
      const dataPieChart = [
        { name: 'Published', value: 400 },
        { name: 'Unpublished', value: 600 },
        { name: 'Draft', value: 200 },
        { name: 'Archived', value: 50 },
        { name: 'Waiting Approval', value: 300 },
        { name: 'Trash', value: 90 },
      ];
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      console.log('this.viewModel', this.viewModel);
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <div className="position-relative">
              <h2 className="text-blue-0 fw-bold mb-8px">{t('txt_dashboard')}</h2>
              <p className="mb-0 text-color">{t('txt_dashboard_below')}</p>
            </div>
            <div className="position-relative">
              {/* <DateRangePicker
                viewModelArr={[summaryViewModel.summaryListViewModel]}
              ></DateRangePicker> */}
            </div>
          </div>
          <Row className="gx-24 mb-24">
            <Col lg={5}>
              <Row className="gx-24 h-100">
                <Col lg={6}>
                  <ComponentCard
                    title={t('txt_products')}
                    icon={'/assets/images/product-icon.svg'}
                    iconColor={'#1AB394'}
                    value={numberWithCommas(17770)}
                    isIncrease={true}
                    // loading={summaryViewModel.summaryListViewModel.status}
                    percent={`11%`}
                    textPercent={'form June'}
                    titleLink={t('txt_manage_products')}
                    link={'#'}
                  ></ComponentCard>
                </Col>
                <Col lg={6}>
                  <ComponentCard
                    title={t('txt_categories')}
                    icon={'/assets/images/categories.svg'}
                    iconColor={'#EF3737'}
                    value={numberWithCommas(232)}
                    isIncrease={true}
                    // loading={summaryViewModel.summaryListViewModel.status}
                    percent={`2%`}
                    textPercent={'form June'}
                    titleLink={t('txt_manage_categories')}
                    link={'#'}
                  ></ComponentCard>
                </Col>
              </Row>
            </Col>
            <Col lg={4}>
              <PieChartComponent
                height={190}
                chartTitle={t('txt_products_state')}
                data={dataPieChart}
                colors={['#1DA1F2', '#0FC6C2', '#F97066', '#FFC700', '#7289DA', '#EBEBEB']}
                legendPosition="bottom"
              />
            </Col>
            <Col lg={3}>
              <DataCompleteness />
            </Col>
            <Col lg={9} className="mt-24"></Col>
            <Col lg={3} className="mt-24">
              <RecentsActivities />
            </Col>
          </Row>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withDashboardViewModel(Dashboard)));
