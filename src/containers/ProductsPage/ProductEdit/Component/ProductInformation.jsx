import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { Spinner } from 'aesirx-uikit';
import { ProductViewModelContext } from '../../ProductViewModel/ProductViewModelContextProvider';

const ProductInformation = observer(
  class ProductInformation extends Component {
    static contextType = ProductViewModelContext;

    constructor(props) {
      super(props);
      this.categoryListViewModel = this.props.categoryListViewModel;
    }

    render() {
      this.viewModel = this.context.productDetailViewModel;
      const { t, validator } = this.props;
      const generateFormSetting = [
        {
          fields: [
            // {
            //   label: 'txt_sale_market',
            //   key: PIM_PRODUCT_DETAIL_FIELD_KEY.SALE_MARKET_ID,
            //   type: FORM_FIELD_TYPE.SELECTION,
            //   getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.SALE_MARKET_ID]
            //     ? {
            //         label: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.SALE_MARKET_NAME],
            //         value: formPropsData[PIM_PRasd
            //   // getDataSelectOptions: [
            //   //   {
            //   //     label: 'Sale Market 1',
            //   //     value: 'sale-market-1',
            //   //   },
            //   //   {
            //   //     label: 'Sale Market 2',
            //   //     value: 'sale-market-2',
            //   //   },
            //   // ],
            //   placeholder: t('txt_select'),
            //   handleChange: (data) => {
            //     formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.SALE_MARKET_NAME] = data.label;
            //     formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.SALE_MARKET_ID] = data.value;
            //   },
            //   className: 'col-lg-12',
            //   isMulti: true,
            // },
            {
              label: 'txt_related_category',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.RELATED_CATEGORIES,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.productDetailViewModel.formPropsData[
                PIM_PRODUCT_DETAIL_FIELD_KEY.RELATED_CATEGORIES
              ]?.length
                ? this.viewModel.productDetailViewModel.formPropsData[
                    PIM_PRODUCT_DETAIL_FIELD_KEY.RELATED_CATEGORIES
                  ]?.map((item) => ({
                    label: this.categoryListViewModel.items?.find((x) => x.id.toString() === item)
                      ?.title,
                    value: item,
                  }))
                : null,
              getDataSelectOptions: this.categoryListViewModel.items
                ? this.categoryListViewModel.items.map((item) => {
                    return {
                      label: item.title,
                      value: item.id,
                    };
                  })
                : [],
              handleChange: (data) => {
                let convertData = data.map((item) => item.value.toString());
                this.viewModel.handleFormPropsData(
                  PIM_PRODUCT_DETAIL_FIELD_KEY.RELATED_CATEGORIES,
                  convertData
                );
              },
              isMulti: true,
              placeholder: t('txt_select_category'),
              className: 'col-lg-12',
            },
            {
              label: 'txt_product_description',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.DESCRIPTION,
              type: FORM_FIELD_TYPE.EDITOR,
              getValueSelected:
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ][PIM_PRODUCT_DETAIL_FIELD_KEY.DESCRIPTION],
              handleChange: (data) => {
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ][PIM_PRODUCT_DETAIL_FIELD_KEY.DESCRIPTION] = data;
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_short_description',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.SHORT_DESCRIPTION,
              type: FORM_FIELD_TYPE.EDITOR,
              getValueSelected:
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ][PIM_PRODUCT_DETAIL_FIELD_KEY.SHORT_DESCRIPTION],
              handleChange: (data) => {
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ][PIM_PRODUCT_DETAIL_FIELD_KEY.SHORT_DESCRIPTION] = data;
              },
              className: 'col-lg-12',
            },
          ],
        },
      ];
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          {this.categoryListViewModel.formStatus === PAGE_STATUS.LOADING && (
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
export default withTranslation()(ProductInformation);
