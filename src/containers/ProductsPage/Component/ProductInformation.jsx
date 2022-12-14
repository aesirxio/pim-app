import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import CategoryStore from 'containers/CategoriesPage/CategoryStore/CategoryStore';
import CategoryViewModel from 'containers/CategoriesPage/CategoryViewModel/CategoryViewModel';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import Spinner from 'components/Spinner';
const categoryStore = new CategoryStore();
const categoryViewModel = new CategoryViewModel(categoryStore);

const ProductInformation = observer(
  class ProductInformation extends Component {
    constructor(props) {
      super(props);
      this.categoryListViewModel = categoryViewModel
        ? categoryViewModel.getCategoryListViewModel()
        : null;
    }

    async componentDidMount() {
      if (!this.categoryListViewModel.items.length) {
        await this.categoryListViewModel.initializeData();
      }
    }

    render() {
      const { t, formPropsData, validator } = this.props;
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
            //         value: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.SALE_MARKET_ID],
            //       }
            //     : null,
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
              label: 'txt_related_categories',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: null,
              getDataSelectOptions: this.categoryListViewModel.items
                ? this.categoryListViewModel.items.map((item) => ({
                    label: item.title,
                    value: item.id,
                  }))
                : null,
              isMulti: true,
              placeholder: t('txt_select_category'),
              handleChange: (data) => {
                formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.RELATED_CATEGORIES] = data;
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_description',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.DESCRIPTION,
              type: FORM_FIELD_TYPE.EDITOR,
              value: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.DESCRIPTION],
              handleChange: (data) => {
                formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.DESCRIPTION] = data;
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
export default withTranslation('common')(ProductInformation);
