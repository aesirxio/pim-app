import { FORMAT_DATE_UPDATE_POST, FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_PRICES_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import Spinner from 'components/Spinner';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { withProductPriceViewModel } from 'containers/ProductPricesPage/ProductPriceViewModel/ProductPriceViewModelContextProvider';
import { Row } from 'react-bootstrap';
import DebtorGroupStore from 'containers/DebtorGroupPage/DebtorGroupStore/DebtorGroupStore';
import DebtorGroupViewModel from 'containers/DebtorGroupPage/DebtorGroupViewModel/DebtorGroupViewModel';
import ProductStore from 'containers/ProductsPage/ProductStore/ProductStore';
import ProductViewModel from 'containers/ProductsPage/ProductViewModel/ProductViewModel';
import moment from 'moment';
const debtorGroupStore = new DebtorGroupStore();
const debtorGroupViewModel = new DebtorGroupViewModel(debtorGroupStore);
const productStore = new ProductStore();
const productViewModel = new ProductViewModel(productStore);
const ProductPriceInformation = observer(
  class ProductPriceInformation extends Component {
    constructor(props) {
      super(props);
      this.debtorGroupListViewModel = debtorGroupViewModel.debtorGroupListViewModel;
      this.productListViewModel = productViewModel.productListViewModel;
      this.viewModel = this.props.viewModel.productPriceDetailViewModel;
      this.validator = this.props.validator;
    }

    componentDidMount() {
      const fetchData = async () => {
        await this.debtorGroupListViewModel.initializeData();
        await this.productListViewModel.initializeData();
        this.forceUpdate();
      };
      fetchData();
    }

    render() {
      const { t, isShowValidator } = this.props;
      console.log('isShowValidator', isShowValidator);
      const generateFormSetting = [
        {
          fields: [
            {
              label: 'txt_debtor_group',
              key: 'debtor_group',
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.productPriceDetailViewModel.formPropsData[
                PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS
              ][PIM_PRICES_DETAIL_FIELD_KEY.DEBTOR_GROUP]
                ? {
                    label: this.debtorGroupListViewModel.items?.find(
                      (x) =>
                        x.id.toString() ===
                        this.viewModel.productPriceDetailViewModel.formPropsData[
                          PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                        ][PIM_PRICES_DETAIL_FIELD_KEY.DEBTOR_GROUP].toString()
                    )?.title,
                    value:
                      this.viewModel.productPriceDetailViewModel.formPropsData[
                        PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                      ][PIM_PRICES_DETAIL_FIELD_KEY.DEBTOR_GROUP],
                  }
                : null,
              getDataSelectOptions: this.debtorGroupListViewModel.items
                ? this.debtorGroupListViewModel.items.map((item) => {
                    return {
                      label: item.title,
                      value: item.id,
                    };
                  })
                : null,
              className: 'col-lg-12',
              placeholder: t('txt_select'),
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS, {
                  [PIM_PRICES_DETAIL_FIELD_KEY.DEBTOR_GROUP]: [data.value],
                });
              },
            },
            {
              label: t('txt_product_name'),
              key: 'product_name',
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.productPriceDetailViewModel.formPropsData[
                PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS
              ][PIM_PRICES_DETAIL_FIELD_KEY.PIM_PRODUCT]
                ? {
                    label: this.productListViewModel.items?.find(
                      (x) =>
                        x.id.toString() ===
                        this.viewModel.productPriceDetailViewModel.formPropsData[
                          PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                        ][PIM_PRICES_DETAIL_FIELD_KEY.PIM_PRODUCT].toString()
                    )?.title,
                    value:
                      this.viewModel.productPriceDetailViewModel.formPropsData[
                        PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                      ][PIM_PRICES_DETAIL_FIELD_KEY.PIM_PRODUCT],
                  }
                : null,
              getDataSelectOptions: this.productListViewModel.items
                ? this.productListViewModel.items.map((item) => {
                    return {
                      label: item.title,
                      value: item.id,
                    };
                  })
                : null,
              // required: true,
              // validation: 'required',
              className: 'col-lg-12',
              placeholder: t('txt_select'),
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS, {
                  [PIM_PRICES_DETAIL_FIELD_KEY.PIM_PRODUCT]: [data.value],
                });
              },
            },
            {
              label: t('txt_price'),
              key: 'price',
              type: FORM_FIELD_TYPE.NUMBER,
              format: 'VND',
              getValueSelected:
                this.viewModel.productPriceDetailViewModel.formPropsData[
                  PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ][PIM_PRICES_DETAIL_FIELD_KEY.PRICE],
              className: 'col-lg-6',
              // required: true,
              // validation: 'required',
              placeholder: t('txt_type'),
              handleChange: (event) => {
                this.viewModel.handleFormPropsData([PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS], {
                  [PIM_PRICES_DETAIL_FIELD_KEY.PRICE]: event.target.value,
                });
              },
              blurred: () => {
                this.validator.showMessageFor(t('txt_price'));
              },
            },
            {
              label: t('txt_retail_price'),
              key: 'retail_price',
              type: FORM_FIELD_TYPE.NUMBER,
              format: 'VND',
              getValueSelected:
                this.viewModel.productPriceDetailViewModel.formPropsData[
                  PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ][PIM_PRICES_DETAIL_FIELD_KEY.RETAIL_PRICE],
              className: 'col-lg-6',
              // required: true,
              // validation: 'required',
              placeholder: t('txt_type'),
              handleChange: (event) => {
                this.viewModel.handleFormPropsData([PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS], {
                  [PIM_PRICES_DETAIL_FIELD_KEY.RETAIL_PRICE]: event.target.value,
                });
              },
              blurred: () => {
                this.validator.showMessageFor(t('txt_retail_price'));
              },
            },
            {
              label: 'txt_start_time',
              key: 'start_time',
              type: FORM_FIELD_TYPE.DATE,
              getValueSelected:
                this.viewModel.productPriceDetailViewModel.formPropsData[
                  PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ][PIM_PRICES_DETAIL_FIELD_KEY.STARTING_DATE],
              className: 'col-lg-6',
              placeholder: 'dd/mm/yyyy',
              handleChange: (event) => {
                this.viewModel.handleFormPropsData([PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS], {
                  [PIM_PRICES_DETAIL_FIELD_KEY.STARTING_DATE]:
                    event && moment(event).format(FORMAT_DATE_UPDATE_POST),
                });
              },
            },
            {
              label: 'txt_end_time',
              key: 'end_time',
              type: FORM_FIELD_TYPE.DATE,
              getValueSelected:
                this.viewModel.productPriceDetailViewModel.formPropsData[
                  PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ][PIM_PRICES_DETAIL_FIELD_KEY.ENDING_DATE],
              className: 'col-lg-6',
              placeholder: 'dd/mm/yyyy',
              handleChange: (event) => {
                this.viewModel.handleFormPropsData([PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS], {
                  [PIM_PRICES_DETAIL_FIELD_KEY.ENDING_DATE]:
                    event && moment(event).format(FORMAT_DATE_UPDATE_POST),
                });
              },
            },
            {
              label: 'txt_quantity_min',
              key: 'quantity_min',
              type: FORM_FIELD_TYPE.NUMBER,
              getValueSelected:
                this.viewModel.productPriceDetailViewModel.formPropsData[
                  PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ][PIM_PRICES_DETAIL_FIELD_KEY.QUANTITY_MIN],
              className: 'col-lg-6',
              handleChange: (event) => {
                this.viewModel.handleFormPropsData([PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS], {
                  [PIM_PRICES_DETAIL_FIELD_KEY.QUANTITY_MIN]: event.target.value,
                });
              },
            },
            {
              label: 'txt_quantity_max',
              key: 'quantity_max',
              type: FORM_FIELD_TYPE.NUMBER,
              getValueSelected:
                this.viewModel.productPriceDetailViewModel.formPropsData[
                  PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ][PIM_PRICES_DETAIL_FIELD_KEY.QUANTITY_MAX],
              className: 'col-lg-6',
              handleChange: (event) => {
                this.viewModel.handleFormPropsData([PIM_PRICES_DETAIL_FIELD_KEY.CUSTOM_FIELDS], {
                  [PIM_PRICES_DETAIL_FIELD_KEY.QUANTITY_MAX]: event.target.value,
                });
              },
            },
          ],
        },
      ];
      return (
        <Row className="gx-24">
          {(this.props.viewModel.productPriceDetailViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.productListViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.debtorGroupListViewModel.formStatus === PAGE_STATUS.LOADING) && (
            <Spinner className="spinner-overlay" />
          )}
          {Object.keys(generateFormSetting)
            .map((groupIndex) => {
              return [...Array(generateFormSetting[groupIndex])].map((group) => {
                return renderingGroupFieldHandler(group, this.validator);
              });
            })
            .reduce((arr, el) => {
              return arr.concat(el);
            }, [])}
        </Row>
      );
    }
  }
);
export default withTranslation('common')(withProductPriceViewModel(ProductPriceInformation));
