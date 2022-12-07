import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
const Dimension = ({ t, formPropsData, validator }) => {
  const generateFormSetting = [
    {
      fields: [
        {
          label: 'txt_product_length',
          key: 'product_length',
          type: FORM_FIELD_TYPE.INPUT,
          value: formPropsData.product_length,
          className: 'col-lg-6',
          placeholder: t('txt_type'),
          format: 'cm',
          changed: (event) => {
            formPropsData.product_length = event.target.value;
          },
        },
        {
          label: 'txt_product_height',
          key: 'product_height',
          type: FORM_FIELD_TYPE.INPUT,
          value: formPropsData.product_height,
          className: 'col-lg-6',
          placeholder: t('txt_type'),
          format: 'cm',
          changed: (event) => {
            formPropsData.product_height = event.target.value;
          },
        },
        {
          label: 'txt_product_width',
          key: 'product_width',
          type: FORM_FIELD_TYPE.INPUT,
          value: formPropsData.product_width,
          className: 'col-lg-6',
          placeholder: t('txt_type'),
          format: 'cm',
          changed: (event) => {
            formPropsData.product_width = event.target.value;
          },
        },
        {
          label: 'txt_product_weight',
          key: 'product_weight',
          type: FORM_FIELD_TYPE.INPUT,
          value: formPropsData.product_weight,
          className: 'col-lg-6',
          placeholder: t('txt_type'),
          format: 'kg',
          changed: (event) => {
            formPropsData.product_weight = event.target.value;
          },
        },
        {
          label: 'txt_product_weight_after_packing',
          key: 'product_weight_after_packing',
          type: FORM_FIELD_TYPE.INPUT,
          value: formPropsData.product_weight_after_packing,
          className: 'col-lg-6',
          placeholder: t('txt_type'),
          format: 'kg',
          changed: (event) => {
            formPropsData.product_weight_after_packing = event.target.value;
          },
        },
      ],
    },
  ];
  return (
    <>
      {Object.keys(generateFormSetting)
        .map((groupIndex) => {
          return [...Array(generateFormSetting[groupIndex])].map((group) => {
            return renderingGroupFieldHandler(group, validator);
          });
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, [])}
    </>
  );
};
export default withTranslation('common')(Dimension);
