/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { PIM_TAX_GROUP_DETAIL_FIELD_KEY } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import { withTaxGroupViewModel } from '../TaxGroupViewModel/TaxGroupViewModelContextProvider';
import EditHeader from 'components/EditHeader';
import { PAGE_STATUS, Spinner, PublishOptions, Input, ActionsBar } from 'aesirx-uikit';
import { historyPush } from 'routes/routes';

const EditTaxGroup = observer(
  class EditTaxGroup extends Component {
    taxGroupDetailViewModel = null;
    formPropsData = { [PIM_TAX_GROUP_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.taxGroupDetailViewModel = props.model?.taxGroupDetailViewModel
        ? props.model?.taxGroupDetailViewModel
        : null;

      this.taxGroupDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match } = this.props;
      if (this.isEdit) {
        this.formPropsData[PIM_TAX_GROUP_DETAIL_FIELD_KEY.ID] = match.params?.id;
        await this.taxGroupDetailViewModel.initializeData();
      }
      await this.taxGroupDetailViewModel.getTaxGroupList();
      this.taxGroupDetailViewModel.handleAliasChange('');
    }

    handleValidateForm() {
      if (this.validator.fields['TaxGroup Name'] === true) {
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
      this.taxGroupDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t } = this.props;
      // eslint-disable-next-line no-console
      console.log(
        'rerender TaxGroup',
        this.taxGroupDetailViewModel.taxGroupDetailViewModel.formPropsData
      );

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.taxGroupDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_tax_group')}
              isEdit={this.isEdit}
              redirectUrl={'/taxGroups'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/taxGroups`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.taxGroupDetailViewModel.update()
                          : await this.taxGroupDetailViewModel.create();
                        if (!result?.error) {
                          historyPush(`/taxGroups`);
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
                          await this.taxGroupDetailViewModel.update();
                          await this.taxGroupDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.taxGroupDetailViewModel.create();
                          if (!result?.error) {
                            historyPush(`/taxGroups/edit/${result?.response}`);
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
                        this.taxGroupDetailViewModel.taxGroupDetailViewModel.formPropsData[
                          PIM_TAX_GROUP_DETAIL_FIELD_KEY.NAME
                        ],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_tax_group_name'),
                      handleChange: (event) => {
                        this.taxGroupDetailViewModel.handleFormPropsData(
                          PIM_TAX_GROUP_DETAIL_FIELD_KEY.NAME,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor(t('txt_tax_group_name'));
                      },
                    }}
                  />
                  {this.validator.message(
                    t('txt_tax_group_name'),
                    this.taxGroupDetailViewModel.taxGroupDetailViewModel.formPropsData[
                      PIM_TAX_GROUP_DETAIL_FIELD_KEY.NAME
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                {/* <TaxGroupInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={
                    this.taxGroupDetailViewModel.taxGroupDetailViewModel.formPropsData
                  }
                  {...this.props}
                /> */}
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.taxGroupDetailViewModel}
                  formPropsData={this.taxGroupDetailViewModel.taxGroupDetailViewModel.formPropsData}
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

export default withTranslation()(withRouter(withTaxGroupViewModel(EditTaxGroup)));
