import { PIM_TAX_GROUP_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { FORM_FIELD_TYPE, notify, renderingGroupFieldHandler } from 'aesirx-uikit';
import { TaxGroupViewModelContext } from 'containers/TaxGroupPage/TaxGroupViewModel/TaxGroupViewModelContextProvider';

const TaxGroupInformation = observer(
  class TaxGroupInformation extends Component {
    static contextType = TaxGroupViewModelContext;

    constructor(props) {
      super(props);
    }

    render() {
      this.viewModel = this.context.model.taxGroupDetailViewModel;

      const filteredTaxGroupList = this.viewModel?.taxGroupList?.filter((item) => {
        return (
          item.id !==
          this.viewModel.taxGroupDetailViewModel.formPropsData[PIM_TAX_GROUP_DETAIL_FIELD_KEY.ID]
        );
      });

      const { t, validator, isEdit } = this.props;

      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_parent_tax_group'),
              key: PIM_TAX_GROUP_DETAIL_FIELD_KEY.PARENT_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected:
                this.viewModel.taxGroupDetailViewModel.formPropsData[
                  PIM_TAX_GROUP_DETAIL_FIELD_KEY.PARENT_ID
                ] &&
                this.viewModel.taxGroupDetailViewModel.formPropsData[
                  PIM_TAX_GROUP_DETAIL_FIELD_KEY.PARENT_ID
                ] !== '0'
                  ? {
                      label: this.viewModel?.taxGroupList?.find(
                        (x) =>
                          x.id.toString() ===
                          this.viewModel.taxGroupDetailViewModel.formPropsData[
                            PIM_TAX_GROUP_DETAIL_FIELD_KEY.PARENT_ID
                          ].toString()
                      )?.name,
                      value:
                        this.viewModel.taxGroupDetailViewModel.formPropsData[
                          PIM_TAX_GROUP_DETAIL_FIELD_KEY.PARENT_ID
                        ],
                    }
                  : null,
              getDataSelectOptions: filteredTaxGroupList?.length
                ? filteredTaxGroupList?.map((item) => {
                    let levelString = item?.level
                      ? Array.from(Array(parseInt(item?.level)).keys())
                          .map(() => ``)
                          .join('- ')
                      : '';
                    return {
                      label: levelString + item?.name,
                      value: item.id,
                    };
                  })
                : [],
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_TAX_GROUP_DETAIL_FIELD_KEY.PARENT_ID,
                  data?.value ?? 0
                );
                if (isEdit) {
                  notify(this.props.t('txt_product_tax_group_change_warning'), 'warn');
                }
                // this.forceUpdate();
              },
              // required: true,
              // validation: 'required',
              placeholder: t('txt_select_parent_tax_group'),
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
export default withTranslation()(TaxGroupInformation);
