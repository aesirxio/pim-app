// import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { withFieldViewModel } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
const FieldsList = observer(
  class FieldsList extends Component {
    constructor(props) {
      super(props);
      this.state = { itemsByGroup: this.props.viewModel.fieldListViewModel.items };
    }

    componentDidMount = () => {
      this.props.groupID &&
        this.setState({
          itemsByGroup: this.props.viewModel.fieldListViewModel.filterByGroup(this.props.groupID),
        });
      if (
        Object.prototype.hasOwnProperty.call(
          this.props.formPropsData,
          PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS
        )
      ) {
        Object.assign(this.props.formPropsData, {
          [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {},
        });
      }
    };
    componentDidUpdate = () => {
      if (
        !this.props.groupID &&
        this.state.itemsByGroup.length !== this.props.viewModel.fieldListViewModel.items.length
      ) {
        this.setState({
          itemsByGroup: this.props.viewModel.fieldListViewModel.items,
        });
      }
    };
    render() {
      console.log('rerender Fields', this.props.viewModel.fieldListViewModel.items);

      const generateFormSetting = [
        {
          fields: [
            ...this.state.itemsByGroup.map((field) => {
              let selectedValue = '';
              if (
                field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.SELECTION ||
                field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.RADIO
              ) {
                let fieldValue =
                  field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.SELECTION &&
                  this.props.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
                    field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
                  ]
                    ? this.props.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
                        field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
                      ][0]
                    : this.props.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
                        field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
                      ];
                selectedValue = this.props.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
                  field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
                ]?.length
                  ? {
                      label: field[PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS].find(
                        (x) => x.value === fieldValue
                      )?.label,
                      value: fieldValue,
                    }
                  : null;
              } else {
                selectedValue =
                  this.props.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
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
                  if (field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.SELECTION) {
                    this.props.detailViewModal.handleFormPropsData(
                      [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS],
                      { [field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]]: [data.value] }
                    );
                  } else if (field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.IMAGE) {
                    this.props.detailViewModal.handleFormPropsData(
                      [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS],
                      { [field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]]: data }
                    );
                  } else {
                    this.props.detailViewModal.handleFormPropsData(
                      [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS],
                      { [field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]]: data.target.value }
                    );
                  }
                },
                className:
                  field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.IMAGE
                    ? 'col-lg-12'
                    : this.props.fieldClass,
                // required: field[PIM_FIELD_DETAIL_FIELD_KEY.RELEVANCE] === 2,
                // validation: 'required',
                isMulti:
                  field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.IMAGE &&
                  field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.multiple === '1',
                isVideo:
                  field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.IMAGE &&
                  field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.webservice?.name === 'aesir_dam_video',

                creatable:
                  field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.filter_type === 'creatable'
                    ? true
                    : false,
                value:
                  this.props.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS].product_width,
                format: field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.number_units,
              };
            }),
          ],
        },
      ];
      return (
        <>
          {Object.keys(generateFormSetting)
            .map((groupIndex) => {
              return [...Array(generateFormSetting[groupIndex])].map((group) => {
                return renderingGroupFieldHandler(group, this.props.validator);
              });
            })
            .reduce((arr, el) => {
              return arr.concat(el);
            }, [])}
        </>
      );
    }
  }
);

export default withTranslation('common')(withFieldViewModel(FieldsList));
