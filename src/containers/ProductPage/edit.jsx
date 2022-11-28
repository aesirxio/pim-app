/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { withBiViewModel } from 'store/BiStore/BiViewModelContextProvider';
import SummaryStore from 'store/SummaryStore/SummaryStore';
import SummaryViewModel from 'store/SummaryStore/SummaryViewModel';
import { SummaryStoreProvider } from 'store/SummaryStore/SummaryViewModelContextProvider';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import './index.scss';
import ActionsBar from 'components/ActionsBar';

const summaryStore = new SummaryStore();
const summaryViewModel = new SummaryViewModel(summaryStore);
const EditProduct = observer(
  class EditProduct extends Component {
    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.biListViewModel = this.viewModel ? this.viewModel.biListViewModel : null;
    }

    render() {
      const { t } = this.props;

      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <div className="position-relative">
              <h2 className="text-blue-0 fw-bold mb-8px">{t('txt_add_new_product')}</h2>
            </div>
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: () => {},
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_preview'),
                    handle: () => {},
                    icon: '/assets/images/preview.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: () => {},
                  },
                  {
                    title: t('txt_save'),
                    handle: () => {},
                    icon: '/assets/images/save.svg',
                    variant: 'success',
                  },
                ]}
              />
            </div>
          </div>
          <SummaryStoreProvider viewModel={summaryViewModel}>
            <Row className="gx-24 mb-24">
              <Col lg={9} className="mt-24"></Col>
              <Col lg={3} className="mt-24"></Col>
            </Row>
          </SummaryStoreProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withBiViewModel(EditProduct)));
