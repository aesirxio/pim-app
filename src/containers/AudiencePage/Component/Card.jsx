import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withSummaryViewModel } from 'store/SummaryStore/SummaryViewModelContextProvider';
import { Col, Row } from 'react-bootstrap';
import ComponentCard from 'components/ComponentCard';
import { BI_SUMMARY_FIELD_KEY } from 'aesirx-dma-lib/src/Constant/BiConstant';
import { observer } from 'mobx-react';
import numberWithCommas from 'utils/formatNumber';
import { withBiViewModel } from 'store/BiStore/BiViewModelContextProvider';
import { withRouter } from 'react-router-dom';

const CardComponent = observer(
  class CardComponent extends Component {
    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.summaryListViewModel = this.viewModel ? this.viewModel.summaryListViewModel : null;
      this.state = {
        page_views: BI_SUMMARY_FIELD_KEY.NUMBER_OF_PAGE_VIEWS,
      };
    }
    componentDidMount() {
      let fetchData = async () => {
        await this.summaryListViewModel.getSummary({
          domain: this.props.parentStore.biListViewModel.activeDomain,
        });
      };
      fetchData();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.location !== this.props.location) {
        let fetchData = async () => {
          await this.summaryListViewModel.getSummary({
            domain: this.props.parentStore.biListViewModel.activeDomain,
          });
        };
        fetchData();
      }
    }

    handleChange = (data) => {
      this.setState({
        page_views: data.value,
      });
    };

    render() {
      const { t } = this.props;

      return (
        <>
          <Row className="mb-24">
            <Col lg={4}>
              <ComponentCard
                title={t('txt_visitors')}
                icon={'/assets/images/visitor.svg'}
                iconColor={'#1AB394'}
                value={numberWithCommas(
                  this.summaryListViewModel?.data[BI_SUMMARY_FIELD_KEY.NUMBER_OF_VISITORS]
                )}
                loading={this.summaryListViewModel.status}
                isIncrease={true}
                // percent={'11%'}
                // textPercent={'form June'}
                options={[{ label: 'All Users', value: 'all-user' }]}
                defaultValue={{ label: 'All Users', value: 'all-user' }}
              ></ComponentCard>
            </Col>
            <Col lg={4}>
              <ComponentCard
                title={t('txt_page_views')}
                icon={'/assets/images/view.svg'}
                iconColor={'#2E71B1'}
                value={numberWithCommas(this.summaryListViewModel?.data[this.state.page_views])}
                isIncrease={false}
                // percent={'13%'}
                // textPercent={'form June'}
                options={[
                  { label: 'All', value: BI_SUMMARY_FIELD_KEY.NUMBER_OF_PAGE_VIEWS },
                  {
                    label: 'Unique',
                    value: BI_SUMMARY_FIELD_KEY.NUMBER_OF_UNIQUE_PAGE_VIEWS,
                  },
                ]}
                loading={this.summaryListViewModel.status}
                defaultValue={{
                  label: 'All',
                  value: BI_SUMMARY_FIELD_KEY.NUMBER_OF_PAGE_VIEWS,
                }}
                handleChange={this.handleChange}
              ></ComponentCard>
            </Col>
            <Col lg={4}>
              <ComponentCard
                title={t('txt_acg_session_duration')}
                icon={'/assets/images/duration.svg'}
                iconColor={'#EF3737'}
                value={numberWithCommas(
                  this.summaryListViewModel?.data[BI_SUMMARY_FIELD_KEY.AVERAGE_SESSION_DURATION]
                )}
                loading={this.summaryListViewModel.status}
                isIncrease={false}
                // percent={'11%'}
                // textPercent={'form June'}
              ></ComponentCard>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <ComponentCard
                title={t('txt_page_session')}
                icon={'/assets/images/page.svg'}
                iconColor={'#FFBE55'}
                value={numberWithCommas(
                  this.summaryListViewModel?.data[BI_SUMMARY_FIELD_KEY.NUMBER_OF_PAGES_PER_SESSION]
                )}
                loading={this.summaryListViewModel.status}
                isIncrease={false}
                // percent={'11%'}
                // textPercent={'form June'}
              ></ComponentCard>
            </Col>
            <Col lg={4}>
              <ComponentCard
                title={t('txt_bounce_rate')}
                icon={'/assets/images/rate.svg'}
                iconColor={'#C8192E'}
                value={numberWithCommas(
                  this.summaryListViewModel?.data[BI_SUMMARY_FIELD_KEY.BOUNCE_RATE]
                )}
                loading={this.summaryListViewModel.status}
                isIncrease={false}
                // percent={'11%'}
                // textPercent={'form June'}
              ></ComponentCard>
            </Col>
          </Row>
        </>
      );
    }
  }
);
export default withTranslation('common')(
  withRouter(withBiViewModel(withSummaryViewModel(CardComponent)))
);
