import { PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { FORM_FIELD_TYPE, renderingGroupFieldHandler } from 'aesirx-uikit';
import { ProductTypeViewModelContext } from 'containers/ProductTypePage/ProductTypeViewModel/ProductTypeViewModelContextProvider';

const ProductTypeInformation = observer(
  class ProductTypeInformation extends Component {
    static contextType = ProductTypeViewModelContext;

    constructor(props) {
      super(props);
    }

    render() {
      this.viewModel = this.context.model.productTypeDetailViewModel;
      const { t, validator } = this.props;

      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_parent_type'),
              key: PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected:
                this.viewModel.productTypeDetailViewModel.formPropsData[
                  PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID
                ] &&
                this.viewModel.productTypeDetailViewModel.formPropsData[
                  PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID
                ] !== '0'
                  ? {
                      label: this.viewModel?.productTypeList?.find(
                        (x) =>
                          x.id.toString() ===
                          this.viewModel.productTypeDetailViewModel.formPropsData[
                            PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID
                          ]
                      )?.name,
                      value:
                        this.viewModel.productTypeDetailViewModel.formPropsData[
                          PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID
                        ],
                    }
                  : null,
              getDataSelectOptions: this.viewModel?.productTypeList?.length
                ? this.viewModel?.productTypeList?.map((item) => {
                    return {
                      label: item.name,
                      value: item.id,
                    };
                  })
                : null,
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID,
                  data.value
                );
              },
              placeholder: t('txt_select_parent_type'),
              className: 'col-lg-12',
            },
          ],
        },
      ];
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
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
export default withTranslation()(ProductTypeInformation);
