import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withSummaryViewModel } from 'store/SummaryStore/SummaryViewModelContextProvider';
import ComponentCard from 'components/ComponentCard';
import { observer } from 'mobx-react';
import numberWithCommas from 'utils/formatNumber';
import { withBiViewModel } from 'store/BiStore/BiViewModelContextProvider';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
const CardComponent = observer(
  class CardComponent extends Component {
    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.summaryListViewModel = this.viewModel ? this.viewModel.summaryListViewModel : null;
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

    render() {
      const { t } = this.props;
      return (
        <Row className="gx-24 mb-24">
          <Col lg={8}>
            <Row className="gx-24">
              <Col lg={4}>
                <ComponentCard
                  title={t('txt_products')}
                  icon={'/assets/images/product-icon.svg'}
                  iconColor={'#1AB394'}
                  value={numberWithCommas(11770)}
                  isIncrease={true}
                  loading={this.summaryListViewModel.status}
                  percent={`11%`}
                  textPercent={'form June'}
                  titleLink={t('txt_manage_products')}
                  link={'#'}
                ></ComponentCard>
              </Col>
              <Col lg={4}>
                <ComponentCard
                  title={t('txt_categories')}
                  icon={'/assets/images/category-icon.svg'}
                  iconColor={'#EF3737'}
                  value={numberWithCommas(232)}
                  isIncrease={true}
                  loading={this.summaryListViewModel.status}
                  percent={`2%`}
                  textPercent={'form June'}
                  titleLink={t('txt_manage_categories')}
                  link={'#'}
                ></ComponentCard>
              </Col>
            </Row>
          </Col>
        </Row>
      );
    }
  }
);
export default withTranslation('common')(
  withRouter(withBiViewModel(withSummaryViewModel(CardComponent)))
);
