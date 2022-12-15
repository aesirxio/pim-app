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
import { withCategoryViewModel } from 'containers/CategoriesPage/CategoryViewModel/CategoryViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import {
  PIM_CATEGORY_DETAIL_FIELD_KEY,
  PIM_FIELD_DETAIL_FIELD_KEY,
} from 'library/Constant/PimConstant';
import Input from 'components/Form/Input';
import CategoryTab from './Component/CategoryTab';
import SimpleReactValidator from 'simple-react-validator';

const EditCategory = observer(
  class EditCategory extends Component {
    categoryDetailViewModel = null;
    formPropsData = { [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.state = {};

      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.categoryDetailViewModel = this.viewModel
        ? this.viewModel.getCategoryDetailViewModel()
        : null;
      this.categoryDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[PIM_CATEGORY_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.categoryDetailViewModel.initializeData();
      } else {
        this.categoryDetailViewModel.initFormPropsData();
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
          {this.categoryDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <div className="position-relative">
              <h2 className="text-blue-0 fw-bold mb-8px">
                {this.isEdit ? t('txt_edit') : t('txt_add_new')} {t('txt_category')}
              </h2>
            </div>
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: () => {},
                    icon: '/assets/images/cancel.svg',
                  },
                  // {
                  //   title: t('txt_preview'),
                  //   handle: () => {},
                  //   icon: '/assets/images/preview.svg',
                  // },
                  {
                    title: t('txt_save_close'),
                    handle: () => {},
                  },
                  {
                    title: t('txt_save'),
                    validator: this.validator,
                    handle: async () => {
                      if (this.validator.allValid()) {
                        if (this.isEdit) {
                          await this.categoryDetailViewModel.update();
                          await this.categoryDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.categoryDetailViewModel.create();
                          console.log('result', result);
                          history.push(`/categories/edit/${result}`);
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
                      value:
                        this.categoryDetailViewModel.categoryDetailViewModel.formPropsData[
                          PIM_CATEGORY_DETAIL_FIELD_KEY.TITLE
                        ],
                      classNameInput: 'py-1 fs-4',
                      placeholder: t('txt_add_cate_name'),
                      handleChange: (event) => {
                        this.categoryDetailViewModel.handleFormPropsData(
                          PIM_CATEGORY_DETAIL_FIELD_KEY.TITLE,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor('Category Name');
                      },
                    }}
                  />
                  {this.validator.message(
                    'Category Name',
                    this.categoryDetailViewModel.categoryDetailViewModel.formPropsData[
                      PIM_CATEGORY_DETAIL_FIELD_KEY.TITLE
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                <CategoryTab
                  detailViewModal={this.categoryDetailViewModel}
                  validator={this.validator}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.categoryDetailViewModel}
                  formPropsData={this.categoryDetailViewModel.categoryDetailViewModel.formPropsData}
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

export default withTranslation('common')(withRouter(withCategoryViewModel(EditCategory)));
