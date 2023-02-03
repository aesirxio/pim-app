/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import ActionsBar from 'components/ActionsBar';
import { withFieldViewModel } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import Input from 'components/Form/Input';
import SimpleReactValidator from 'simple-react-validator';
import FieldInformation from './Component/FieldInformation';
import EditHeader from 'components/EditHeader';

const EditField = observer(
  class EditField extends Component {
    fieldDetailViewModel = null;
    formPropsData = {
      [PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]: {},
    };
    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.state = {};

      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.fieldDetailViewModel = this.viewModel ? this.viewModel.getFieldDetailViewModel() : null;
      this.fieldDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.fieldDetailViewModel.initializeData();
      } else {
        this.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.PUBLISHED] = 1;
      }
    }

    render() {
      const { t } = this.props;
      let history = this.props.history;
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.fieldDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_field')}
              isEdit={this.isEdit}
              redirectUrl={'/fields'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      history.push(`/fields`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  // {
                  //   title: t('txt_preview'),
                  //   handle: () => {},
                  //   icon: '/assets/images/preview.svg',
                  // },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.fieldDetailViewModel.update()
                          : await this.fieldDetailViewModel.create();
                        if (result !== 0) {
                          history.push(`/fields`);
                        }
                      } else {
                        this.validator.showMessages();
                      }
                    },
                  },
                  {
                    title: t('txt_save'),
                    validator: this.validator,
                    handle: async () => {
                      if (this.validator.allValid()) {
                        if (this.isEdit) {
                          await this.fieldDetailViewModel.update();
                          await this.fieldDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.fieldDetailViewModel.create();
                          history.push(`/fields/edit/${result}`);
                        }
                      } else {
                        this.validator.showMessages();
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
                        this.fieldDetailViewModel.fieldDetailViewModel.formPropsData[
                          PIM_FIELD_DETAIL_FIELD_KEY.NAME
                        ],
                      classNameInput: 'py-1 fs-4',
                      placeholder: t('txt_add_field_name'),
                      handleChange: (event) => {
                        this.fieldDetailViewModel.handleFormPropsData(
                          PIM_FIELD_DETAIL_FIELD_KEY.NAME,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor('Field Name');
                      },
                    }}
                  />
                  {this.validator.message(
                    'Field Name',
                    this.fieldDetailViewModel.fieldDetailViewModel.formPropsData[
                      PIM_FIELD_DETAIL_FIELD_KEY.NAME
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                <FieldInformation validator={this.validator} />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.fieldDetailViewModel}
                  formPropsData={this.fieldDetailViewModel.fieldDetailViewModel.formPropsData}
                  isEdit={this.isEdit}
                  isPublished={false}
                  isFeatured={false}
                  isLastModified={false}
                  isCreateBy={false}
                />
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withFieldViewModel(EditField)));
