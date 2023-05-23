import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_FIELD_GROUP_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import { observer } from 'mobx-react';
import { FieldGroupViewModelContext } from 'containers/FieldsGroupPage/FieldGroupViewModel/FieldGroupViewModelContextProvider';

const FieldGroupInformation = observer(
  class FieldGroupInformation extends Component {
    static contextType = FieldGroupViewModelContext;

    constructor(props) {
      super(props);
    }

    render() {
      this.viewModel = this.context.fieldGroupDetailViewModel;
      const { t, validator } = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              label: 'txt_alias',
              key: PIM_FIELD_GROUP_DETAIL_FIELD_KEY.ALIAS,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.fieldGroupDetailViewModel.formPropsData[
                  PIM_FIELD_GROUP_DETAIL_FIELD_KEY.ALIAS
                ],
              placeholder: this.viewModel.aliasChange ? this.viewModel.aliasChange : t('txt_type'),
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_FIELD_GROUP_DETAIL_FIELD_KEY.ALIAS,
                  data.target.value
                );
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_description',
              key: PIM_FIELD_GROUP_DETAIL_FIELD_KEY.DESCRIPTION,
              type: FORM_FIELD_TYPE.EDITOR,
              getValueSelected:
                this.viewModel.fieldGroupDetailViewModel.formPropsData[
                  PIM_FIELD_GROUP_DETAIL_FIELD_KEY.DESCRIPTION
                ] ?? null,
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_FIELD_GROUP_DETAIL_FIELD_KEY.DESCRIPTION,
                  data
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
export default withTranslation()(FieldGroupInformation);
