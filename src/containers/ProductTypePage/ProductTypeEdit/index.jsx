/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import ActionsBar from 'components/ActionsBar';
import PublishOptions from 'components/PublishOptions';
import { PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import { withProductTypeViewModel } from '../ProductTypeViewModel/ProductTypeViewModelContextProvider';
import ProductTypeInformation from './Component/ProductTypeInformation';
import EditHeader from 'components/EditHeader';
import { PAGE_STATUS, Spinner } from 'aesirx-uikit';
import Input from 'components/Form/Input';
import { historyPush } from 'routes/routes';

const EditProductType = observer(
  class EditProductType extends Component {
    productTypeDetailViewModel = null;
    formPropsData = { [PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.productTypeDetailViewModel = props.model?.productTypeDetailViewModel
        ? props.model?.productTypeDetailViewModel
        : null;

      this.productTypeDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match } = this.props;
      if (this.isEdit) {
        this.formPropsData[PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.ID] = match.params?.id;
        await this.productTypeDetailViewModel.initializeData();
      }
      await this.productTypeDetailViewModel.getProductTypeList();
    }

    handleValidateForm() {
      if (this.validator.fields['ProductType Name'] === true) {
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
      this.productTypeDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t, history } = this.props;
      // eslint-disable-next-line no-console
      console.log('rerender ProductType', this.productTypeDetailViewModel);

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.productTypeDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_product_type')}
              isEdit={this.isEdit}
              redirectUrl={'/product-types'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/product-types`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.productTypeDetailViewModel.update()
                          : await this.productTypeDetailViewModel.create();
                        if (!result?.error) {
                          historyPush(`/product-types`);
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
                          await this.productTypeDetailViewModel.update();
                          await this.productTypeDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.productTypeDetailViewModel.create();
                          if (!result?.error) {
                            historyPush(`/product-types/edit/${result?.response}`);
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
                        this.productTypeDetailViewModel.productTypeDetailViewModel.formPropsData[
                          PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.NAME
                        ],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_product_type_name'),
                      handleChange: (event) => {
                        this.productTypeDetailViewModel.handleFormPropsData(
                          PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.NAME,
                          event.target.value
                        );
                        console.log(
                          'dsklakdlsa',
                          this.productTypeDetailViewModel.productTypeDetailViewModel.formPropsData[
                            PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.NAME
                          ]
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor(t('txt_product_type_name'));
                      },
                      maxLength: 15,
                    }}
                  />
                  {this.validator.message(
                    t('txt_product_type_name'),
                    this.productTypeDetailViewModel.productTypeDetailViewModel.formPropsData[
                      PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.NAME
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                <ProductTypeInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={
                    this.productTypeDetailViewModel.productTypeDetailViewModel.formPropsData
                  }
                  {...this.props}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.productTypeDetailViewModel}
                  formPropsData={
                    this.productTypeDetailViewModel.productTypeDetailViewModel.formPropsData
                  }
                  isEdit={this.isEdit}
                  isPublished={false}
                  isFeatured={false}
                />
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
  }
);

export default withTranslation()(withRouter(withProductTypeViewModel(EditProductType)));
