import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withSummaryViewModel } from 'store/SummaryStore/SummaryViewModelContextProvider';
import { observer } from 'mobx-react';
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
      return;
    }
  }
);
export default withTranslation('common')(
  withRouter(withBiViewModel(withSummaryViewModel(CardComponent)))
);
