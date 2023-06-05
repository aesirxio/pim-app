import { PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { ProductTypeViewModelContext } from 'pages/ProductTypes/ProductTypeViewModel/ProductTypeViewModelContextProvider';
import { renderingGroupFieldHandler } from 'components';
import { FORM_FIELD_TYPE } from 'aesirx-uikit';

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
              label: t('txt_parent'),
              key: PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID,
              required: true,
              validation: 'required',
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.productTypeDetailViewModel.formPropsData[
                PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID
              ]
                ? {
                    label: this.viewModel?.productTypeList?.listItems?.find(
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
              getDataSelectOptions: this.viewModel?.productTypeList?.listItems?.length
                ? this.viewModel?.productTypeList?.listItems?.map((item) => {
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
