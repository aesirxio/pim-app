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
import { withDebtorGroupViewModel } from 'containers/DebtorGroupPage/DebtorGroupViewModel/DebtorGroupViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import { PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import Input from 'components/Form/Input';
import SimpleReactValidator from 'simple-react-validator';
import DebtorGroupInformation from './Component/DebtorGroupInformation';
import EditHeader from 'components/EditHeader';

const EditDebtorGroup = observer(
  class EditDebtorGroup extends Component {
    debtorGroupDetailViewModel = null;
    formPropsData = { [PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };

    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.state = {};

      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.debtorGroupDetailViewModel = this.viewModel
        ? this.viewModel.getDebtorGroupDetailViewModel()
        : null;
      this.debtorGroupDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.debtorGroupDetailViewModel.initializeData();
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
          {this.debtorGroupDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_debtor_group')}
              isEdit={this.isEdit}
              redirectUrl={'/debtor-group'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      history.push(`/debtor-group`);
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
                          ? await this.debtorGroupDetailViewModel.update()
                          : await this.debtorGroupDetailViewModel.create();
                        if (result !== 0) {
                          history.push(`/debtor-group`);
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
                          await this.debtorGroupDetailViewModel.update();
                          await this.debtorGroupDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.debtorGroupDetailViewModel.create();
                          result && history.push(`/debtor-group/edit/${result}`);
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
                        this.debtorGroupDetailViewModel.debtorGroupDetailViewModel.formPropsData[
                          PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.TITLE
                        ],
                      classNameInput: 'py-1 fs-4',
                      placeholder: t('txt_add_debtor_group_name'),
                      handleChange: (event) => {
                        this.debtorGroupDetailViewModel.handleFormPropsData(
                          PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.TITLE,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor('DebtorGroup Name');
                      },
                    }}
                  />
                  {this.validator.message(
                    'DebtorGroup Name',
                    this.debtorGroupDetailViewModel.debtorGroupDetailViewModel.formPropsData[
                      PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.TITLE
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                <DebtorGroupInformation validator={this.validator} />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.debtorGroupDetailViewModel}
                  formPropsData={
                    this.debtorGroupDetailViewModel.debtorGroupDetailViewModel.formPropsData
                  }
                  isEdit={this.isEdit}
                />
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withDebtorGroupViewModel(EditDebtorGroup)));
