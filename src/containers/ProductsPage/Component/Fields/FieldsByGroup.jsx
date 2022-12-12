// import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
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
        console.log('field', field);
        return {
          label: field[PIM_FIELD_DETAIL_FIELD_KEY.NAME],
          key: field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE],
          type: field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE],
          getValueSelected: formPropsData[field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]] ?? null,
          getDataSelectOptions: field[PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS],
          handleChange: (data) => {
            formPropsData[field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]] = data;
          },
          className: 'col-lg-6',
          required: field[PIM_FIELD_DETAIL_FIELD_KEY.RELEVANCE] === 2,
          validation: 'required',
          value: formPropsData.product_width,
          format: field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.number_units,
        };
      }),
    },
  ];
  // const generateFormSetting = [
  //   {
  //     fields: [
  //       {
  //         label: 'txt_collection',
  //         key: 'collection',
  //         type: FORM_FIELD_TYPE.SELECTION,
  //         getValueSelected: formPropsData?.collection ?? null,
  //         getDataSelectOptions: [
  //           {
  //             label: 'Collection 1',
  //             value: 'collection-1',
  //           },
  //           {
  //             label: 'Collection 2',
  //             value: 'collection-2',
  //           },
  //         ],
  //         handleChange: (data) => {
  //           formPropsData.collection = data;
  //         },
  //         className: 'col-lg-6',
  //       },
  //       {
  //         label: 'txt_brand_type',
  //         key: 'brand_type',
  //         type: FORM_FIELD_TYPE.SELECTION,
  //         getValueSelected: formPropsData?.brand_type ?? null,
  //         getDataSelectOptions: [
  //           {
  //             label: 'Brand Type 1',
  //             value: 'brand-type-1',
  //           },
  //           {
  //             label: 'Brand Type 2',
  //             value: 'brand-type-2',
  //           },
  //         ],
  //         handleChange: (data) => {
  //           formPropsData.brand_type = data;
  //         },
  //         className: 'col-lg-6',
  //       },
  //       {
  //         label: 'txt_material',
  //         key: 'material',
  //         type: FORM_FIELD_TYPE.SELECTION,
  //         getValueSelected: formPropsData?.material ?? null,
  //         getDataSelectOptions: [
  //           {
  //             label: 'Material 1',
  //             value: 'material-1',
  //           },
  //           {
  //             label: 'Material 2',
  //             value: 'material-2',
  //           },
  //         ],
  //         handleChange: (data) => {
  //           formPropsData.material = data;
  //         },
  //         className: 'col-lg-6',
  //       },
  //       {
  //         label: 'txt_assemble',
  //         key: 'assemble',
  //         type: FORM_FIELD_TYPE.SELECTION,
  //         getValueSelected: formPropsData?.assemble ?? null,
  //         getDataSelectOptions: [
  //           {
  //             label: 'Assemble 1',
  //             value: 'assemble-1',
  //           },
  //           {
  //             label: 'Assemble 2',
  //             value: 'assemble-2',
  //           },
  //         ],
  //         handleChange: (data) => {
  //           formPropsData.assemble = data;
  //         },
  //         className: 'col-lg-6',
  //       },
  //       {
  //         label: 'txt_origin',
  //         key: 'origin',
  //         type: FORM_FIELD_TYPE.SELECTION,
  //         getValueSelected: formPropsData?.origin ?? null,
  //         getDataSelectOptions: [
  //           {
  //             label: 'Origin 1',
  //             value: 'origin-1',
  //           },
  //           {
  //             label: 'Origin 2',
  //             value: 'origin-2',
  //           },
  //         ],
  //         handleChange: (data) => {
  //           formPropsData.origin = data;
  //         },
  //         className: 'col-lg-6',
  //       },
  //       {
  //         label: 'txt_warranty',
  //         key: 'warranty',
  //         type: FORM_FIELD_TYPE.SELECTION,
  //         getValueSelected: formPropsData?.warranty ?? null,
  //         getDataSelectOptions: [
  //           {
  //             label: 'Warranty 1',
  //             value: 'warranty-1',
  //           },
  //           {
  //             label: 'Warranty 2',
  //             value: 'warranty-2',
  //           },
  //         ],
  //         handleChange: (data) => {
  //           formPropsData.warranty = data;
  //         },
  //         className: 'col-lg-6',
  //       },
  //       {
  //         label: 'txt_fsc_certificated',
  //         key: 'certificated',
  //         type: FORM_FIELD_TYPE.RADIO,
  //         getValueSelected: formPropsData.certificated ?? 'no',
  //         getDataSelectOptions: [
  //           {
  //             label: 'No',
  //             value: 'no',
  //           },
  //           {
  //             label: 'FSC 100%',
  //             value: 'fsc-100',
  //           },
  //           {
  //             label: 'FSC Mix',
  //             value: 'fsc-mix',
  //           },
  //         ],
  //         handleChange: (e) => {
  //           formPropsData.certificated = e.target.value;
  //         },
  //         className: 'col-lg-6',
  //       },
  //     ],
  //   },
  // ];
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
