/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { Spinner, Input, PublishOptions, ActionsBar } from 'aesirx-uikit';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import '../index.scss';
import CommonInformation from './Component/CommonInformation';
import { withProductViewModel } from 'containers/ProductsPage/ProductViewModel/ProductViewModelContextProvider';
import { PIM_FIELD_DETAIL_FIELD_KEY, PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-lib';
import ProductInformation from './Component/ProductInformation';
import FieldsTab from './Component/Fields';
// import Variants from '../Component/Variants';
import SimpleReactValidator from 'simple-react-validator';
import CategoryStore from 'containers/CategoriesPage/CategoryStore/CategoryStore';
import CategoryViewModel from 'containers/CategoriesPage/CategoryViewModel/CategoryViewModel';
import _ from 'lodash';
import EditHeader from 'components/EditHeader';

import FieldStore from 'containers/FieldsPage/FieldStore/FieldStore';
import FieldViewModel from 'containers/FieldsPage/FieldViewModel/FieldViewModel';
import { FieldViewModelContextProvider } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';
import { historyPush } from 'routes/routes';
import { BrandStore } from 'containers/BrandPage/store';
import BrandViewModel from 'containers/BrandPage/BrandViewModel/BrandViewModel';
import { TypeStore } from 'containers/TypePage/store';
import TypeViewModel from 'containers/TypePage/TypeViewModel/TypeViewModel';
import { SubTypeStore } from 'containers/SubTypePage/store';
import SubTypeViewModel from 'containers/SubTypePage/SubTypeViewModel/SubTypeViewModel';

const categoryStore = new CategoryStore();
const categoryViewModel = new CategoryViewModel(categoryStore);
const brandStore = new BrandStore();
const brandViewModel = new BrandViewModel(brandStore);
const fieldStore = new FieldStore();
const fieldViewModel = new FieldViewModel(fieldStore);
const typeStore = new TypeStore();
const typeViewModel = new TypeViewModel(typeStore);
const subTypeStore = new SubTypeStore();
const subTypeViewModel = new SubTypeViewModel(subTypeStore);

const EditProduct = observer(
  class EditProduct extends Component {
    productDetailViewModel = null;
    formPropsData = { [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = { key: 'commonInformation', requiredField: '' };
      this.viewModel = props?.model ? props?.model : null;
      this.productDetailViewModel = this.viewModel
        ? this.viewModel.getProductDetailViewModel()
        : null;
      this.categoryListViewModel = categoryViewModel
        ? categoryViewModel.getCategoryListViewModel()
        : null;
      this.brandListViewModel = brandViewModel ? brandViewModel.getBrandListViewModel() : null;
      this.fieldListViewModel = fieldViewModel ? fieldViewModel.getFieldListViewModel() : null;
      this.typeListViewModel = typeViewModel ? typeViewModel.getTypeListViewModel() : null;
      this.subTypeListViewModel = subTypeViewModel
        ? subTypeViewModel.getSubTypeListViewModel()
        : null;
      this.productDetailViewModel.setForm(this);
      this.validator = new SimpleReactValidator({
        autoForceUpdate: this,
      });
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
      }

      await Promise.all([
        this.isEdit && this.productDetailViewModel.initializeData(),
        await this.categoryListViewModel.handleFilter({ 'list[limit]': 9999 }),
        this.categoryListViewModel.initializeDataCustom(),
        this.brandListViewModel.initializeAllData(),
        this.typeListViewModel.initializeAllData(),
        this.subTypeListViewModel.initializeAllData(),
      ]).then(() => {
        this.productDetailViewModel.handleAliasChange('');
      });
    }

    handleAliasFormPropsData() {
      if (
        !this.productDetailViewModel.productDetailViewModel.formPropsData[
          PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS
        ]
      ) {
        this.productDetailViewModel.productDetailViewModel.formPropsData[
          PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS
        ] = this.productDetailViewModel.aliasChange;
      }
    }
    debouncedChangeHandler = _.debounce((value) => {
      this.productDetailViewModel.handleAliasChange(value);
    }, 300);

    handleValidateForm() {
      if (this.validator.fields['Product Name'] === true) {
        this.setState((prevState) => {
          return {
            ...prevState,
            key: 'fields',
            requiredField: Math.random(1, 200),
          };
        });
      }
      this.validator.showMessages();
    }

    render() {
      const { t } = this.props;
      this.validator.messages['required'] = t('txt_field_required_error_message');

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {(this.productDetailViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.fieldListViewModel.formStatus === PAGE_STATUS.LOADING) && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_products')}
              isEdit={this.isEdit}
              redirectUrl={'/products/all'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/products/all`);
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
                        this.handleAliasFormPropsData();
                        const result = this.isEdit
                          ? await this.productDetailViewModel.update()
                          : await this.productDetailViewModel.create();
                        if (result !== 0) {
                          historyPush(`/products/all`);
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
                        this.handleAliasFormPropsData();
                        if (this.isEdit) {
                          await this.productDetailViewModel.update();
                          await this.productDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.productDetailViewModel.create();
                          result && historyPush(`/products/edit/${result?.response}`);
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
              <Col xxl={9} lg={8}>
                <Form.Group className={`mb-24`}>
                  <Input
                    field={{
                      getValueSelected:
                        this.productDetailViewModel.productDetailViewModel.formPropsData[
                          PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE
                        ],
                      classNameInput: 'py-10 fs-4',
                      placeholder: t('txt_add_product_name'),
                      handleChange: (event) => {
                        this.productDetailViewModel.productDetailViewModel.formPropsData[
                          PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE
                        ] = event.target.value;
                        if (
                          !this.productDetailViewModel.productDetailViewModel.formPropsData[
                            PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS
                          ]
                        ) {
                          this.debouncedChangeHandler(event.target.value);
                        }
                      },
                      required: true,
                      blurred: () => {
                        this.validator.showMessageFor(t('txt_product_name'));
                      },
                    }}
                  />
                  {this.validator.message(
                    t('txt_product_name'),
                    this.productDetailViewModel.productDetailViewModel.formPropsData[
                      PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                <Tabs
                  activeKey={this.state.key}
                  id="tab-setting"
                  onSelect={(k) =>
                    this.setState((prevState) => {
                      return {
                        ...prevState,
                        key: k,
                      };
                    })
                  }
                >
                  <Tab eventKey="commonInformation" title={t('txt_common_information')}>
                    {this.state.key === 'commonInformation' && (
                      <CommonInformation
                        formPropsData={this.formPropsData}
                        validator={this.validator}
                        categoryListViewModel={this.categoryListViewModel}
                        brandListViewModel={this.brandListViewModel}
                        typeListViewModel={this.typeListViewModel}
                        subTypeListViewModel={this.subTypeListViewModel}
                        isEdit={this.isEdit}
                      />
                    )}
                  </Tab>
                  <Tab eventKey="productInformation" title={t('txt_product_information')}>
                    <ProductInformation
                      formPropsData={this.formPropsData}
                      validator={this.validator}
                      categoryListViewModel={this.categoryListViewModel}
                    />
                  </Tab>
                  <Tab eventKey="fields" title={t('txt_fields')}>
                    <FieldViewModelContextProvider viewModel={fieldViewModel}>
                      <FieldsTab
                        key={
                          !this.productDetailViewModel.productType
                            ? this.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.PRODUCT_TYPE_ID]
                            : this.productDetailViewModel.productType
                        }
                        detailViewModal={this.productDetailViewModel}
                        fieldListViewModel={this.fieldListViewModel}
                        formPropsData={
                          this.productDetailViewModel.productDetailViewModel.formPropsData
                        }
                        validator={this.validator}
                        requiredField={this.state.requiredField}
                        productType={this.productDetailViewModel.productType}
                      />
                    </FieldViewModelContextProvider>
                  </Tab>
                  {/* <Tab key="variants" eventKey="variants" title={t('txt_variants')}>
                    {this.state.key === 'variants' && (
                      <Variants formPropsData={this.formPropsData} validator={this.validator} />
                    )}
                  </Tab> */}
                </Tabs>
              </Col>
              <Col xxl={3} lg={4}>
                <PublishOptions
                  detailViewModal={this.productDetailViewModel}
                  formPropsData={this.productDetailViewModel.productDetailViewModel.formPropsData}
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

export default withTranslation()(withRouter(withProductViewModel(EditProduct)));
