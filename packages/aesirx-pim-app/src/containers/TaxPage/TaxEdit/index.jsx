/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { PIM_TAX_DETAIL_FIELD_KEY } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import { withTaxViewModel } from '../TaxViewModel/TaxViewModelContextProvider';
import EditHeader from 'components/EditHeader';
import { PAGE_STATUS, Spinner, PublishOptions, Input, ActionsBar } from 'aesirx-uikit';
import { historyPush } from 'routes/routes';

const EditTax = observer(
  class EditTax extends Component {
    taxDetailViewModel = null;
    formPropsData = { [PIM_TAX_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.taxDetailViewModel = props.model?.taxDetailViewModel
        ? props.model?.taxDetailViewModel
        : null;

      this.taxDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match } = this.props;
      if (this.isEdit) {
        this.formPropsData[PIM_TAX_DETAIL_FIELD_KEY.ID] = match.params?.id;
        await this.taxDetailViewModel.initializeData();
      }
      await this.taxDetailViewModel.getTaxList();
      this.taxDetailViewModel.handleAliasChange('');
    }

    handleValidateForm() {
      if (this.validator.fields['Tax Name'] === true) {
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
      this.taxDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t } = this.props;
      // eslint-disable-next-line no-console
      console.log('rerender Tax', this.taxDetailViewModel.taxDetailViewModel.formPropsData);

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.taxDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_tax')}
              isEdit={this.isEdit}
              redirectUrl={'/taxs'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/taxs`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.taxDetailViewModel.update()
                          : await this.taxDetailViewModel.create();
                        if (!result?.error) {
                          historyPush(`/taxs`);
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
                          await this.taxDetailViewModel.update();
                          await this.taxDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.taxDetailViewModel.create();
                          if (!result?.error) {
                            historyPush(`/taxs/edit/${result?.response}`);
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
                        this.taxDetailViewModel.taxDetailViewModel.formPropsData[
                          PIM_TAX_DETAIL_FIELD_KEY.NAME
                        ],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_tax_name'),
                      handleChange: (event) => {
                        this.taxDetailViewModel.handleFormPropsData(
                          PIM_TAX_DETAIL_FIELD_KEY.NAME,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor(t('txt_tax_name'));
                      },
                    }}
                  />
                  {this.validator.message(
                    t('txt_tax_name'),
                    this.taxDetailViewModel.taxDetailViewModel.formPropsData[
                      PIM_TAX_DETAIL_FIELD_KEY.NAME
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                {/* <TaxInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={
                    this.taxDetailViewModel.taxDetailViewModel.formPropsData
                  }
                  {...this.props}
                /> */}
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.taxDetailViewModel}
                  formPropsData={this.taxDetailViewModel.taxDetailViewModel.formPropsData}
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

export default withTranslation()(withRouter(withTaxViewModel(EditTax)));
