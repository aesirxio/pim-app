import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
// import TagStore from 'containers/ProductsPage/TagStore/TagStore';
// import TagViewModel from 'containers/ProductsPage/TagViewModel/TagViewModel';
import { Spinner, notify } from 'aesirx-uikit';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { ProductViewModelContext } from 'containers/ProductsPage/ProductViewModel/ProductViewModelContextProvider';
import UtilsStore from 'store/UtilsStore/UtilsStore';
import UtilsViewModel from 'store/UtilsStore/UtilsViewModel';

const utilsStore = new UtilsStore();
const utilsViewModel = new UtilsViewModel(utilsStore);
const CommonInformation = observer(
  class CommonInformation extends Component {
    static contextType = ProductViewModelContext;
    constructor(props) {
      super(props);
      this.utilsListViewModel = utilsViewModel.utilsListViewModel;
      this.categoryListViewModel = this.props.categoryListViewModel;
      this.brandListViewModel = this.props.brandListViewModel;
      this.typeListViewModel = this.props.typeListViewModel;
      this.subTypeListViewModel = this.props.subTypeListViewModel;
    }

    async componentDidMount() {
      this.utilsListViewModel.getListContentType({ 'filter[type]': 'product' });
    }

    render() {
      this.viewModel = this.context?.model?.productDetailViewModel;
      const { t, validator, isEdit } = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              label: 'txt_alias',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS
                ],
              className: 'col-lg-12',
              placeholder: this.viewModel.aliasChange
                ? this.viewModel.aliasChange
                : t('txt_type_product_alias'),
              handleChange: (event) => {
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS
                ] = event.target.value;
              },
            },
            {
              label: 'txt_product_type',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.PRODUCT_TYPE_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.productDetailViewModel?.formPropsData[
                PIM_PRODUCT_DETAIL_FIELD_KEY.PRODUCT_TYPE_ID
              ]
                ? {
                    label:
                      this.viewModel.productDetailViewModel?.formPropsData[
                        PIM_PRODUCT_DETAIL_FIELD_KEY.PRODUCT_TYPE_NAME
                      ],
                    value:
                      this.viewModel.productDetailViewModel?.formPropsData[
                        PIM_PRODUCT_DETAIL_FIELD_KEY.PRODUCT_TYPE_ID
                      ],
                  }
                : null,
              getDataSelectOptions: this.utilsListViewModel.listContentType.length
                ? this.utilsListViewModel.listContentType?.map((item) => {
                    let levelString =
                      item?.level && item?.level > 3
                        ? Array.from(Array(parseInt(item?.level - 2)).keys())
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
                  PIM_PRODUCT_DETAIL_FIELD_KEY.PRODUCT_TYPE_ID,
                  data.value
                );
                this.viewModel.handleFormPropsData(
                  PIM_PRODUCT_DETAIL_FIELD_KEY.PRODUCT_TYPE_NAME,
                  data.label
                );
                this.viewModel.handleProductType(data?.value);
                if (isEdit) {
                  notify(this.props.t('txt_product_type_change_warning'), 'warn');
                }
              },
              placeholder: t('txt_select_type'),
              className: 'col-lg-12',
            },
            {
              label: 'txt_main_category',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.productDetailViewModel.formPropsData[
                PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID
              ]
                ? {
                    label:
                      this.viewModel.productDetailViewModel.formPropsData[
                        PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME
                      ],
                    value:
                      this.viewModel.productDetailViewModel.formPropsData[
                        PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID
                      ],
                  }
                : null,
              getDataSelectOptions: this.categoryListViewModel.items
                ? this.categoryListViewModel.items.map((item) => {
                    let levelString =
                      item?.level && item?.level > 2
                        ? Array.from(Array(parseInt(item.level - 1)).keys())
                            .map(() => ``)
                            .join('- ')
                        : '';
                    return {
                      label: levelString + item.title,
                      value: item.id,
                    };
                  })
                : [],
              handleChange: (data) => {
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME
                ] = data ? data.label : '';
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID
                ] = data ? data.value : '';
              },
              placeholder: t('txt_select_category'),
              className: 'col-lg-12',
              isClearable: true,
            },
            {
              label: 'txt_brand',
              key: 'content_type_brand',
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected:
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ]['content_type_brand'] &&
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ]['content_type_brand']?.constructor.name === 'Object'
                  ? {
                      label:
                        this.viewModel.productDetailViewModel.formPropsData[
                          PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                        ]['content_type_brand']?.title,
                      value:
                        this.viewModel.productDetailViewModel.formPropsData[
                          PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                        ]['content_type_brand']?.id,
                    }
                  : this.viewModel.productDetailViewModel.formPropsData[
                        PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                      ]['content_type_brand']
                    ? {
                        label:
                          this.brandListViewModel?.successResponse?.listBrandsWithoutPagination?.find(
                            (o) =>
                              o?.value?.toString() ===
                              this.viewModel.productDetailViewModel.formPropsData[
                                PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                              ]['content_type_brand']?.toString()
                          )?.label,
                        value:
                          this.viewModel.productDetailViewModel.formPropsData[
                            PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                          ]['content_type_brand'],
                      }
                    : null,
              getDataSelectOptions: this.brandListViewModel?.successResponse
                ?.listBrandsWithoutPagination
                ? this.brandListViewModel?.successResponse?.listBrandsWithoutPagination.map(
                    (item) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                      };
                    }
                  )
                : [],
              handleChange: (data) => {
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ]['content_type_brand'] = data ? data.value : '';
              },
              placeholder: t('txt_select_brand'),
              className: 'col-lg-12',
              isClearable: true,
            },
            {
              label: 'txt_type',
              key: 'content_type_type',
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected:
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ]['content_type_type'] &&
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ]['content_type_type']?.constructor.name === 'Object'
                  ? {
                      label:
                        this.viewModel.productDetailViewModel.formPropsData[
                          PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                        ]['content_type_type']?.title,
                      value:
                        this.viewModel.productDetailViewModel.formPropsData[
                          PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                        ]['content_type_type']?.id,
                    }
                  : this.viewModel.productDetailViewModel.formPropsData[
                        PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                      ]['content_type_type']
                    ? {
                        label:
                          this.typeListViewModel?.successResponse?.listTypesWithoutPagination?.find(
                            (o) =>
                              o?.value?.toString() ===
                              this.viewModel.productDetailViewModel.formPropsData[
                                PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                              ]['content_type_type']?.toString()
                          )?.label,
                        value:
                          this.viewModel.productDetailViewModel.formPropsData[
                            PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                          ]['content_type_type'],
                      }
                    : null,
              getDataSelectOptions: this.typeListViewModel?.successResponse
                ?.listTypesWithoutPagination
                ? this.typeListViewModel?.successResponse?.listTypesWithoutPagination.map(
                    (item) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                      };
                    }
                  )
                : [],
              handleChange: (data) => {
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ]['content_type_type'] = data ? data.value : '';
              },
              placeholder: t('txt_select_type'),
              className: 'col-lg-12',
              isClearable: true,
            },
            {
              label: 'txt_subtype',
              key: 'content_type_sub_type',
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected:
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ]['content_type_sub_type'] &&
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ]['content_type_sub_type']?.constructor.name === 'Object'
                  ? {
                      label:
                        this.viewModel.productDetailViewModel.formPropsData[
                          PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                        ]['content_type_sub_type']?.title,
                      value:
                        this.viewModel.productDetailViewModel.formPropsData[
                          PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                        ]['content_type_sub_type']?.id,
                    }
                  : this.viewModel.productDetailViewModel.formPropsData[
                        PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                      ]['content_type_sub_type']
                    ? {
                        label:
                          this.subTypeListViewModel?.successResponse?.listSubTypesWithoutPagination?.find(
                            (o) =>
                              o?.value?.toString() ===
                              this.viewModel.productDetailViewModel.formPropsData[
                                PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                              ]['content_type_sub_type']?.toString()
                          )?.label,
                        value:
                          this.viewModel.productDetailViewModel.formPropsData[
                            PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                          ]['content_type_sub_type'],
                      }
                    : null,
              getDataSelectOptions: this.subTypeListViewModel?.successResponse
                ?.listSubTypesWithoutPagination
                ? this.subTypeListViewModel?.successResponse?.listSubTypesWithoutPagination.map(
                    (item) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                      };
                    }
                  )
                : [],
              handleChange: (data) => {
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                ]['content_type_sub_type'] = data ? data.value : '';
              },
              placeholder: t('txt_select_subtype'),
              className: 'col-lg-12',
              isClearable: true,
            },
            // {
            //   label: 'txt_tags',
            //   key: PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS,
            //   type: FORM_FIELD_TYPE.SELECTION,
            //   getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
            //     PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS
            //   ]
            //     ? {
            //         label: this.tagListViewModel.items?.find(
            //           (x) =>
            //             x.id ===
            //             formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
            //               PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS
            //             ]
            //         )?.title,
            //         value:
            //           formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
            //             PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS
            //           ],
            //       }
            //     : null,
            //   getDataSelectOptions: this.tagListViewModel.items
            //     ? this.tagListViewModel.items.map((item) => ({
            //         label: item.title,
            //         value: item.id,
            //       }))
            //     : null,
            //   isMulti: true,
            //   handleChange: (data) => {
            //     formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
            //       PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS
            //     ] = data.map((tag) => tag.value);
            //   },
            //   className: 'col-lg-12',
            // },
          ],
        },
      ];
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          {(this.categoryListViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.brandListViewModel.successResponse.state === false ||
            this.typeListViewModel.successResponse.state === false ||
            this.subTypeListViewModel.successResponse.state === false) && (
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
export default withTranslation()(CommonInformation);
