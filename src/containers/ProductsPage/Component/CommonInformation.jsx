import FormComponent from 'components/Form';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { UPDATE_GENERAL_FIELD_KEY } from 'constants/ProfileModule';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { witheProductViewModel } from '../ProductViewModel/ProductViewModelContextProvider';

const CommonInformation = observer(
  class CommonInformation extends Component {
    updateProductViewModel = null;
    formPropsData = {};

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        getUrlImage: '',
      };
      const { viewModel } = props;
      this.updateProductViewModel = viewModel ? viewModel.getUpdateProductViewModel() : null;
      this.updateProductViewModel.setAllValue(this);
      this.updateProductViewModel.setForm(this);
    }

    componentDidMount() {
      this.updateProductViewModel.initializeData();
    }
    generateFormSetting = () => {
      const { t } = this.props;
      return [
        {
          fields: [
            {
              label: 'txt_alias',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME],
              className: 'col-lg-12',
              placeholder: t('txt_type'),
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME] = event.target.value;
              },
            },
            {
              label: 'txt_organisation',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.ORGANISATION,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.formPropsData?.organisation,
              getDataSelectOptions: [
                {
                  label: 'Organisation 1',
                  value: 'organisation-1',
                },
                {
                  label: 'Organisation 2',
                  value: 'organisation-2',
                },
              ],
              handleChange: (data) => {
                this.formPropsData.organisation = data;
                this.forceUpdate();
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_main_category',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.formPropsData?.category,
              getDataSelectOptions: [
                {
                  label: 'Category 1',
                  value: 'category-1',
                },
                {
                  label: 'Category 2',
                  value: 'category-2',
                },
              ],
              handleChange: (data) => {
                this.formPropsData.category = data;
                this.forceUpdate();
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_tags',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.formPropsData?.tags,
              getDataSelectOptions: [
                {
                  label: 'Tags 1',
                  value: 'tags-1',
                },
                {
                  label: 'Tags 2',
                  value: 'tags-2',
                },
              ],
              handleChange: (data) => {
                this.formPropsData.tags = data;
                this.forceUpdate();
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_template',
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.TEMPLATE,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.formPropsData?.template,
              getDataSelectOptions: [
                {
                  label: 'Template 1',
                  value: 'template-1',
                },
                {
                  label: 'Template 2',
                  value: 'template-2',
                },
              ],
              handleChange: (data) => {
                this.formPropsData.template = data;
                this.forceUpdate();
              },
              className: 'col-lg-12',
            },
          ],
        },
      ];
    };
    render() {
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          <FormComponent
            formClassName={'row'}
            generateFormSetting={() => this.generateFormSetting()}
            formPropsData={this.formPropsData}
            viewModel={this.updateProductViewModel}
            key={Math.random(40, 200)}
          />
        </div>
      );
    }
  }
);
export default withTranslation('common')(witheProductViewModel(CommonInformation));
