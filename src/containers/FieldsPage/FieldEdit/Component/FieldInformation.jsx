import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import { Spinner } from 'aesirx-uikit';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { FieldViewModelContext } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';
import FieldGroupStore from 'containers/FieldsGroupPage/FieldGroupStore/FieldGroupStore';
import FieldGroupViewModel from 'containers/FieldsGroupPage/FieldGroupViewModel/FieldGroupViewModel';
import UtilsStore from 'store/UtilsStore/UtilsStore';
import UtilsViewModel from 'store/UtilsStore/UtilsViewModel';

const utilsStore = new UtilsStore();
const utilsViewModel = new UtilsViewModel(utilsStore);
const fieldGroupStore = new FieldGroupStore();
const fieldGroupViewModel = new FieldGroupViewModel(fieldGroupStore);

const FieldInformation = observer(
  class FieldInformation extends Component {
    static contextType = FieldViewModelContext;

    constructor(props) {
      super(props);
      this.utilsListViewModel = utilsViewModel.utilsListViewModel;
      this.fieldGroupListViewModel = fieldGroupViewModel.fieldGroupListViewModel;
    }

    componentDidMount() {
      const fetchData = async () => {
        await Promise.all([
          this.utilsListViewModel.getListContentType(),
          this.utilsListViewModel.getListFieldType(),
        ]).then(() => {
          this.fieldGroupListViewModel.initializeData();
        });
      };
      fetchData();
    }

    render() {
      this.viewModel = this.context.fieldDetailViewModel;
      const { validator, t, isEdit } = this.props;
      const relevanceArray = [
        {
          label: t('txt_optional'),
          value: '0',
        },
        {
          label: t('txt_recommend'),
          value: '1',
        },
        {
          label: t('txt_required'),
          value: '2',
        },
      ];
      const generateFormSetting = [
        {
          fields: [
            {
              label: 'txt_type',
              key: PIM_FIELD_DETAIL_FIELD_KEY.TYPE,
              type: FORM_FIELD_TYPE.SELECTION_FIELDS,
              getValueSelected: this.viewModel.fieldDetailViewModel?.formPropsData[
                PIM_FIELD_DETAIL_FIELD_KEY.TYPE
              ]
                ? {
                    label: this.utilsListViewModel.listFieldType?.find(
                      (x) =>
                        x.value ===
                        this.viewModel.fieldDetailViewModel?.formPropsData[
                          PIM_FIELD_DETAIL_FIELD_KEY.TYPE
                        ]
                    )?.label,
                    value:
                      this.viewModel.fieldDetailViewModel?.formPropsData[
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
              getValueSelectedOptions: this.viewModel.fieldDetailViewModel?.formPropsData[
                PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS
              ]
                ? this.viewModel.fieldDetailViewModel?.formPropsData[
                    PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS
                  ]
                : [],
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(PIM_FIELD_DETAIL_FIELD_KEY.TYPE, data.value);
              },
              listFieldType: this.utilsListViewModel?.listFieldType,
              validator: validator,
              className: 'col-lg-12',
              viewModel: this.viewModel,
              isEdit: isEdit,
            },
            {
              label: 'txt_section',
              key: PIM_FIELD_DETAIL_FIELD_KEY.PRODUCT_TYPES,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.fieldDetailViewModel?.formPropsData[
                PIM_FIELD_DETAIL_FIELD_KEY.PRODUCT_TYPES
              ]?.length
                ? this.viewModel.fieldDetailViewModel?.formPropsData[
                    PIM_FIELD_DETAIL_FIELD_KEY.PRODUCT_TYPES
                  ].map((item) => {
                    return {
                      label: item.name,
                      value: item.id,
                    };
                  })
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
                let convertData = data.map((item) => ({ title: item.label, id: item.value }));
                this.viewModel.handleFormPropsData(
                  PIM_FIELD_DETAIL_FIELD_KEY.PRODUCT_TYPES,
                  convertData
                );
              },
              isMulti: true,
              className: 'col-lg-12',
            },
            {
              label: 'txt_unique',
              key: PIM_FIELD_DETAIL_FIELD_KEY.UNIQUE,
              type: FORM_FIELD_TYPE.RADIO,
              getValueSelected: this.viewModel.fieldDetailViewModel?.formPropsData[
                PIM_FIELD_DETAIL_FIELD_KEY.UNIQUE
              ]
                ? {
                    label:
                      this.viewModel.fieldDetailViewModel?.formPropsData[
                        PIM_FIELD_DETAIL_FIELD_KEY.UNIQUE
                      ].toString() === '0'
                        ? t('txt_no')
                        : t('txt_yes'),
                    value:
                      this.viewModel.fieldDetailViewModel?.formPropsData[
                        PIM_FIELD_DETAIL_FIELD_KEY.UNIQUE
                      ].toString(),
                  }
                : { label: t('txt_no'), value: '0' },
              getDataSelectOptions: [
                { label: t('txt_no'), value: '0' },
                { label: t('txt_yes'), value: '1' },
              ],
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_FIELD_DETAIL_FIELD_KEY.UNIQUE,
                  data.target.value
                );
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_group',
              key: PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.fieldDetailViewModel?.formPropsData[
                PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_ID
              ]
                ? {
                    label: this.fieldGroupListViewModel.items?.find(
                      (x) =>
                        x.id ===
                        this.viewModel.fieldDetailViewModel?.formPropsData[
                          PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_ID
                        ]
                    )?.name,
                    value:
                      this.viewModel.fieldDetailViewModel?.formPropsData[
                        PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_ID
                      ],
                  }
                : null,
              getDataSelectOptions: this.fieldGroupListViewModel?.items?.length
                ? this.fieldGroupListViewModel?.items?.map((item) => {
                    return {
                      label: item.name,
                      value: item.id,
                    };
                  })
                : [],
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_ID,
                  data.value
                );
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_relevance',
              key: PIM_FIELD_DETAIL_FIELD_KEY.RELEVANCE,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected:
                this.viewModel.fieldDetailViewModel?.formPropsData[
                  PIM_FIELD_DETAIL_FIELD_KEY.RELEVANCE
                ] !== undefined
                  ? {
                      label: relevanceArray?.find(
                        (x) =>
                          x.value ===
                          this.viewModel.fieldDetailViewModel?.formPropsData[
                            PIM_FIELD_DETAIL_FIELD_KEY.RELEVANCE
                          ].toString()
                      )?.label,
                      value:
                        this.viewModel.fieldDetailViewModel?.formPropsData[
                          PIM_FIELD_DETAIL_FIELD_KEY.RELEVANCE
                        ].toString(),
                    }
                  : null,
              getDataSelectOptions: relevanceArray,
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_FIELD_DETAIL_FIELD_KEY.RELEVANCE,
                  data.value
                );
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_note',
              key: PIM_FIELD_DETAIL_FIELD_KEY.PARAMS.NOTE,
              type: FORM_FIELD_TYPE.EDITOR,
              getValueSelected:
                this.viewModel.fieldDetailViewModel?.formPropsData[
                  PIM_FIELD_DETAIL_FIELD_KEY.PARAMS
                ]?.note ?? null,
              isEditor: false,
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(PIM_FIELD_DETAIL_FIELD_KEY.PARAMS, {
                  note: data.target.value,
                });
              },
              placeholder: t('txt_type'),
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
export default withTranslation()(FieldInformation);
