// import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { withFieldViewModel } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
const FieldsByGroup = ({ formPropsData, validator, groupID, viewModel }) => {
  const [itemsByGroup, SetItemsByGroup] = useState([]);
  useEffect(() => {
    SetItemsByGroup(viewModel.fieldListViewModel.filterByGroup(groupID));
  }, []);
  const generateFormSetting = [
    {
      fields: itemsByGroup.map((field) => {
        return {
          label: field[PIM_FIELD_DETAIL_FIELD_KEY.NAME],
          key: field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE],
          type: field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE],
          getValueSelected:
            formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
              field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
            ] ?? null,
          getDataSelectOptions: field[PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS],
          handleChange: (data) => {
            if (!formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS]) {
              formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS] = {};
            }
            if (field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.RADIO) {
              formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
                field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
              ] = data.target.value;
            } else if (field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.SELECTION) {
              formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
                field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
              ] = data.value;
            } else {
              formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
                field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
              ] = data.target.value;
            }
          },
          className: 'col-lg-6',
          // required: field[PIM_FIELD_DETAIL_FIELD_KEY.RELEVANCE] === 2,
          // validation: 'required',
          value: formPropsData.product_width,
          format: field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.number_units,
        };
      }),
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
export default withTranslation('common')(withFieldViewModel(FieldsByGroup));
