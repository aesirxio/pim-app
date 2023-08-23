/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { PIM_SHIPPING_RATE_DETAIL_FIELD_KEY } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import { withShippingRateViewModel } from '../ShippingRateViewModel/ShippingRateViewModelContextProvider';
import EditHeader from 'components/EditHeader';
import { PAGE_STATUS, Spinner, PublishOptions, Input, ActionsBar } from 'aesirx-uikit';
import { historyPush } from 'routes/routes';
import ShippingRateInformation from './Component/ShippingRateInformation';

const EditShippingRate = observer(
  class EditShippingRate extends Component {
    shippingRateDetailViewModel = null;
    formPropsData = {
      [PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {},
      [PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_METHOD]: {},
      [PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT]: {},
      [PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT_CATEGORY]: {},
    };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.shippingRateDetailViewModel = props.model?.shippingRateDetailViewModel
        ? props.model?.shippingRateDetailViewModel
        : null;

      this.shippingRateDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match } = this.props;
      if (this.isEdit) {
        this.formPropsData[PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.ID] = match.params?.id;
        await this.shippingRateDetailViewModel.initializeData();
      }
    }

    handleValidateForm() {
      this.validator.showMessages();
    }

    debouncedChangeHandler = _.debounce((value) => {
      this.shippingRateDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t } = this.props;
      // eslint-disable-next-line no-console
      console.log(
        'rerender ShippingRate',
        this.shippingRateDetailViewModel.shippingRateDetailViewModel.formPropsData
      );

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.shippingRateDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_shipping_rate')}
              isEdit={this.isEdit}
              redirectUrl={'/shipping-rate'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/shipping-rate`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.shippingRateDetailViewModel.update()
                          : await this.shippingRateDetailViewModel.create();
                        if (!result?.error) {
                          historyPush(`/shipping-rate`);
                        }
                      } else {
                        this.handleValidateForm();
                      }
                    },
                  },
                  {
                    title: t('txt_save'),
                    validator: this.validator,
                    handle: async () => {
                      if (this.validator.allValid()) {
                        if (this.isEdit) {
                          await this.shippingRateDetailViewModel.update();
                          await this.shippingRateDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.shippingRateDetailViewModel.create();
                          if (!result?.error) {
                            historyPush(`/shipping-rate/edit/${result?.response[0]}`);
                          }
                        }
                      } else {
                        this.handleValidateForm();
                      }
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
                <ShippingRateInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={
                    this.shippingRateDetailViewModel?.shippingRateDetailViewModel.formPropsData
                  }
                  {...this.props}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.shippingRateDetailViewModel}
                  formPropsData={
                    this.shippingRateDetailViewModel.shippingRateDetailViewModel.formPropsData
                  }
                  isEdit={this.isEdit}
                  isFeatured={false}
                  isPublished={false}
                />
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
  }
);

export default withTranslation()(withRouter(withShippingRateViewModel(EditShippingRate)));
