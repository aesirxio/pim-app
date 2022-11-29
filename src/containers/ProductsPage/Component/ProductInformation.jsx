import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
const ProductInformation = ({ t, formPropsData, validator }) => {
  const generateFormSetting = [
    {
      fields: [
        {
          label: 'txt_sale_market',
          key: PIM_PRODUCT_DETAIL_FIELD_KEY.SALE_MARKET_ID,
          type: FORM_FIELD_TYPE.SELECTION,
          getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.SALE_MARKET_ID]
            ? {
                label: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.SALE_MARKET_NAME],
                value: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.SALE_MARKET_ID],
              }
            : null,
          getDataSelectOptions: [
            {
              label: 'Sale Market 1',
              value: 'sale-market-1',
            },
            {
              label: 'Sale Market 2',
              value: 'sale-market-2',
            },
          ],
          placeholder: t('txt_select'),
          handleChange: (data) => {
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.SALE_MARKET_NAME] = data.label;
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.SALE_MARKET_ID] = data.value;
          },
          className: 'col-lg-12',
          isMulti: true,
        },
        {
          label: 'txt_related_categories',
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
          placeholder: t('txt_select_category'),
          handleChange: (data) => {
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME] = data.label;
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID] = data.value;
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
export default withTranslation('common')(ProductInformation);
