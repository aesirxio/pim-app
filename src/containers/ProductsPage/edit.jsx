/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import './index.scss';
import ActionsBar from 'components/ActionsBar';
import CommonInformation from './Component/CommonInformation';
import ProductStore from 'containers/ProductsPage/ProductStore/ProductStore';
import ProductViewModel from 'containers/ProductsPage/ProductViewModel/ProductViewModel';
import {
  ProductViewModelContextProvider,
  withProductViewModel,
} from 'containers/ProductsPage/ProductViewModel/ProductViewModelContextProvider';
import PublishOptions from './Component/PublishOptions';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import Input from 'components/Form/Input';
import ProductInformation from './Component/ProductInformation';
import FieldsTab from './Component/FieldsTab';

const productStore = new ProductStore();
const productViewModel = new ProductViewModel(productStore);

const EditProduct = observer(
  class EditProduct extends Component {
    updateProductViewModel = null;
    formPropsData = {};
    validator = null;
    constructor(props) {
      super(props);
      this.viewModel = productViewModel ? productViewModel : null;
      this.state = { key: 'commonInformation' };

      this.updateProductViewModel = this.viewModel
        ? this.viewModel.getUpdateProductViewModel()
        : null;
      this.updateProductViewModel.setAllValue(this);
      this.updateProductViewModel.setForm(this);
    }

    render() {
      const { t } = this.props;

      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <div className="position-relative">
              <h2 className="text-blue-0 fw-bold mb-8px">{t('txt_add_new_product')}</h2>
            </div>
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: () => {},
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_preview'),
                    handle: () => {},
                    icon: '/assets/images/preview.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: () => {},
                  },
                  {
                    title: t('txt_save'),
                    handle: () => {},
                    icon: '/assets/images/save.svg',
                    variant: 'success',
                  },
                ]}
              />
            </div>
          </div>
          <ProductViewModelContextProvider viewModel={productViewModel}>
            <Form>
              <Row className="gx-24 mb-24">
                <Col lg={9}>
                  <Form.Group className={`mb-24`}>
                    <Input
                      field={{
                        value: this.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE],
                        classNameInput: 'py-1 fs-4',
                        placeholder: t('txt_add_product_name'),
                        changed: (event) => {
                          this.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE] =
                            event.target.value;
                        },
                      }}
                    />
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
                        />
                      )}
                    </Tab>
                    <Tab
                      key="productInformation"
                      eventKey="productInformation"
                      title={t('txt_product_information')}
                    >
                      {this.state.key === 'productInformation' && (
                        <ProductInformation
                          formPropsData={this.formPropsData}
                          validator={this.validator}
                        />
                      )}
                    </Tab>
                    <Tab key="fields" eventKey="fields" title={t('txt_fields')}>
                      {this.state.key === 'fields' && (
                        <FieldsTab formPropsData={this.formPropsData} validator={this.validator} />
                      )}
                    </Tab>
                    <Tab key="variants" eventKey="variants" title={t('txt_variants')}>
                      {this.state.key === 'variants' && (
                        <CommonInformation
                          formPropsData={this.formPropsData}
                          validator={this.validator}
                        />
                      )}
                    </Tab>
                  </Tabs>
                </Col>
                <Col lg={3}>
                  <PublishOptions formPropsData={this.formPropsData} />
                </Col>
              </Row>
            </Form>
          </ProductViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withProductViewModel(EditProduct)));
