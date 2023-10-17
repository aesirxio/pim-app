/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import { withTypeViewModel } from '../TypeViewModel/TypeViewModelContextProvider';
import EditHeader from 'components/EditHeader';
import { PAGE_STATUS, Spinner, PublishOptions, Input, ActionsBar } from 'aesirx-uikit';
import { historyPush } from 'routes/routes';

const EditType = observer(
  class EditType extends Component {
    typeDetailViewModel = null;
    formPropsData = { [PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.typeDetailViewModel = props.model?.typeDetailViewModel
        ? props.model?.typeDetailViewModel
        : null;

      this.typeDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match } = this.props;
      if (this.isEdit) {
        this.formPropsData[PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.ID] = match.params?.id;
        await this.typeDetailViewModel.initializeData();
      }
      await this.typeDetailViewModel.getTypeList();
      this.typeDetailViewModel.handleAliasChange('');
    }

    handleValidateForm() {
      if (this.validator.fields['Type Name'] === true) {
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
      this.typeDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t } = this.props;
      // eslint-disable-next-line no-console
      console.log('rerender Type', this.typeDetailViewModel.typeDetailViewModel.formPropsData);

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.typeDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_type')}
              isEdit={this.isEdit}
              redirectUrl={'/types'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/types`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.typeDetailViewModel.update()
                          : await this.typeDetailViewModel.create();
                        if (!result?.error) {
                          historyPush(`/types`);
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
                          await this.typeDetailViewModel.update();
                          await this.typeDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.typeDetailViewModel.create();
                          if (!result?.error) {
                            historyPush(`/types/edit/${result?.response}`);
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
                        this.typeDetailViewModel.typeDetailViewModel.formPropsData[
                          PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.NAME
                        ],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_type_name'),
                      handleChange: (event) => {
                        this.typeDetailViewModel.handleFormPropsData(
                          PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.NAME,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor(t('txt_type_name'));
                      },
                    }}
                  />
                  {this.validator.message(
                    t('txt_type_name'),
                    this.typeDetailViewModel.typeDetailViewModel.formPropsData[
                      PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.NAME
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                {/* <TypeInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={
                    this.typeDetailViewModel.typeDetailViewModel.formPropsData
                  }
                  {...this.props}
                /> */}
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.typeDetailViewModel}
                  formPropsData={this.typeDetailViewModel.typeDetailViewModel.formPropsData}
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

export default withTranslation()(withRouter(withTypeViewModel(EditType)));
