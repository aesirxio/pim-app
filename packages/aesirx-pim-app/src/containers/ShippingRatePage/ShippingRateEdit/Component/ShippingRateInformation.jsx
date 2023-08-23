import {
  PIM_CATEGORY_DETAIL_FIELD_KEY,
  PIM_PRODUCT_DETAIL_FIELD_KEY,
  PIM_SHIPPING_RATE_DETAIL_FIELD_KEY,
} from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { FORM_FIELD_TYPE, PAGE_STATUS, Spinner, renderingGroupFieldHandler } from 'aesirx-uikit';
import { ShippingRateViewModelContext } from 'containers/ShippingRatePage/ShippingRateViewModel/ShippingRateViewModelContextProvider';
import { Row } from 'react-bootstrap';
import { ShippingMethodStore } from 'containers/ShippingMethodPage/store';
import ShippingMethodViewModel from 'containers/ShippingMethodPage/ShippingMethodViewModel/ShippingMethodViewModel';
import { ShippingZoneStore } from 'containers/ShippingZonePage/store';
import ShippingZoneViewModel from 'containers/ShippingZonePage/ShippingZoneViewModel/ShippingZoneViewModel';
import ProductStore from 'containers/ProductsPage/ProductStore/ProductStore';
import ProductViewModel from 'containers/ProductsPage/ProductViewModel/ProductViewModel';
import CategoryStore from 'containers/CategoriesPage/CategoryStore/CategoryStore';
import CategoryViewModel from 'containers/CategoriesPage/CategoryViewModel/CategoryViewModel';

const shippingMethodStore = new ShippingMethodStore();
const shippingMethodViewModel = new ShippingMethodViewModel(shippingMethodStore);
const shippingZoneStore = new ShippingZoneStore();
const shippingZoneViewModel = new ShippingZoneViewModel(shippingZoneStore);
const productStore = new ProductStore();
const productViewModel = new ProductViewModel(productStore);
const categoryStore = new CategoryStore();
const categoryViewModel = new CategoryViewModel(categoryStore);

