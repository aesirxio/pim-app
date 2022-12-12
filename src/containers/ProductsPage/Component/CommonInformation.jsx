import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import CategoryStore from 'containers/CategoriesPage/CategoryStore/CategoryStore';
import CategoryViewModel from 'containers/CategoriesPage/CategoryViewModel/CategoryViewModel';
import TagStore from 'containers/ProductsPage/TagStore/TagStore';
import TagViewModel from 'containers/ProductsPage/TagViewModel/TagViewModel';
import Spinner from 'components/Spinner';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';

const categoryStore = new CategoryStore();
const categoryViewModel = new CategoryViewModel(categoryStore);

const tagStore = new TagStore();
const tagViewModel = new TagViewModel(tagStore);
const CommonInformation = observer(
  class CommonInformation extends Component {
    constructor(props) {
      super(props);
      this.categoryListViewModel = categoryViewModel
        ? categoryViewModel.getCategoryListViewModel()
        : null;
      this.tagListViewModel = tagViewModel ? tagViewModel.getTagListViewModel() : null;
    }

    async componentDidMount() {
      await this.categoryListViewModel.initializeData();
      await this.tagListViewModel.initializeData();
      this.forceUpdate();
    }

    render() {
      const { t, formPropsData, validator } = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              label: 'txt_alias',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS,
              type: FORM_FIELD_TYPE.INPUT,
              value: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS],
              className: 'col-lg-12',
              placeholder: t('txt_type'),
              handleChange: (event) => {
                formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS] = event.target.value;
              },
            },
            {
              label: 'txt_organisation',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.ORGANISATION,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ORGANISATION] ?? null,
              // getDataSelectOptions: [
              //   {
              //     label: 'Organisation 1',
              //     value: 'organisation-1',
              //   },
              //   {
              //     label: 'Organisation 2',CommonInformation
              //     value: 'organisation-2',
              //   },
              // ],
              handleChange: (data) => {
                formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ORGANISATION] = data;
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_main_category',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID]
                ? {
                    label: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME],
                    value: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID],
                  }
                : null,
              getDataSelectOptions: this.categoryListViewModel.items
                ? this.categoryListViewModel.items.map((item) => ({
                    label: item.title,
                    value: item.id,
                  }))
                : null,
              handleChange: (data) => {
                formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME] = data.label;
                formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID] = data.value;
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_tags',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS]
                ? {
                    label: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS]?.title,
                    value: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS]?.id,
                  }
                : null,
              getDataSelectOptions: this.tagListViewModel.items
                ? this.tagListViewModel.items.map((item) => ({
                    label: item.title,
                    value: item.id,
                  }))
                : null,
              handleChange: (data) => {
                formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS].title = data.label;
                formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS].id = data.value;
                formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS].tag = [data.value];
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_template',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.TEMPLATE,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TEMPLATE] ?? null,
              // getDataSelectOptions: [
              //   {
              //     label: 'Template 1',
              //     value: 'template-1',
              //   },
              //   {
              //     label: 'Template 2',
              //     value: 'template-2',
              //   },
              // ],
              handleChange: (data) => {
                formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TEMPLATE] = data;
              },
              className: 'col-lg-12',
            },
          ],
        },
      ];
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          {(this.tagListViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.categoryListViewModel.formStatus === PAGE_STATUS.LOADING) && (
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
export default withTranslation('common')(CommonInformation);
