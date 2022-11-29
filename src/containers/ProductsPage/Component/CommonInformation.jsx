import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
const CommonInformation = ({ t, formPropsData, validator }) => {
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
          changed: (event) => {
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS] = event.target.value;
          },
        },
        {
          label: 'txt_organisation',
          key: PIM_PRODUCT_DETAIL_FIELD_KEY.ORGANISATION,
          type: FORM_FIELD_TYPE.SELECTION,
          getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ORGANISATION] ?? null,
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
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME] = data.label;
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID] = data.value;
          },
          className: 'col-lg-12',
        },
        {
          label: 'txt_tags',
          key: PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS,
          type: FORM_FIELD_TYPE.SELECTION,
          getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS] ?? null,
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
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS] = data;
          },
          className: 'col-lg-12',
        },
        {
          label: 'txt_template',
          key: PIM_PRODUCT_DETAIL_FIELD_KEY.TEMPLATE,
          type: FORM_FIELD_TYPE.SELECTION,
          getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TEMPLATE] ?? null,
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
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.TEMPLATE] = data;
          },
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
};
export default withTranslation('common')(CommonInformation);
