import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_CATEGORY_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import Spinner from 'components/Spinner';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { withCategoryViewModel } from 'containers/CategoriesPage/CategoryViewModel/CategoryViewModelContextProvider';

const CategoryInformation = observer(
  class CategoryInformation extends Component {
    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel.categoryDetailViewModel;
    }

    async componentDidMount() {
      await this.props.viewModel.categoryListViewModel.handleFilter({ limit: 0 });
      await this.props.viewModel.categoryListViewModel.initializeDataCustom();
    }

    render() {
      const { t, validator } = this.props;
      const filteredCategoryList = this.props.viewModel.categoryListViewModel.items.filter(
        (category) => {
          return (
            category.id !==
            this.viewModel.categoryDetailViewModel.formPropsData[PIM_CATEGORY_DETAIL_FIELD_KEY.ID]
          );
        }
      );
      const generateFormSetting = [
        {
          fields: [
            {
              label: 'txt_alias',
              key: PIM_CATEGORY_DETAIL_FIELD_KEY.ALIAS,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.categoryDetailViewModel.formPropsData[
                  PIM_CATEGORY_DETAIL_FIELD_KEY.ALIAS
                ],
              className: 'col-lg-12',
              placeholder: this.viewModel.aliasChange ? this.viewModel.aliasChange : t('txt_type'),
              handleChange: (event) => {
                this.viewModel.handleFormPropsData(
                  PIM_CATEGORY_DETAIL_FIELD_KEY.ALIAS,
                  event.target.value
                );
              },
            },
            {
              label: 'txt_parent_category',
              key: PIM_CATEGORY_DETAIL_FIELD_KEY.PARENT_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.categoryDetailViewModel.formPropsData[
                PIM_CATEGORY_DETAIL_FIELD_KEY.PARENT_ID
              ]
                ? {
                    label: this.props.viewModel.categoryListViewModel.items?.find(
                      (x) =>
                        x.id ===
                        this.viewModel.categoryDetailViewModel.formPropsData[
                          PIM_CATEGORY_DETAIL_FIELD_KEY.PARENT_ID
                        ]
                    )?.title,
                    value:
                      this.viewModel.categoryDetailViewModel.formPropsData[
                        PIM_CATEGORY_DETAIL_FIELD_KEY.PARENT_ID
                      ],
                  }
                : null,
              getDataSelectOptions: filteredCategoryList
                ? filteredCategoryList.map((item) => {
                    let levelString = Array.from(Array(parseInt(item.level)).keys())
                      .map(() => ``)
                      .join('- ');
                    return {
                      label: levelString + item.title,
                      value: item.id,
                    };
                  })
                : null,
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_CATEGORY_DETAIL_FIELD_KEY.PARENT_ID,
                  data.value
                );
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_related_category',
              key: PIM_CATEGORY_DETAIL_FIELD_KEY.RELATED_CATEGORIES,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.categoryDetailViewModel.formPropsData[
                PIM_CATEGORY_DETAIL_FIELD_KEY.RELATED_CATEGORIES
              ]
                ? this.viewModel.categoryDetailViewModel.formPropsData[
                    PIM_CATEGORY_DETAIL_FIELD_KEY.RELATED_CATEGORIES
                  ]?.map((item) => ({ label: item.title, value: item.id }))
                : null,
              getDataSelectOptions: filteredCategoryList
                ? filteredCategoryList.map((item) => {
                    return {
                      label: item.title,
                      value: item.id,
                    };
                  })
                : null,
              handleChange: (data) => {
                let convertData = data.map((item) => ({ title: item.label, id: item.value }));
                this.viewModel.handleFormPropsData(
                  PIM_CATEGORY_DETAIL_FIELD_KEY.RELATED_CATEGORIES,
                  convertData
                );
              },
              isMulti: true,
              className: 'col-lg-12',
            },
          ],
        },
      ];
      return (
        <div>
          {(this.props.viewModel.categoryListViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.props.viewModel.categoryDetailViewModel.formStatus === PAGE_STATUS.LOADING) && (
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
export default withTranslation('common')(withCategoryViewModel(CategoryInformation));
