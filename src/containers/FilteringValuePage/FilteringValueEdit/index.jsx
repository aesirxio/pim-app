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
import { PIM_FILTERING_VALUE_DETAIL_FIELD_KEY } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import { withFilteringValueViewModel } from '../FilteringValueViewModel/FilteringValueViewModelContextProvider';
import EditHeader from 'components/EditHeader';
import { PAGE_STATUS, Spinner, PublishOptions } from 'aesirx-uikit';
import Input from 'components/Form/Input';
import { historyPush } from 'routes/routes';
import FilteringValueInformation from './Component/FilteringValueInformation';

const EditFilteringValue = observer(
  class EditFilteringValue extends Component {
    filteringValueDetailViewModel = null;
    formPropsData = { [PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.filteringValueDetailViewModel = props.model?.filteringValueDetailViewModel
        ? props.model?.filteringValueDetailViewModel
        : null;

      this.filteringValueDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match } = this.props;
      if (this.isEdit) {
        this.formPropsData[PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.ID] = match.params?.id;
        await this.filteringValueDetailViewModel.initializeData();
      }
      await this.filteringValueDetailViewModel.getFilteringValueList();
      this.filteringValueDetailViewModel.handleAliasChange('');
    }

    handleValidateForm() {
      if (this.validator.fields['FilteringValue Name'] === true) {
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
      this.filteringValueDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t } = this.props;
      // eslint-disable-next-line no-console
      console.log(
        'rerender FilteringValue',
        this.filteringValueDetailViewModel.filteringValueDetailViewModel.formPropsData
      );

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.filteringValueDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_filtering_value')}
              isEdit={this.isEdit}
              redirectUrl={'/filtering-value'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/filtering-value`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.filteringValueDetailViewModel.update()
                          : await this.filteringValueDetailViewModel.create();
                        if (!result?.error) {
                          historyPush(`/filtering-value`);
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
                          await this.filteringValueDetailViewModel.update();
                          await this.filteringValueDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.filteringValueDetailViewModel.create();
                          if (!result?.error) {
                            historyPush(`/filtering-value/edit/${result?.response}`);
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
                        this.filteringValueDetailViewModel.filteringValueDetailViewModel
                          .formPropsData[PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.VALUE],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_filtering_value'),
                      handleChange: (event) => {
                        this.filteringValueDetailViewModel.handleFormPropsData(
                          PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.VALUE,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor(t('txt_filtering_value'));
                      },
                    }}
                  />
                  {this.validator.message(
                    t('txt_filtering_value'),
                    this.filteringValueDetailViewModel.filteringValueDetailViewModel.formPropsData[
                      PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.VALUE
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                <FilteringValueInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={
                    this.filteringValueDetailViewModel.filteringValueDetailViewModel.formPropsData
                  }
                  {...this.props}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.filteringValueDetailViewModel}
                  formPropsData={
                    this.filteringValueDetailViewModel.filteringValueDetailViewModel.formPropsData
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

export default withTranslation()(withRouter(withFilteringValueViewModel(EditFilteringValue)));
