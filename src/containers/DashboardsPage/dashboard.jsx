/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { Spinner } from 'aesirx-uikit';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import DateRangePicker from 'components/DateRangePicker';
import { withRouter } from 'react-router-dom';
import PieChartComponent from 'components/PieChartComponent';
import { Col, Row } from 'react-bootstrap';
import ComponentCard from 'components/ComponentCard';
import numberWithCommas from 'utils/formatNumber';
import './index.scss';
// import RecentsActivities from './Component/RecentsActivities';
// import DataCompleteness from './Component/DataCompleteness';
import { withDashboardViewModel } from './DashboardViewModel/DashboardViewModelContextProvider';
import { AUTHORIZATION_KEY, Storage, PIM_DASH_BOARD_DETAIL_FIELD_KEY } from 'aesirx-lib';
import moment from 'moment';
import ListFeaturedProducts from './Component/ListFeaturedProducts';

const Dashboard = observer(
  class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel.dashboardDetailViewModel;
    }
    componentDidMount() {
      const fetchData = async () => {
        this.viewModel.handleFilter({
          organisation_id: Storage.getItem(AUTHORIZATION_KEY.ORGANISATION_ID),
        });
        await this.viewModel.initializeData();
        this.forceUpdate();
      };
      fetchData();
    }
    render() {
      const { t } = this.props;
      const dataPieChart = [
        {
          name: t('txt_published'),
          value: this.viewModel.result[PIM_DASH_BOARD_DETAIL_FIELD_KEY.PERCENT_PRODUCT_PUBLISH],
        },
        {
          name: t('txt_unpublished'),
          value: this.viewModel.result[PIM_DASH_BOARD_DETAIL_FIELD_KEY.PERCENT_PRODUCT_UNPUBLISH],
        },
        {
          name: t('txt_draft'),
          value: this.viewModel.result[PIM_DASH_BOARD_DETAIL_FIELD_KEY.PERCENT_PRODUCT_DRAFT],
        },
        {
          name: t('txt_archived'),
          value: this.viewModel.result[PIM_DASH_BOARD_DETAIL_FIELD_KEY.PERCENT_PRODUCT_ARCHIVED],
        },
        {
          name: t('txt_trashed'),
          value: this.viewModel.result[PIM_DASH_BOARD_DETAIL_FIELD_KEY.PERCENT_PRODUCT_TRASH],
        },
      ];
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      let percentProduct =
        this.viewModel.result[PIM_DASH_BOARD_DETAIL_FIELD_KEY.PERCENT_NEW_PRODUCT] ?? 0;
      let percentCategories =
        this.viewModel.result[PIM_DASH_BOARD_DETAIL_FIELD_KEY.PERCENT_NEW_CATEGORIES] ?? 0;
      return (
        <>
          <div className="py-4 px-3 d-flex flex-column">
            <div className="d-flex align-items-center justify-content-between mb-26 flex-wrap">
              <div className="position-relative">
                <h2 className="text-blue-0 fw-bold mb-8px">{t('txt_dashboard')}</h2>
                <p className="mb-0 text-color">{t('txt_dashboard_below')}</p>
              </div>
              <div style={{ height: '50px' }}>
                <DateRangePicker viewModel={this.viewModel} />
              </div>
            </div>
            <Row className="gx-24 mb-24">
              <Col lg={6} className={`mb-5 mb-lg-0`}>
                <Row className="gx-24 h-100 gap-5 gap-lg-0">
                  <Col lg={6}>
                    <ComponentCard
                      title={t('txt_products')}
                      icon={'/assets/images/product-icon.svg'}
                      iconColor={'#1AB394'}
                      value={numberWithCommas(
                        this.viewModel.result[PIM_DASH_BOARD_DETAIL_FIELD_KEY.TOTAL_PRODUCT] ?? 0
                      )}
                      loading={this.viewModel.formStatus}
                      isIncrease={true}
                      percent={`${percentProduct}%`}
                      textPercent={`${t('txt_from')} ${moment()
                        .subtract(1, 'months')
                        .format('MMMM')}`}
                      titleLink={t('txt_manage_products')}
                      link={'/products/all'}
                    ></ComponentCard>
                  </Col>
                  <Col lg={6}>
                    <ComponentCard
                      title={t('txt_categories')}
                      icon={'/assets/images/categories.svg'}
                      iconColor={'#EF3737'}
                      value={numberWithCommas(
                        this.viewModel.result[PIM_DASH_BOARD_DETAIL_FIELD_KEY.TOTAL_CATEGORIES] ?? 0
                      )}
                      loading={this.viewModel.formStatus}
                      isIncrease={true}
                      percent={`${percentCategories}%`}
                      textPercent={`${t('txt_from')} ${moment()
                        .subtract(1, 'months')
                        .format('MMMM')}`}
                      titleLink={t('txt_manage_categories')}
                      link={'/categories'}
                    ></ComponentCard>
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <PieChartComponent
                  height={190}
                  chartTitle={t('txt_products_state')}
                  pieTitle={t('txt_left_menu_products')}
                  data={dataPieChart}
                  colors={['#1DA1F2', '#0FC6C2', '#F97066', '#FFC700', '#7289DA', '#EBEBEB']}
                  legendPosition="bottom"
                />
              </Col>
              {/* <Col lg={3}>
              <DataCompleteness />
            </Col> */}
              {/* <Col lg={3} className="mt-24">
              <RecentsActivities />
            </Col> */}
            </Row>
            <Row className="gx-24 mb-24">
              <Col lg={12}>
                <ListFeaturedProducts viewModel={this.viewModel} />
              </Col>
            </Row>
          </div>
        </>
      );
    }
  }
);

export default withTranslation()(withRouter(withDashboardViewModel(Dashboard)));
