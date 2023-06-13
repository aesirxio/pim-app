import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_CATEGORY_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import { Spinner, notify } from 'aesirx-uikit';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { CategoryViewModelContext } from 'containers/CategoriesPage/CategoryViewModel/CategoryViewModelContextProvider';
import UtilsStore from 'store/UtilsStore/UtilsStore';
import UtilsViewModel from 'store/UtilsStore/UtilsViewModel';

const utilsStore = new UtilsStore();
const utilsViewModel = new UtilsViewModel(utilsStore);
const CategoryInformation = observer(
  class CategoryInformation extends Component {
    static contextType = CategoryViewModelContext;

    constructor(props) {
      super(props);
      this.utilsListViewModel = utilsViewModel.utilsListViewModel;
    }

    async componentDidMount() {
      this.context.categoryListViewModel.handleFilter({ limit: 9999 });
      this.context.categoryListViewModel.initializeDataCustom();
      this.utilsListViewModel.getListContentType({ 'filter[type]': 'category' });
    }

    render() {
      this.viewModel = this.context.categoryDetailViewModel;
      const { t, validator, isEdit } = this.props;
      const filteredCategoryList = this.context.categoryListViewModel.items?.filter((category) => {
        return (
          category.id !==
          this.viewModel.categoryDetailViewModel.formPropsData[PIM_CATEGORY_DETAIL_FIELD_KEY.ID]
        );
      });
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
              label: 'txt_category_type',
              key: PIM_CATEGORY_DETAIL_FIELD_KEY.PRODUCT_TYPE_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.categoryDetailViewModel?.formPropsData[
                PIM_CATEGORY_DETAIL_FIELD_KEY.PRODUCT_TYPE_ID
              ]
                ? {
                    label:
                      this.viewModel.categoryDetailViewModel?.formPropsData[
                        PIM_CATEGORY_DETAIL_FIELD_KEY.PRODUCT_TYPE_NAME
                      ],
                    value:
                      this.viewModel.categoryDetailViewModel?.formPropsData[
                        PIM_CATEGORY_DETAIL_FIELD_KEY.PRODUCT_TYPE_ID
                      ],
                  }
                : null,
              getDataSelectOptions: this.utilsListViewModel.listContentType.length
                ? this.utilsListViewModel.listContentType.map((item) => {
                    let levelString = item?.level
                      ? Array.from(Array(parseInt(item?.level)).keys())
                          .map(() => ``)
                          .join('- ')
                      : '';
                    return {
                      label: levelString + item?.label,
                      value: item?.value,
                    };
                  })
                : [],
              handleChange: (data) => {
                this.viewModel.handleFormPropsData(
                  PIM_CATEGORY_DETAIL_FIELD_KEY.PRODUCT_TYPE_ID,
                  data.value
                );
                this.viewModel.handleFormPropsData(
                  PIM_CATEGORY_DETAIL_FIELD_KEY.PRODUCT_TYPE_NAME,
                  data.label
                );
                this.viewModel.handleProductType(data?.value);
                if (isEdit) {
                  notify(this.props.t('txt_product_type_change_warning'), 'warn');
                }
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_parent_category',
              key: PIM_CATEGORY_DETAIL_FIELD_KEY.PARENT_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected:
                this.viewModel.categoryDetailViewModel.formPropsData[
                  PIM_CATEGORY_DETAIL_FIELD_KEY.PARENT_ID
                ] &&
                this.viewModel.categoryDetailViewModel.formPropsData[
                  PIM_CATEGORY_DETAIL_FIELD_KEY.PARENT_ID
                ] !== 1
                  ? {
                      label: this.context.categoryListViewModel.items?.find(
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
                : [],
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
          {(this.context.categoryListViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.context.categoryDetailViewModel.formStatus === PAGE_STATUS.LOADING) && (
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
export default withTranslation()(CategoryInformation);
