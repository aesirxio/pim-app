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
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import '../index.scss';
import ActionsBar from 'components/ActionsBar';
import CommonInformation from './Component/CommonInformation';
import { withProductViewModel } from 'containers/ProductsPage/ProductViewModel/ProductViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import { PIM_FIELD_DETAIL_FIELD_KEY, PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import Input from 'components/Form/Input';
import ProductInformation from './Component/ProductInformation';
import FieldsTab from './Component/Fields';
// import Variants from '../Component/Variants';
import SimpleReactValidator from 'simple-react-validator';
import CategoryStore from 'containers/CategoriesPage/CategoryStore/CategoryStore';
import CategoryViewModel from 'containers/CategoriesPage/CategoryViewModel/CategoryViewModel';
const categoryStore = new CategoryStore();
const categoryViewModel = new CategoryViewModel(categoryStore);
const EditProduct = observer(
  class EditProduct extends Component {
    productDetailViewModel = null;
    formPropsData = { [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = { key: 'commonInformation' };
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.productDetailViewModel = this.viewModel
        ? this.viewModel.getProductDetailViewModel()
        : null;
      this.categoryListViewModel = categoryViewModel
        ? categoryViewModel.getCategoryListViewModel()
        : null;
      this.productDetailViewModel.setForm(this);
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.productDetailViewModel.initializeData();
      }
      if (!this.categoryListViewModel.items.length) {
        await this.categoryListViewModel.handleFilter({ limit: 0 });
        await this.categoryListViewModel.initializeDataCustom();
      }
    }

    render() {
      const { t, history } = this.props;
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.productDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <div className="position-relative">
              <h2 className="text-blue-0 fw-bold mb-8px">
                {this.isEdit ? t('txt_edit') : t('txt_add_new') + ' ' + t('txt_products')}
              </h2>
            </div>
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      history.push(`/products/all`);
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
                        if (this.isEdit) {
                          await this.productDetailViewModel.update();
                        } else {
                          await this.productDetailViewModel.create();
                        }
                        history.push(`/products/all`);
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
                          await this.productDetailViewModel.update();
                          await this.productDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.productDetailViewModel.create();
                          result && history.push(`/products/edit/${result}`);
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
                        this.productDetailViewModel.productDetailViewModel.formPropsData[
                          PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE
                        ],
                      classNameInput: 'py-1 fs-4',
                      placeholder: t('txt_add_product_name'),
                      handleChange: (event) => {
                        this.productDetailViewModel.productDetailViewModel.formPropsData[
                          PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE
                        ] = event.target.value;
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor('Product Name');
                      },
                    }}
                  />
                  {this.validator.message(
                    'Product Name',
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
                  defaultActiveKey={'commonInformation'}
                  id="tab-setting"
                  onSelect={(k) => this.setState({ key: k })}
                >
                  <Tab
                    key="commonInformation"
                    eventKey="commonInformation"
                    title={t('txt_common_information')}
                  >
                    {this.state.key === 'commonInformation' && (
                      <CommonInformation
                        formPropsData={this.formPropsData}
                        validator={this.validator}
                        categoryListViewModel={this.categoryListViewModel}
                      />
                    )}
                  </Tab>
                  <Tab
                    key="productInformation"
                    eventKey="productInformation"
                    title={t('txt_product_information')}
                  >
                    <ProductInformation
                      formPropsData={this.formPropsData}
                      validator={this.validator}
                      categoryListViewModel={this.categoryListViewModel}
                    />
                  </Tab>
                  <Tab key="fields" eventKey="fields" title={t('txt_fields')}>
                    <FieldsTab
                      detailViewModal={this.productDetailViewModel}
                      formPropsData={
                        this.productDetailViewModel.productDetailViewModel.formPropsData
                      }
                      validator={this.validator}
                    />
                  </Tab>
                  {/* <Tab key="variants" eventKey="variants" title={t('txt_variants')}>
                    {this.state.key === 'variants' && (
                      <Variants formPropsData={this.formPropsData} validator={this.validator} />
                    )}
                  </Tab> */}
                </Tabs>
              </Col>
              <Col lg={3}>
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

export default withTranslation('common')(withRouter(withProductViewModel(EditProduct)));
