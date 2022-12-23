import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
// import TagStore from 'containers/ProductsPage/TagStore/TagStore';
// import TagViewModel from 'containers/ProductsPage/TagViewModel/TagViewModel';
import Spinner from 'components/Spinner';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { withProductViewModel } from 'containers/ProductsPage/ProductViewModel/ProductViewModelContextProvider';

// const tagStore = new TagStore();
// const tagViewModel = new TagViewModel(tagStore);
const CommonInformation = observer(
  class CommonInformation extends Component {
    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel.productDetailViewModel;
      this.categoryListViewModel = this.props.categoryListViewModel;
      // this.tagListViewModel = tagViewModel ? tagViewModel.getTagListViewModel() : null;
    }

    async componentDidMount() {
      // await this.tagListViewModel.initializeData();
    }

    render() {
      const { t, validator } = this.props;
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
              placeholder: t('txt_type'),
              handleChange: (event) => {
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS
                ] = event.target.value;
              },
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
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME
                ] = data.label;
                this.viewModel.productDetailViewModel.formPropsData[
                  PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID
                ] = data.value;
              },
              className: 'col-lg-12',
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
          {this.categoryListViewModel.formStatus === PAGE_STATUS.LOADING && (
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
export default withTranslation('common')(withProductViewModel(CommonInformation));
