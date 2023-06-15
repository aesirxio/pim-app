/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { Spinner } from 'aesirx-uikit';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';

import { Col, Form, Row } from 'react-bootstrap';
import ActionsBar from 'components/ActionsBar';
import { withCategoryViewModel } from 'containers/CategoriesPage/CategoryViewModel/CategoryViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import { PIM_CATEGORY_DETAIL_FIELD_KEY } from 'aesirx-lib';
import Input from 'components/Form/Input';
import CategoryTab from './Component/CategoryTab';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import EditHeader from 'components/EditHeader';
import FieldStore from 'containers/FieldsPage/FieldStore/FieldStore';
import FieldViewModel from 'containers/FieldsPage/FieldViewModel/FieldViewModel';
import { FieldViewModelContextProvider } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';
import { withRouter } from 'react-router-dom';
import { historyPush } from 'routes/routes';

const fieldStore = new FieldStore();
const fieldViewModel = new FieldViewModel(fieldStore);
const EditCategory = observer(
  class EditCategory extends Component {
    categoryDetailViewModel = null;
    formPropsData = { [PIM_CATEGORY_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);

      this.viewModel = props.viewModel ? props.viewModel : null;
      this.state = {};

      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.categoryDetailViewModel = this.viewModel
        ? this.viewModel.getCategoryDetailViewModel()
        : null;
      this.fieldListViewModel = fieldViewModel ? fieldViewModel.getFieldListViewModel() : null;
      this.categoryDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[PIM_CATEGORY_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.categoryDetailViewModel.initializeData();
      }
      this.categoryDetailViewModel.handleAliasChange('');
    }

    handleAliasFormPropsData() {
      if (
        !this.categoryDetailViewModel.categoryDetailViewModel.formPropsData[
          PIM_CATEGORY_DETAIL_FIELD_KEY.ALIAS
        ]
      ) {
        this.categoryDetailViewModel.categoryDetailViewModel.formPropsData[
          PIM_CATEGORY_DETAIL_FIELD_KEY.ALIAS
        ] = this.categoryDetailViewModel.aliasChange;
      }
    }

    handleValidateForm() {
      if (this.validator.fields['Category Name'] === true) {
        this.setState((prevState) => {
          return {
            ...prevState,
            requiredField: Math.random(1, 200),
          };
        });
      }
      this.validator.showMessages();
    }

    debouncedChangeHandler = _.debounce((value) => {
      this.categoryDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t } = this.props;

      console.log('rerender Category');
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {(this.categoryDetailViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.fieldListViewModel.formStatus === PAGE_STATUS.LOADING) && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_category')}
              isEdit={this.isEdit}
              redirectUrl={'/categories'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/categories`);
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
                      this.handleAliasFormPropsData();
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.categoryDetailViewModel.update()
                          : await this.categoryDetailViewModel.create();
                        if (result !== 0) {
                          historyPush(`/categories`);
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
                      this.handleAliasFormPropsData();
                      if (this.validator.allValid()) {
                        if (this.isEdit) {
                          await this.categoryDetailViewModel.update();
                          await this.categoryDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.categoryDetailViewModel.create();
                          historyPush(`/categories/edit/${result}`);
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
                        this.categoryDetailViewModel.categoryDetailViewModel.formPropsData[
                          PIM_CATEGORY_DETAIL_FIELD_KEY.TITLE
                        ],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_cate_name'),
                      handleChange: (event) => {
                        this.categoryDetailViewModel.handleFormPropsData(
                          PIM_CATEGORY_DETAIL_FIELD_KEY.TITLE,
                          event.target.value
                        );

                        if (
                          !this.categoryDetailViewModel.categoryDetailViewModel.formPropsData[
                            PIM_CATEGORY_DETAIL_FIELD_KEY.ALIAS
                          ]
                        ) {
                          this.debouncedChangeHandler(event.target.value);
                        }
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
                <FieldViewModelContextProvider viewModel={fieldViewModel}>
                  <CategoryTab
                    detailViewModal={this.categoryDetailViewModel}
                    validator={this.validator}
                    requiredField={this.state.requiredField}
                    isEdit={this.isEdit}
                    productType={this.formPropsData[PIM_CATEGORY_DETAIL_FIELD_KEY.PRODUCT_TYPE_ID]}
                  />
                </FieldViewModelContextProvider>
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

export default withTranslation()(withRouter(withCategoryViewModel(EditCategory)));