const ShippingRateInformation = observer(
  class ShippingRateInformation extends Component {
    static contextType = ShippingRateViewModelContext;

    constructor(props) {
      super(props);
      this.shippingMethodListViewModel = shippingMethodViewModel.shippingMethodListViewModel;
      this.shippingZoneListViewModel = shippingZoneViewModel.shippingZoneListViewModel;
      this.productListViewModel = productViewModel.productListViewModel;
      this.categoryListViewModel = categoryViewModel.categoryListViewModel;
      this.state = {
        priceRate: 'price',
      };
      this.validator = this.props.validator;
    }

    componentDidMount() {
      const fetchData = async () => {
        Promise.all([
          this.shippingMethodListViewModel.initializeAllData(),
          this.shippingZoneListViewModel.initializeAllData(),
          this.productListViewModel.handleFilter({ 'list[limit]': 9999 }),
          this.productListViewModel.initializeDataListProduct(),
          this.categoryListViewModel.handleFilter({ 'list[limit]': 9999 }),
          this.categoryListViewModel.initializeDataCustom(),
        ]);
      };
      fetchData();
    }

    render() {
      this.viewModel = this.context.model.shippingRateDetailViewModel;

      const { t, validator, isEdit } = this.props;

      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_shipping_method'),
              key: PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_METHOD,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.shippingRateDetailViewModel.formPropsData[
                PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_METHOD
              ]?.id
                ? {
                    label:
                      this.viewModel.shippingRateDetailViewModel.formPropsData[
                        PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_METHOD
                      ]?.name,
                    value:
                      this.viewModel.shippingRateDetailViewModel.formPropsData[
                        PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_METHOD
                      ]?.id,
                  }
                : null,
              getDataSelectOptions: this.shippingMethodListViewModel?.successResponse
                ?.listShippingMethodsWithoutPagination?.length
                ? this.shippingMethodListViewModel?.successResponse?.listShippingMethodsWithoutPagination?.map(
                    (item) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                      };
                    }
                  )
                : [],
              handleChange: async (data) => {
                data &&
                  this.viewModel.handleFormPropsData(
                    PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_METHOD,
                    { id: data?.value, name: data?.label } ?? {}
                  );
                this.viewModel.handleFormPropsData(
                  PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_METHOD_ID,
                  data?.value ?? null
                );
                this.forceUpdate();
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_select_shipping_method'),
              className: 'col-lg-12',
            },
            {
              label: t('txt_shipping_zone'),
              key: PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_ZONE,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.shippingRateDetailViewModel.formPropsData[
                PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_ZONE
              ]
                ? {
                    label:
                      this.shippingZoneListViewModel?.successResponse?.listShippingZonesWithoutPagination?.find(
                        (x) =>
                          x?.value.toString() ===
                          this.viewModel.shippingRateDetailViewModel.formPropsData[
                            PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_ZONE
                          ]?.toString()
                      )?.label,
                    value:
                      this.viewModel.shippingRateDetailViewModel.formPropsData[
                        PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_ZONE
                      ],
                  }
                : null,
              getDataSelectOptions: this.shippingZoneListViewModel?.successResponse
                ?.listShippingZonesWithoutPagination?.length
                ? this.shippingZoneListViewModel?.successResponse?.listShippingZonesWithoutPagination?.map(
                    (item) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                      };
                    }
                  )
                : [],
              handleChange: async (data) => {
                data &&
                  this.viewModel.handleFormPropsData(
                    PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_ZONE,
                    data?.value ?? null
                  );
                this.viewModel.handleFormPropsData(
                  PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.SHIPPING_ZONE_ID,
                  data?.value ?? null
                );
                this.forceUpdate();
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_select_shipping_zone'),
              className: 'col-lg-12',
            },
            {
              label: t('txt_product'),
              key: PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.shippingRateDetailViewModel.formPropsData[
                PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT
              ]?.id
                ? {
                    label:
                      this.viewModel.shippingRateDetailViewModel.formPropsData[
                        PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT
                      ]?.name,
                    value:
                      this.viewModel.shippingRateDetailViewModel.formPropsData[
                        PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT
                      ]?.id,
                  }
                : null,
              getDataSelectOptions: this.productListViewModel?.items?.length
                ? this.productListViewModel?.items?.map((item) => {
                    return {
                      label: item[PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE],
                      value: item[PIM_PRODUCT_DETAIL_FIELD_KEY.ID],
                    };
                  })
                : [],
              handleChange: async (data) => {
                data &&
                  this.viewModel.handleFormPropsData(
                    PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT,
                    { id: data?.value, name: data?.label } ?? {}
                  );
                this.viewModel.handleFormPropsData(
                  PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT_ID,
                  data?.value ?? null
                );
                this.forceUpdate();
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_select_product'),
              className: 'col-lg-12',
            },
            {
              label: t('txt_category'),
              key: PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT_CATEGORY,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.shippingRateDetailViewModel.formPropsData[
                PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT_CATEGORY
              ]?.id
                ? {
                    label:
                      this.viewModel.shippingRateDetailViewModel.formPropsData[
                        PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT_CATEGORY
                      ]?.name,
                    value:
                      this.viewModel.shippingRateDetailViewModel.formPropsData[
                        PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT_CATEGORY
                      ]?.id,
                  }
                : null,
              getDataSelectOptions: this.categoryListViewModel?.items?.length
                ? this.categoryListViewModel?.items?.map((item) => {
                    return {
                      label: item[PIM_CATEGORY_DETAIL_FIELD_KEY.TITLE],
                      value: item[PIM_CATEGORY_DETAIL_FIELD_KEY.ID],
                    };
                  })
                : [],
              handleChange: async (data) => {
                data &&
                  this.viewModel.handleFormPropsData(
                    PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRODUCT_CATEGORY,
                    { id: data?.value, name: data?.label } ?? {}
                  );
                this.viewModel.handleFormPropsData(
                  PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.CATEGORY_ID,
                  data?.value ?? null
                );
                this.forceUpdate();
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_select_category'),
              className: 'col-lg-12',
            },
            {
              label: t('txt_select_price_rate'),
              key: 'price_rate_select',
              type: FORM_FIELD_TYPE.RADIO,
              getValueSelected:
                this.state.priceRate === 'rate'
                  ? {
                      label: t('txt_rate'),
                      value: 'rate',
                    }
                  : { label: t('txt_price'), value: 'price' },
              getDataSelectOptions: [
                { label: t('txt_price'), value: 'price' },
                { label: t('txt_rate'), value: 'rate' },
              ],
              handleChange: (data) => {
                console.log('data', data);
                this.setState({ priceRate: data.target.value });
              },
              className: 'col-lg-12',
            },
            ...(this.state.priceRate === 'price'
              ? [
                  {
                    key: PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRICE,
                    type: FORM_FIELD_TYPE.NUMBER,
                    getValueSelected:
                      this.viewModel.shippingRateDetailViewModel.formPropsData[
                        PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRICE
                      ],
                    className: 'col-lg-12',
                    placeholder: t('txt_type_price'),
                    handleChange: (event) => {
                      this.viewModel.handleFormPropsData(
                        PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.PRICE,
                        event.target.value
                      );
                    },
                  },
                ]
              : []),
            ...(this.state.priceRate === 'rate'
              ? [
                  {
                    key: PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.RATE,
                    type: FORM_FIELD_TYPE.NUMBER,
                    getValueSelected:
                      this.viewModel.shippingRateDetailViewModel.formPropsData[
                        PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.RATE
                      ],
                    className: 'col-lg-12',
                    placeholder: t('txt_type_rate'),
                    handleChange: (event) => {
                      this.viewModel.handleFormPropsData(
                        PIM_SHIPPING_RATE_DETAIL_FIELD_KEY.RATE,
                        event.target.value
                      );
                    },
                  },
                ]
              : []),
          ],
        },
      ];
      return (
        <>
          {(!this.shippingMethodListViewModel?.successResponse?.state ||
            !this.shippingZoneListViewModel?.successResponse?.state ||
            this.productListViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.categoryListViewModel.formStatus === PAGE_STATUS.LOADING) && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
            <Row>
              {Object.keys(generateFormSetting)
                .map((groupIndex) => {
                  return [...Array(generateFormSetting[groupIndex])].map((group) => {
                    return renderingGroupFieldHandler(group, validator);
                  });
                })
                .reduce((arr, el) => {
                  return arr.concat(el);
                }, [])}
            </Row>
          </div>
        </>
      );
    }
  }
);
export default withTranslation()(ShippingRateInformation);
