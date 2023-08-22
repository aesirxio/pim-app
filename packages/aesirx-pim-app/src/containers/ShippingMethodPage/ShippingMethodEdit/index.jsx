/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { PIM_SHIPPING_METHOD_DETAIL_FIELD_KEY } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import { withShippingMethodViewModel } from '../ShippingMethodViewModel/ShippingMethodViewModelContextProvider';
import EditHeader from 'components/EditHeader';
import { PAGE_STATUS, Spinner, PublishOptions, Input, ActionsBar } from 'aesirx-uikit';
import { historyPush } from 'routes/routes';

const EditShippingMethod = observer(
  class EditShippingMethod extends Component {
    shippingMethodDetailViewModel = null;
    formPropsData = { [PIM_SHIPPING_METHOD_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.shippingMethodDetailViewModel = props.model?.shippingMethodDetailViewModel
        ? props.model?.shippingMethodDetailViewModel
        : null;

      this.shippingMethodDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match } = this.props;
      if (this.isEdit) {
        this.formPropsData[PIM_SHIPPING_METHOD_DETAIL_FIELD_KEY.ID] = match.params?.id;
        await this.shippingMethodDetailViewModel.initializeData();
      }
      await this.shippingMethodDetailViewModel.getShippingMethodList();
      this.shippingMethodDetailViewModel.handleAliasChange('');
    }

    handleValidateForm() {
      if (this.validator.fields['ShippingMethod Name'] === true) {
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
      this.shippingMethodDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t } = this.props;
      // eslint-disable-next-line no-console
      console.log(
        'rerender ShippingMethod',
        this.shippingMethodDetailViewModel.shippingMethodDetailViewModel.formPropsData
      );

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.shippingMethodDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_shipping_method')}
              isEdit={this.isEdit}
              redirectUrl={'/shipping-method'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/shipping-method`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.shippingMethodDetailViewModel.update()
                          : await this.shippingMethodDetailViewModel.create();
                        if (!result?.error) {
                          historyPush(`/shipping-method`);
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
                          await this.shippingMethodDetailViewModel.update();
                          await this.shippingMethodDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.shippingMethodDetailViewModel.create();
                          if (!result?.error) {
                            historyPush(`/shipping-method/edit/${result?.response}`);
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
                <Form.Group className={`mb-24`}>
                  <Input
                    field={{
                      getValueSelected:
                        this.shippingMethodDetailViewModel.shippingMethodDetailViewModel
                          .formPropsData[PIM_SHIPPING_METHOD_DETAIL_FIELD_KEY.TITLE],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_shipping_method_name'),
                      handleChange: (event) => {
                        this.shippingMethodDetailViewModel.handleFormPropsData(
                          PIM_SHIPPING_METHOD_DETAIL_FIELD_KEY.TITLE,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor(t('txt_shipping_method_name'));
                      },
                    }}
                  />
                  {this.validator.message(
                    t('txt_shipping_method_name'),
                    this.shippingMethodDetailViewModel.shippingMethodDetailViewModel.formPropsData[
                      PIM_SHIPPING_METHOD_DETAIL_FIELD_KEY.TITLE
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                {/* <ShippingMethodInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={
                    this.shippingMethodDetailViewModel.shippingMethodDetailViewModel.formPropsData
                  }
                  {...this.props}
                /> */}
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.shippingMethodDetailViewModel}
                  formPropsData={
                    this.shippingMethodDetailViewModel.shippingMethodDetailViewModel.formPropsData
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

export default withTranslation()(withRouter(withShippingMethodViewModel(EditShippingMethod)));
