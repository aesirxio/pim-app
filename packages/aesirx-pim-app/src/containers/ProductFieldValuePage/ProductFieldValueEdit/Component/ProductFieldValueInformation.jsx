import { PIM_PRODUCT_DETAIL_FIELD_KEY, PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { FORM_FIELD_TYPE, PAGE_STATUS, Spinner, renderingGroupFieldHandler } from 'aesirx-uikit';
import { ProductFieldValueViewModelContext } from 'containers/ProductFieldValuePage/ProductFieldValueViewModel/ProductFieldValueViewModelContextProvider';
import { FilteringFieldStore } from 'containers/FilteringFieldPage/store';
import FilteringFieldViewModel from 'containers/FilteringFieldPage/FilteringFieldViewModel/FilteringFieldViewModel';
import ProductStore from 'containers/ProductsPage/ProductStore/ProductStore';
import ProductViewModel from 'containers/ProductsPage/ProductViewModel/ProductViewModel';
import { FilteringValueStore } from 'containers/FilteringValuePage/store';
import FilteringValueViewModel from 'containers/FilteringValuePage/FilteringValueViewModel/FilteringValueViewModel';

const filteringFieldStore = new FilteringFieldStore();
const filteringFieldViewModel = new FilteringFieldViewModel(filteringFieldStore);
const filteringValueStore = new FilteringValueStore();
const filteringValueViewModel = new FilteringValueViewModel(filteringValueStore);
const productStore = new ProductStore();
const productViewModel = new ProductViewModel(productStore);

const ProductFieldValueInformation = observer(
  class ProductFieldValueInformation extends Component {
    static contextType = ProductFieldValueViewModelContext;

    constructor(props) {
      super(props);
      this.filteringFieldListViewModel = filteringFieldViewModel.filteringFieldListViewModel;
      this.filteringValueListViewModel = filteringValueViewModel.filteringValueListViewModel;
      this.productListViewModel = productViewModel.productListViewModel;
      this.state = { fieldFilter: '' };
    }

    componentDidMount() {
      const fetchData = async () => {
        this.filteringFieldListViewModel.initializeAllData();
        !this.props.isEdit && this.filteringValueListViewModel.initializeAllData();
        this.productListViewModel.handleFilter({ 'list[limit]': 9999 });
        this.productListViewModel.initializeDataListProduct();
      };
      fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.fieldFilter !== this.state.fieldFilter) {
        this.filteringValueListViewModel.handleFilter({ 'filter[field]': this.state.fieldFilter });
        this.filteringValueListViewModel.initializeAllData();
      }
      if (
        prevProps?.formPropsData[PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.FIELD] !==
        this.props?.formPropsData[PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.FIELD]
      ) {
        this.filteringValueListViewModel.handleFilter({
          'filter[field]':
            this.props?.formPropsData[PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.FIELD],
        });
        this.filteringValueListViewModel.initializeAllData();
      }
    }

    render() {
      this.viewModel = this.context.model.productFieldValueDetailViewModel;
      const { t, validator } = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_filtering_field'),
              key: PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.FIELD,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.productFieldValueDetailViewModel.formPropsData[
                PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.FIELD
              ]
                ? {
                    label:
                      this.filteringFieldListViewModel?.successResponse?.listFilteringFieldsWithoutPagination?.find(
                        (x) =>
                          x?.value.toString() ===
                          this.viewModel.productFieldValueDetailViewModel.formPropsData[
                            PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.FIELD
                          ]?.toString()
                      )?.label,
                    value:
                      this.viewModel.productFieldValueDetailViewModel.formPropsData[
                        PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.FIELD
                      ],
                  }
                : null,
              getDataSelectOptions: this.filteringFieldListViewModel?.successResponse
                ?.listFilteringFieldsWithoutPagination?.length
                ? this.filteringFieldListViewModel?.successResponse?.listFilteringFieldsWithoutPagination?.map(
                    (item) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                      };
                    }
                  )
                : [],
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.FIELD,
                  data?.value ?? 0
                );
                this.setState((prevState) => {
                  return {
                    ...prevState,
                    fieldFilter: data?.value ?? '',
                  };
                });
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_filtering_field'),
              className: 'col-lg-12',
            },
            {
              label: t('txt_filtering_value'),
              key: PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.VALUE,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.productFieldValueDetailViewModel.formPropsData[
                PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.VALUE
              ]
                ? {
                    label:
                      this.filteringValueListViewModel?.successResponse?.listFilteringValuesWithoutPagination?.find(
                        (x) =>
                          x?.value.toString() ===
                          this.viewModel.productFieldValueDetailViewModel.formPropsData[
                            PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.VALUE
                          ]?.toString()
                      )?.label,
                    value:
                      this.viewModel.productFieldValueDetailViewModel.formPropsData[
                        PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.VALUE
                      ],
                  }
                : null,
              getDataSelectOptions: this.filteringValueListViewModel?.successResponse
                ?.listFilteringValuesWithoutPagination?.length
                ? this.filteringValueListViewModel?.successResponse?.listFilteringValuesWithoutPagination?.map(
                    (item) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                      };
                    }
                  )
                : [],
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.VALUE,
                  data?.value ?? 0
                );
                this.forceUpdate();
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_filtering_value'),
              className: 'col-lg-12',
            },
            {
              label: t('txt_product'),
              key: PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.PRODUCT,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.productFieldValueDetailViewModel.formPropsData[
                PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.PRODUCT
              ]
                ? {
                    label: this.productListViewModel?.items?.find(
                      (x) =>
                        x?.id.toString() ===
                        this.viewModel.productFieldValueDetailViewModel.formPropsData[
                          PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.PRODUCT
                        ]?.toString()
                    )?.[PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE],
                    value:
                      this.viewModel.productFieldValueDetailViewModel.formPropsData[
                        PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.PRODUCT
                      ],
                  }
                : null,
              getDataSelectOptions: this.filteringFieldListViewModel?.successResponse
                ?.listFilteringFieldsWithoutPagination?.length
                ? this.productListViewModel?.items?.map((item) => {
                    return {
                      label: item[PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE],
                      value: item[PIM_PRODUCT_DETAIL_FIELD_KEY.ID],
                    };
                  })
                : [],
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.PRODUCT,
                  data?.value ?? 0
                );
                this.forceUpdate();
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_select_product'),
              className: 'col-lg-12',
            },
          ],
        },
      ];
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          {(this.productListViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.filteringFieldListViewModel.successResponse.state === false ||
            this.filteringValueListViewModel.successResponse.state === false) && (
            <Spinner className="spinner-overlay" />
          )}
          {Object.keys(generateFormSetting)
            .map((groupIndex) => {
              return [...Array(generateFormSetting[groupIndex])].map((group) => {
                return renderingGroupFieldHandler(group, validator);
              });
            })
            .reduce((arr, el) => {
              return arr.concat(el);
            }, [])}
        </div>
      );
    }
  }
);
export default withTranslation()(ProductFieldValueInformation);
