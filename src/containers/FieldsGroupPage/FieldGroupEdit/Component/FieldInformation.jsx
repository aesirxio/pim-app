import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import Spinner from 'components/Spinner';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { withUtilsViewModel } from 'store/UtilsStore/UtilsViewModelContextProvider';
import { withFieldViewModel } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';

const FieldInformation = observer(
  class FieldInformation extends Component {
    constructor(props) {
      super(props);
      this.utilsListViewModel = this.props.viewModel.utilsListViewModel;
      this.fieldDetailViewModel = this.props.parentViewModel.fieldDetailViewModel;
    }

    async componentDidMount() {
      !this.utilsListViewModel.listContentType.length &&
        (await this.utilsListViewModel.getListContentType());
      !this.utilsListViewModel.listFieldType.length &&
        (await this.utilsListViewModel.getListFieldType());
    }

    render() {
      const { validator } = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              label: 'txt_type',
              key: PIM_FIELD_DETAIL_FIELD_KEY.TYPE,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.fieldDetailViewModel.fieldDetailViewModel.formPropsData[
                PIM_FIELD_DETAIL_FIELD_KEY.TYPE
              ]
                ? {
                    label: this.utilsListViewModel.listFieldType?.find(
                      (x) =>
                        x.value ===
                        this.fieldDetailViewModel.fieldDetailViewModel.formPropsData[
                          PIM_FIELD_DETAIL_FIELD_KEY.TYPE
                        ]
                    )?.label,
                    value:
                      this.fieldDetailViewModel.fieldDetailViewModel.formPropsData[
                        PIM_FIELD_DETAIL_FIELD_KEY.TYPE
                      ],
                  }
                : null,
              getDataSelectOptions: this.utilsListViewModel.listFieldType.length
                ? this.utilsListViewModel.listFieldType.map((item) => {
                    return {
                      label: item.label,
                      value: item.value,
                    };
                  })
                : null,
              handleChange: (data) => {
                this.fieldDetailViewModel.handleFormPropsData(
                  PIM_FIELD_DETAIL_FIELD_KEY.TYPE,
                  data.value
                );
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_section',
              key: PIM_FIELD_DETAIL_FIELD_KEY.SECTION,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.fieldDetailViewModel.fieldDetailViewModel.formPropsData[
                PIM_FIELD_DETAIL_FIELD_KEY.SECTION
              ]
                ? {
                    label: this.utilsListViewModel.listContentType?.find(
                      (x) =>
                        x.value ===
                        this.fieldDetailViewModel.fieldDetailViewModel.formPropsData[
                          PIM_FIELD_DETAIL_FIELD_KEY.SECTION
                        ]
                    )?.label,
                    value:
                      this.fieldDetailViewModel.fieldDetailViewModel.formPropsData[
                        PIM_FIELD_DETAIL_FIELD_KEY.SECTION
                      ],
                  }
                : null,
              getDataSelectOptions: this.utilsListViewModel.listContentType.length
                ? this.utilsListViewModel.listContentType.map((item) => {
                    return {
                      label: item.label,
                      value: item.value,
                    };
                  })
                : null,
              handleChange: (data) => {
                this.fieldDetailViewModel.handleFormPropsData(
                  PIM_FIELD_DETAIL_FIELD_KEY.SECTION,
                  data.value
                );
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_group',
              key: PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.fieldDetailViewModel.fieldDetailViewModel.formPropsData[
                PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_ID
              ]
                ? {
                    label:
                      this.fieldDetailViewModel.fieldDetailViewModel.formPropsData[
                        PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_NAME
                      ],
                    value:
                      this.fieldDetailViewModel.fieldDetailViewModel.formPropsData[
                        PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_ID
                      ],
                  }
                : null,
              getDataSelectOptions: this.utilsListViewModel.listContentType.length
                ? this.utilsListViewModel.listContentType.map((item) => {
                    return {
                      label: item.label,
                      value: item.value,
                    };
                  })
                : null,
              handleChange: (data) => {
                this.fieldDetailViewModel.handleFormPropsData(
                  PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_ID,
                  data.value
                );
                this.fieldDetailViewModel.handleFormPropsData(
                  PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_NAME,
                  data.label
                );
              },
              className: 'col-lg-12',
            },
          ],
        },
      ];
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          {this.utilsListViewModel.formStatus === PAGE_STATUS.LOADING && (
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
export default withTranslation('common')(withFieldViewModel(withUtilsViewModel(FieldInformation)));
