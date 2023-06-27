import { PIM_FILTERING_VALUE_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { FORM_FIELD_TYPE, renderingGroupFieldHandler } from 'aesirx-uikit';
import { FilteringValueViewModelContext } from 'containers/FilteringValuePage/FilteringValueViewModel/FilteringValueViewModelContextProvider';
import { FilteringFieldStore } from 'containers/FilteringFieldPage/store';
import FilteringFieldViewModel from 'containers/FilteringFieldPage/FilteringFieldViewModel/FilteringFieldViewModel';

const filteringFieldStore = new FilteringFieldStore();
const filteringFieldViewModel = new FilteringFieldViewModel(filteringFieldStore);

const FilteringValueInformation = observer(
  class FilteringValueInformation extends Component {
    static contextType = FilteringValueViewModelContext;

    constructor(props) {
      super(props);
      this.filteringFieldListViewModel = filteringFieldViewModel.filteringFieldListViewModel;
    }

    componentDidMount() {
      const fetchData = async () => {
        await this.filteringFieldListViewModel.initializeAllData();
      };
      fetchData();
    }

    render() {
      this.viewModel = this.context.model.filteringValueDetailViewModel;
      const { t, validator } = this.props;
      console.log('dsadsad', this.viewModel.filteringValueDetailViewModel.formPropsData);
      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_filtering_field'),
              key: PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.FIELD,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.filteringValueDetailViewModel.formPropsData[
                PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.FIELD
              ]
                ? {
                    label:
                      this.filteringFieldListViewModel?.successResponse?.listFilteringFieldsWithoutPagination?.find(
                        (x) =>
                          x?.value.toString() ===
                          this.viewModel.filteringValueDetailViewModel.formPropsData[
                            PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.FIELD
                          ]?.toString()
                      )?.label,
                    value:
                      this.viewModel.filteringValueDetailViewModel.formPropsData[
                        PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.FIELD
                      ],
                  }
                : null,
              getDataSelectOptions: this.filteringFieldListViewModel?.successResponse
                ?.listFilteringFieldsWithoutPagination?.length
                ? this.filteringFieldListViewModel?.successResponse?.listFilteringFieldsWithoutPagination?.map(
                    (item) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                      };
                    }
                  )
                : null,
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.FIELD,
                  data?.value ?? 0
                );
                this.forceUpdate();
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_filtering_field'),
              className: 'col-lg-12',
            },
            {
              label: t('txt_key'),
              key: PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.KEY,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.filteringValueDetailViewModel.formPropsData[
                  PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.KEY
                ],
              className: 'col-lg-12',
              placeholder: t('txt_type_key'),
              handleChange: (event) => {
                this.viewModel.handleFormPropsData(
                  PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.KEY,
                  event.target.value
                );
                this.forceUpdate();
              },
              required: true,
              validation: 'required',
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
export default withTranslation()(FilteringValueInformation);
