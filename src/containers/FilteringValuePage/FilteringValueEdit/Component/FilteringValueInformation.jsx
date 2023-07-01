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
      this.state = { isNumber: false };
    }

    componentDidMount() {
      const fetchData = async () => {
        await this.filteringFieldListViewModel.handleFilter({ 'filter[exclude_type]': 'number' });
        await this.filteringFieldListViewModel.initializeAllData();
      };
      fetchData();
    }

    render() {
      this.viewModel = this.context.model.filteringValueDetailViewModel;
      const { t, validator } = this.props;
      const generateFormSetting = [
        {
          fields: [
            ...(!this.state.isNumber
              ? [
                  {
                    label: t('txt_filtering_value'),
                    key: PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.VALUE,
                    type: FORM_FIELD_TYPE.INPUT,
                    getValueSelected:
                      this.viewModel.filteringValueDetailViewModel.formPropsData[
                        PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.VALUE
                      ],
                    className: 'col-lg-12',
                    placeholder: t('txt_add_filtering_value'),
                    handleChange: (event) => {
                      this.viewModel.handleFormPropsData(
                        PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.VALUE,
                        event.target.value
                      );
                      this.forceUpdate();
                    },
                    required: true,
                    validation: 'required',
                  },
                ]
              : []),
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
                        type: item?.type,
                      };
                    }
                  )
                : [],
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.FIELD,
                  data?.value ?? 0
                );
                if (data?.type === 'number') {
                  this.setState({ isNumber: true });
                  this.viewModel.handleFormPropsData(
                    PIM_FILTERING_VALUE_DETAIL_FIELD_KEY.VALUE,
                    ''
                  );
                } else {
                  this.setState({ isNumber: false });
                }
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
        <div className="p-24 bg-white rounded-1 shadow-sm h-100">
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
