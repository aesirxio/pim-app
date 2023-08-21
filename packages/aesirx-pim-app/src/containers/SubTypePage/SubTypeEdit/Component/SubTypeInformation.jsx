import { PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { FORM_FIELD_TYPE, notify, renderingGroupFieldHandler } from 'aesirx-uikit';
import { SubTypeViewModelContext } from 'containers/SubTypePage/SubTypeViewModel/SubTypeViewModelContextProvider';

const SubTypeInformation = observer(
  class SubTypeInformation extends Component {
    static contextSubType = SubTypeViewModelContext;

    constructor(props) {
      super(props);
    }

    render() {
      this.viewModel = this.context.model.subTypeDetailViewModel;

      const filteredSubTypeList = this.viewModel?.subTypeList?.filter((item) => {
        return (
          item.id !==
          this.viewModel.subTypeDetailViewModel.formPropsData[PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.ID]
        );
      });

      const { t, validator, isEdit } = this.props;

      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_parent_subtype'),
              key: PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID,
              subType: FORM_FIELD_TYPE.SELECTION,
              getValueSelected:
                this.viewModel.subTypeDetailViewModel.formPropsData[
                  PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID
                ] &&
                this.viewModel.subTypeDetailViewModel.formPropsData[
                  PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID
                ] !== '0'
                  ? {
                      label: this.viewModel?.subTypeList?.find(
                        (x) =>
                          x.id.toString() ===
                          this.viewModel.subTypeDetailViewModel.formPropsData[
                            PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID
                          ].toString()
                      )?.name,
                      value:
                        this.viewModel.subTypeDetailViewModel.formPropsData[
                          PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID
                        ],
                    }
                  : null,
              getDataSelectOptions: filteredSubTypeList?.length
                ? filteredSubTypeList?.map((item) => {
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
                  PIM_PRODUCT_TYPE_DETAIL_FIELD_KEY.PARENT_ID,
                  data?.value ?? 0
                );
                if (isEdit) {
                  notify(this.props.t('txt_product_subtype_change_warning'), 'warn');
                }
                // this.forceUpdate();
              },
              // required: true,
              // validation: 'required',
              placeholder: t('txt_select_parent_subtype'),
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
export default withTranslation()(SubTypeInformation);
