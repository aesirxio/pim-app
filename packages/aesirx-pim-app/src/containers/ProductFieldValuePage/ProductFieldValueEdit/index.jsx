/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import { withProductFieldValueViewModel } from '../ProductFieldValueViewModel/ProductFieldValueViewModelContextProvider';
import EditHeader from 'components/EditHeader';
import { PAGE_STATUS, Spinner, PublishOptions, ActionsBar } from 'aesirx-uikit';
import { historyPush } from 'routes/routes';
import ProductFieldValueInformation from './Component/ProductFieldValueInformation';

const EditProductFieldValue = observer(
  class EditProductFieldValue extends Component {
    productFieldValueDetailViewModel = null;
    formPropsData = { [PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.productFieldValueDetailViewModel = props.model?.productFieldValueDetailViewModel
        ? props.model?.productFieldValueDetailViewModel
        : null;

      this.productFieldValueDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match } = this.props;
      if (this.isEdit) {
        this.formPropsData[PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.ID] = match.params?.id;
        await this.productFieldValueDetailViewModel.initializeData();
      }
    }

    handleValidateForm() {
      if (this.validator.fields['ProductFieldValue Name'] === true) {
        this.setState((prevState) => {
          return {
            ...prevState,
            requiredField: Math.random(),
          };
        });
      }
      this.validator.showMessages();
    }

    render() {
      const { t } = this.props;
      // eslint-disable-next-line no-console
      console.log(
        'rerender ProductFieldValue',
        this.productFieldValueDetailViewModel.productFieldValueDetailViewModel.formPropsData
      );

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.productFieldValueDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_product_fieldvalue')}
              isEdit={this.isEdit}
              redirectUrl={'/product-fieldvalue'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/product-fieldvalue`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.productFieldValueDetailViewModel.update()
                          : await this.productFieldValueDetailViewModel.create();
                        if (!result?.error) {
                          historyPush(`/product-fieldvalue`);
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
                          await this.productFieldValueDetailViewModel.update();
                          await this.productFieldValueDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.productFieldValueDetailViewModel.create();
                          if (!result?.error) {
                            historyPush(`/product-fieldvalue/edit/${result?.response}`);
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
                <ProductFieldValueInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={
                    this.productFieldValueDetailViewModel.productFieldValueDetailViewModel
                      .formPropsData
                  }
                  {...this.props}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.productFieldValueDetailViewModel}
                  formPropsData={
                    this.productFieldValueDetailViewModel.productFieldValueDetailViewModel
                      .formPropsData
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

export default withTranslation()(withRouter(withProductFieldValueViewModel(EditProductFieldValue)));
