/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { PIM_FILTERING_FIELDSET_DETAIL_FIELD_KEY } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import { withFilteringFieldsetViewModel } from '../FilteringFieldsetViewModel/FilteringFieldsetViewModelContextProvider';
import EditHeader from 'components/EditHeader';
import { PAGE_STATUS, Spinner, PublishOptions, Input, ActionsBar } from 'aesirx-uikit';
import { historyPush } from 'routes/routes';

const EditFilteringFieldset = observer(
  class EditFilteringFieldset extends Component {
    filteringFieldsetDetailViewModel = null;
    formPropsData = { [PIM_FILTERING_FIELDSET_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = {};
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.filteringFieldsetDetailViewModel = props.model?.filteringFieldsetDetailViewModel
        ? props.model?.filteringFieldsetDetailViewModel
        : null;

      this.filteringFieldsetDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      const { match } = this.props;
      if (this.isEdit) {
        this.formPropsData[PIM_FILTERING_FIELDSET_DETAIL_FIELD_KEY.ID] = match.params?.id;
        await this.filteringFieldsetDetailViewModel.initializeData();
      }
    }

    handleValidateForm() {
      if (this.validator.fields['FilteringFieldset Name'] === true) {
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
        'rerender FilteringFieldset',
        this.filteringFieldsetDetailViewModel.filteringFieldsetDetailViewModel.formPropsData
      );

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.filteringFieldsetDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_filtering_fieldset')}
              isEdit={this.isEdit}
              redirectUrl={'/filtering-fieldset'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/filtering-fieldset`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.filteringFieldsetDetailViewModel.update()
                          : await this.filteringFieldsetDetailViewModel.create();
                        if (!result?.error) {
                          historyPush(`/filtering-fieldset`);
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
                          await this.filteringFieldsetDetailViewModel.update();
                          await this.filteringFieldsetDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          const result = await this.filteringFieldsetDetailViewModel.create();
                          if (!result?.error) {
                            historyPush(`/filtering-fieldset/edit/${result?.response}`);
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
                        this.filteringFieldsetDetailViewModel.filteringFieldsetDetailViewModel
                          .formPropsData[PIM_FILTERING_FIELDSET_DETAIL_FIELD_KEY.TITLE],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_filtering_fieldset_name'),
                      handleChange: (event) => {
                        this.filteringFieldsetDetailViewModel.handleFormPropsData(
                          PIM_FILTERING_FIELDSET_DETAIL_FIELD_KEY.TITLE,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor(t('txt_filtering_fieldset_name'));
                      },
                    }}
                  />
                  {this.validator.message(
                    t('txt_filtering_fieldset_name'),
                    this.filteringFieldsetDetailViewModel.filteringFieldsetDetailViewModel
                      .formPropsData[PIM_FILTERING_FIELDSET_DETAIL_FIELD_KEY.TITLE],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                {/* <FilteringFieldsetInformation
                  validator={this.validator}
                  messagesShown={this.validator.messagesShown}
                  isEdit={this.isEdit}
                  formPropsData={
                    this.filteringFieldsetDetailViewModel.filteringFieldsetDetailViewModel.formPropsData
                  }
                  {...this.props}
                /> */}
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.filteringFieldsetDetailViewModel}
                  formPropsData={
                    this.filteringFieldsetDetailViewModel.filteringFieldsetDetailViewModel
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

export default withTranslation()(withRouter(withFilteringFieldsetViewModel(EditFilteringFieldset)));
