import { PIM_FILTERING_FIELD_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { FORM_FIELD_TYPE, renderingGroupFieldHandler } from 'aesirx-uikit';
import { FilteringFieldViewModelContext } from 'containers/FilteringFieldPage/FilteringFieldViewModel/FilteringFieldViewModelContextProvider';
import { FilteringFieldsetStore } from 'containers/FilteringFieldsetPage/store';
import FilteringFieldsetViewModel from 'containers/FilteringFieldsetPage/FilteringFieldsetViewModel/FilteringFieldsetViewModel';

const filteringFieldsetStore = new FilteringFieldsetStore();
const filteringFieldsetViewModel = new FilteringFieldsetViewModel(filteringFieldsetStore);

const FilteringFieldInformation = observer(
  class FilteringFieldInformation extends Component {
    static contextType = FilteringFieldViewModelContext;

    constructor(props) {
      super(props);
      this.filteringFieldsetListViewModel =
        filteringFieldsetViewModel.filteringFieldsetListViewModel;
    }

    componentDidMount() {
      const fetchData = async () => {
        await this.filteringFieldsetListViewModel.initializeAllData();
      };
      fetchData();
    }

    render() {
      this.viewModel = this.context.model.filteringFieldDetailViewModel;
      const { t, validator } = this.props;
      console.log('dsadsad', this.viewModel.filteringFieldDetailViewModel.formPropsData);
      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_filtering_fieldset'),
              key: PIM_FILTERING_FIELD_DETAIL_FIELD_KEY.FILTERING_FIELDSET,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.filteringFieldDetailViewModel.formPropsData[
                PIM_FILTERING_FIELD_DETAIL_FIELD_KEY.FILTERING_FIELDSET
              ]
                ? this.viewModel.filteringFieldDetailViewModel.formPropsData[
                    PIM_FILTERING_FIELD_DETAIL_FIELD_KEY.FILTERING_FIELDSET
                  ]?.map((item) => ({
                    label:
                      this.filteringFieldsetListViewModel?.successResponse?.listFilteringFieldsetsWithoutPagination?.find(
                        (x) => x?.value.toString() === item?.toString()
                      )?.label,
                    value: item,
                  }))
                : null,
              getDataSelectOptions: this.filteringFieldsetListViewModel?.successResponse
                ?.listFilteringFieldsetsWithoutPagination?.length
                ? this.filteringFieldsetListViewModel?.successResponse?.listFilteringFieldsetsWithoutPagination?.map(
                    (item) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                      };
                    }
                  )
                : [],
              handleChange: (data) => {
                let convertData = data.map((item) => item.value);
                this.viewModel.handleFormPropsData(
                  PIM_FILTERING_FIELD_DETAIL_FIELD_KEY.FILTERING_FIELDSET,
                  convertData
                );
                this.forceUpdate();
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_filtering_fieldset'),
              className: 'col-lg-12',
              isMulti: true,
            },
            {
              label: t('txt_type'),
              key: PIM_FILTERING_FIELD_DETAIL_FIELD_KEY.TYPE,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected:
                this.viewModel.filteringFieldDetailViewModel.formPropsData[
                  PIM_FILTERING_FIELD_DETAIL_FIELD_KEY.TYPE
                ] &&
                this.viewModel.filteringFieldDetailViewModel.formPropsData[
                  PIM_FILTERING_FIELD_DETAIL_FIELD_KEY.TYPE
                ] !== '0'
                  ? {
                      label:
                        this.viewModel.filteringFieldDetailViewModel.formPropsData[
                          PIM_FILTERING_FIELD_DETAIL_FIELD_KEY.TYPE
                        ],
                      value:
                        this.viewModel.filteringFieldDetailViewModel.formPropsData[
                          PIM_FILTERING_FIELD_DETAIL_FIELD_KEY.TYPE
                        ],
                    }
                  : null,
              getDataSelectOptions: [
                {
                  label: 'number',
                  value: 'number',
                },
                {
                  label: 'radio',
                  value: 'radio',
                },
                {
                  label: 'checkbox',
                  value: 'checkbox',
                },
              ],
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_FILTERING_FIELD_DETAIL_FIELD_KEY.TYPE,
                  data?.value ?? 0
                );
                this.forceUpdate();
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_type'),
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
export default withTranslation()(FilteringFieldInformation);
