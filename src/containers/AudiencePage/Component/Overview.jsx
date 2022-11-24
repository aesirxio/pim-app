import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withVisitorViewModel } from 'store/VisitorStore/VisitorViewModelContextProvider';
import { observer } from 'mobx-react';
import { withBiViewModel } from 'store/BiStore/BiViewModelContextProvider';
import { withRouter } from 'react-router-dom';
import AreaChartComponent from 'components/AreaChartComponent';

const OverviewComponent = observer(
  class OverviewComponent extends Component {
    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.state = { loading: false };
      this.visitorListViewModel = this.viewModel ? this.viewModel.visitorListViewModel : null;
    }
    componentDidMount() {
      let fetchData = async () => {
        await this.visitorListViewModel?.getVisitor({
          'filter[domain]': this.props.parentStore.biListViewModel.activeDomain,
        });
      };
      fetchData();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.location !== this.props.location) {
        let fetchData = async () => {
          await this.visitorListViewModel.getVisitor({
            'filter[domain]': this.props.parentStore.biListViewModel.activeDomain,
          });
        };
        fetchData();
      }
    }

    render() {
      const { t } = this.props;

      return (
        <div className="position-relative h-100">
          <AreaChartComponent
            chartTitle={t('txt_menu_overview')}
            height={390}
            data={this?.visitorListViewModel?.data}
            colors={['#1AB394']}
            lineType="monotone"
            areaColors={['#3BB346', 'pink']}
            lineColors={['#0FC6C2', 'red']}
            lines={['line']}
            isDot
            hiddenGrid={{ vertical: false }}
            XAxisOptions={{ axisLine: true, padding: { left: 50, right: 50 } }}
            defaultValue={{ label: 'Sessions', value: 'session' }}
            options={[
              { label: 'Sessions', value: 'session' },
              { label: 'Localhost', value: 'localhost' },
            ]}
            loading={this.visitorListViewModel.status}
            tooltipComponent={{
              header: t('txt_in_total'),
              value: `visits:`,
            }}
          />
        </div>
      );
    }
  }
);
export default withTranslation('common')(
  withRouter(withBiViewModel(withVisitorViewModel(OverviewComponent)))
);
