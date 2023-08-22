/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import { withShippingZoneViewModel } from '../ShippingZoneViewModel/ShippingZoneViewModelContextProvider';
import EditHeader from 'components/EditHeader';
import { PAGE_STATUS, Spinner, PublishOptions, Input, ActionsBar } from 'aesirx-uikit';
import { historyPush } from 'routes/routes';
import ShippingZoneInformation from './Component/ShippingZoneInformation';

const EditShippingZone = observer(
  class EditShippingZone extends Component {
    shippingZoneDetailViewModel = null;
    formPropsData = {
      [PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {},
      [PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY]: {},
      [PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE]: {},
      [PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.CITY]: {},
    };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.shippingZoneDetailViewModel = props.model?.shippingZoneDetailViewModel
        ? props.model?.shippingZoneDetailViewModel
        : null;

      this.shippingZoneDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match } = this.props;
      if (this.isEdit) {
        this.formPropsData[PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.ID] = match.params?.id;
        await this.shippingZoneDetailViewModel.initializeData();
      }
      await this.shippingZoneDetailViewModel.getShippingZoneList();
      this.shippingZoneDetailViewModel.handleAliasChange('');
    }

    handleValidateForm() {
      if (this.validator.fields['ShippingZone Name'] === true) {
        this.setState((prevState) => {
          return {
            ...prevState,
            requiredField: Math.random(),
          };
        });
      }
      this.validator.showMessages();
    }

    debouncedChangeHandler = _.debounce((value) => {
      this.shippingZoneDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t } = this.props;
      // eslint-disable-next-line no-console
      console.log(
        'rerender ShippingZone',
        this.shippingZoneDetailViewModel.shippingZoneDetailViewModel.formPropsData
      );

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.shippingZoneDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_shipping_zone')}
              isEdit={this.isEdit}
              redirectUrl={'/shipping-zone'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/shipping-zone`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.shippingZoneDetailViewModel.update()
                          : await this.shippingZoneDetailViewModel.create();
                        if (!result?.error) {
                          historyPush(`/shipping-zone`);
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
                          await this.shippingZoneDetailViewModel.update();
                          await this.shippingZoneDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.shippingZoneDetailViewModel.create();
                          if (!result?.error) {
                            historyPush(`/shipping-zone/edit/${result?.response}`);
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
                <ShippingZoneInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={
                    this.shippingZoneDetailViewModel?.shippingZoneDetailViewModel.formPropsData
                  }
                  {...this.props}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.shippingZoneDetailViewModel}
                  formPropsData={
                    this.shippingZoneDetailViewModel.shippingZoneDetailViewModel.formPropsData
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

export default withTranslation()(withRouter(withShippingZoneViewModel(EditShippingZone)));
