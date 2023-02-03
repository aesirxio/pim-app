/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import ActionsBar from 'components/ActionsBar';
import { withProductPriceViewModel } from 'containers/ProductPricesPage/ProductPriceViewModel/ProductPriceViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import { PIM_PRICES_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import SimpleReactValidator from 'simple-react-validator';
import ProductPriceInformation from './Component/ProductPriceInformation';
import EditHeader from 'components/EditHeader';

const EditProductPrice = observer(
  class EditProductPrice extends Component {
    productPriceDetailViewModel = null;
    formPropsData = { [PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };

    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.state = {};

      this.validator = new SimpleReactValidator({ autoForceUpdate: this, messagesShown: false });
      this.productPriceDetailViewModel = this.viewModel
        ? this.viewModel.getProductPriceDetailViewModel()
        : null;
      this.productPriceDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[PIM_PRICES_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.productPriceDetailViewModel.initializeData();
      }
    }

    render() {
      const { t } = this.props;
      let history = this.props.history;
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.productPriceDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_price')}
              isEdit={this.isEdit}
              redirectUrl={'/prices'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      history.push(`/prices`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  // {
                  //   title: t('txt_preview'),
                  //   handle: () => {},
                  //   icon: '/assets/images/preview.svg',
                  // },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.productPriceDetailViewModel.update()
                          : await this.productPriceDetailViewModel.create();
                        if (result !== 0) {
                          history.push(`/prices`);
                        }
                      } else {
                        this.validator.showMessages();
                      }
                    },
                  },
                  {
                    title: t('txt_save'),
                    validator: this.validator,
                    handle: async () => {
                      if (this.validator.allValid()) {
                        if (this.isEdit) {
                          await this.productPriceDetailViewModel.update();
                          await this.productPriceDetailViewModel.initializeData();
                        } else {
                          let result = await this.productPriceDetailViewModel.create();
                          result && history.push(`/prices/edit/${result}`);
                        }
                      } else {
                        this.validator.showMessages();
                      }
                      console.log('this.validator.allValid()', this.validator);
                    },
                    icon: '/assets/images/save.svg',
                    variant: 'success',
                  },
                ]}
              />
            </div>
          </div>
          <Form>
            <Row className="gx-24 mb-24">
              <Col lg={9}>
                <ProductPriceInformation
                  validator={this.validator}
                  isShowValidator={this.validator.messagesShown}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.productPriceDetailViewModel}
                  formPropsData={
                    this.productPriceDetailViewModel.productPriceDetailViewModel.formPropsData
                  }
                  isEdit={this.isEdit}
                />
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withProductPriceViewModel(EditProductPrice)));
