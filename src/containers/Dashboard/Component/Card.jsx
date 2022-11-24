import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withSummaryViewModel } from 'store/SummaryStore/SummaryViewModelContextProvider';
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
        <div className="row gx-24 mb-24">
          <div className="col-lg-3">
            <ComponentCard
              title={t('txt_visitors')}
              icon={'/assets/images/visitor.svg'}
              iconColor={'#1AB394'}
              value={numberWithCommas(
                this.summaryListViewModel.data[BI_SUMMARY_FIELD_KEY.NUMBER_OF_VISITORS]
              )}
              isIncrease={true}
              loading={this.summaryListViewModel.status}
              // percent={`3%`}
              // textPercent={'form June'}
              options={[{ label: 'All Users', value: 'all-user' }]}
              defaultValue={{ label: 'All Users', value: 'all-user' }}
            ></ComponentCard>
          </div>
          {/* <div className="col-lg-3">
            <ComponentCard
              title={t('txt_total_revenue')}
              icon={'/assets/images/revenue-icon.svg'}
              iconColor={'#2E71B1'}
              value={0}
              isIncrease={false}
              percent={`3%`}
              textPercent={'form June'}
              options={[{ label: 'All', value: 'all' }]}
              defaultValue={{ label: 'All', value: 'all' }}
            ></ComponentCard>
          </div>
          <div className="col-lg-3">
            <ComponentCard
              title={t('txt_sessions')}
              icon={'/assets/images/sessions.svg'}
              iconColor={'#FFBE55'}
              value={0}
              isIncrease={true}
              percent={`3%`}
              textPercent={'form June'}
            ></ComponentCard>
          </div>
          <div className="col-lg-3">
            <ComponentCard
              title={t('txt_conversion_rate')}
              icon={'/assets/images/conversion.svg'}
              iconColor={'#EF3737'}
              value={0}
              isIncrease={true}
              percent={`3%`}
              textPercent={'form June'}
            ></ComponentCard>
          </div> */}
        </div>
      );
    }
  }
);
export default withTranslation('common')(
  withRouter(withBiViewModel(withSummaryViewModel(CardComponent)))
);
