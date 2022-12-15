// import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { withFieldViewModel } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
const FieldsList = ({ formPropsData, validator, groupID, viewModel, fieldClass }) => {
  const [itemsByGroup, setItemsByGroup] = useState(viewModel.fieldListViewModel.items);
  useEffect(() => {
    groupID && setItemsByGroup(viewModel.fieldListViewModel.filterByGroup(groupID));
    if (
      Object.prototype.hasOwnProperty.call(formPropsData, PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS)
    ) {
      Object.assign(formPropsData, { [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} });
    }
  }, []);
  const generateFormSetting = [
    {
      fields: [
        ...itemsByGroup.map((field) => {
          let selectedValue = '';
          if (
            field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.RADIO ||
            field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.SELECTION
          ) {
            selectedValue = formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
              field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
            ]
              ? {
                  label: field[PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS].find(
                    (x) =>
                      x.value ===
                      formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
                        field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
                      ]
                  )?.label,
                  value:
                    formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
                      field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
                    ],
                }
              : null;
          } else {
            selectedValue =
              formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
                field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
              ] ?? null;
          }
          return {
            label: field[PIM_FIELD_DETAIL_FIELD_KEY.NAME],
            key: field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE],
            type: field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE],
            getValueSelected: selectedValue,
            getDataSelectOptions: field[PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS],
            handleChange: (data) => {
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
            className: fieldClass,
            // required: field[PIM_FIELD_DETAIL_FIELD_KEY.RELEVANCE] === 2,
            // validation: 'required',
            creatable:
              field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.filter_type === 'creatable' ? true : false,
            value: formPropsData.product_width,
            format: field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.number_units,
          };
        }),
        {
          label: 'Thumb Image',
          key: 'thumb_image',
          type: FORM_FIELD_TYPE.IMAGE,
          // getValueSelected: selectedValue,
          handleChange: (data) => {
            formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS].thumb_image = data[0].url;
          },
          className: 'col-lg-12',
        },
        {
          label: 'Product Photo',
          key: 'product_photo',
          type: FORM_FIELD_TYPE.IMAGE,
          isMulti: true,
          // getValueSelected: selectedValue,
          handleChange: (data) => {
            formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS].product_photo = data;
          },
          className: 'col-lg-12',
        },
        {
          label: 'Product Video',
          key: 'product_video',
          type: FORM_FIELD_TYPE.VIDEO,
          // getValueSelected: selectedValue,
          handleChange: (data) => {
            formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS].product_photo = data[0].url;
          },
          className: 'col-lg-12',
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
export default withTranslation('common')(withFieldViewModel(FieldsList));
