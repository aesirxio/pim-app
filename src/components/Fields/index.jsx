import {
  PIM_FIELD_DETAIL_FIELD_KEY,
  PIM_PRODUCT_DETAIL_FIELD_KEY,
  dateFormatConvert,
} from 'aesirx-lib';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { withFieldViewModel } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import moment from 'moment';

const FieldsList = observer(
  class FieldsList extends Component {
    constructor(props) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.state = { itemsByGroup: [], defaultActive: '' };
      this.fieldRef = [];
    }

    componentDidMount = async () => {
      this.viewModel.fieldListViewModel.handleFilter({
        'filter[type]': this.props.type,
        ...(this.props.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.PRODUCT_TYPE_ID] && {
          'filter[product_types]':
            this.props.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.PRODUCT_TYPE_ID],
        }),
        ...(this.props.productType && { 'filter[product_types]': this.props.productType }),
        'filter[published]': 1,
      });
      this.viewModel.fieldListViewModel.handleFilterList({ limit: 0 });
      await this.viewModel.fieldListViewModel.initializeDataCustom();
      if (this.props.fieldByGroup) {
        await this.viewModel.fieldListViewModel.getGroupList();
        this.setState((prevState) => {
          return {
            ...prevState,
            itemsByGroup: this.viewModel.fieldListViewModel.groupList.map((item) => {
              let itemsByGroup = this.viewModel.fieldListViewModel.items.filter(
                (value) => value[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_GROUP_ID] === item.id
              );
              return { group: item.id, label: item.label, fields: itemsByGroup };
            }),
            defaultActive: 'group-' + this.viewModel.fieldListViewModel.groupList[0]?.id,
          };
        });
      } else {
        this.setState((prevState) => {
          return {
            ...prevState,
            itemsByGroup: [{ group: null, fields: this.viewModel.fieldListViewModel.items }],
          };
        });
      }
    };

    handleActiveTabRequiredField() {
      if (this.props.requiredField) {
        let requiredFields = Object.keys(this.props.validator.fields).find(
          (key) => this.props.validator.fields[key] === false
        );
        let groupRequired = this.viewModel.fieldListViewModel.items.find(
          (o) => o[PIM_FIELD_DETAIL_FIELD_KEY.NAME] === requiredFields
        )?.field_group_id;
        if (this.state.defaultActive !== 'group-' + groupRequired) {
          this.setState((prevState) => {
            return {
              ...prevState,
              defaultActive: 'group-' + groupRequired,
            };
          });
        }
      }
    }

    handleScrollToRequiredField() {
      if (this.props.requiredField) {
        let requiredFields = Object.keys(this.props.validator.fields).find(
          (key) => this.props.validator.fields[key] === false
        );
        let fieldRequired = this.viewModel.fieldListViewModel.items.find(
          (o) => o[PIM_FIELD_DETAIL_FIELD_KEY.NAME] === requiredFields
        );
        if (this.fieldRef[fieldRequired?.fieldcode]) {
          setTimeout(() => {
            this.fieldRef[fieldRequired?.fieldcode] &&
              this.fieldRef[fieldRequired?.fieldcode].scrollIntoView();
          }, 500);
        }
      }
    }

    componentDidUpdate = (prevProps) => {
      if (this.props.requiredField !== prevProps.requiredField) {
        this.props.fieldByGroup && this.handleActiveTabRequiredField();
        this.handleScrollToRequiredField();
      }
    };

    render() {
      const { t } = this.props;
      const generateFormSetting = [
        ...this.state.itemsByGroup?.map((group) => {
          return {
            group: group?.group,
            fields: [
              ...group.fields?.map((field) => {
                let dateFormatConverted = field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.altFormat;
                if (field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.DATE) {
                  dateFormatConverted = dateFormatConvert.convert(
                    field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.altFormat,
                    dateFormatConvert.datepicker,
                    dateFormatConvert.momentJs
                  );
                }
                let selectOptions =
                  field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.ITEM_RELATED ||
                  field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.ITEM_RELATED
                    ? field[PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS]?.filter(
                        (item) =>
                          item?.value?.toString() !== this.props?.formPropsData?.id?.toString()
                      )
                    : field[PIM_FIELD_DETAIL_FIELD_KEY.OPTIONS];
                let selectedValue = '';
                if (
                  field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.SELECTION ||
                  field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.CONTENT_TYPE ||
                  field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.CATEGORY_RELATED ||
                  field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.ITEM_RELATED ||
                  field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.RADIO ||
                  field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.CHECKBOX
                ) {
                  let fieldValue =
                    this.props.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS][
                      field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]
                    ];
                  if (field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.multiple === '1') {
                    selectedValue =
                      fieldValue?.length && Array.isArray(fieldValue)
                        ? fieldValue?.map((item) => {
                            return {
                              label: selectOptions.find(
                                (x) => x.value?.toString() === item?.toString()
                              )?.label,
                              value: item,
                            };
                          })
                        : [];
                  } else {
                    selectedValue = this.props.formPropsData[
                      PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS
                    ][field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]]
                      ? {
                          label: selectOptions.find(
                            (x) => x.value?.toString() === fieldValue?.toString()
                          )?.label,
                          value: fieldValue,
                        }
                      : null;
                  }
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
                  getDataSelectOptions: selectOptions,
                  handleChange: (data) => {
                    if (
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.SELECTION ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.CONTENT_TYPE ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.CATEGORY_RELATED ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.ITEM_RELATED
                    ) {
                      if (field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.multiple === '1') {
                        let convertData = data.map((item) => item?.value);
                        this.props.detailViewModal.handleFormPropsData(
                          [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS],
                          { [field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]]: convertData }
                        );
                      } else {
                        this.props.detailViewModal.handleFormPropsData(
                          [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS],
                          { [field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]]: data.value }
                        );
                      }
                    } else if (
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.IMAGE ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.EDITOR ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.COLOR ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.CHECKBOX ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.DATE ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.YOUTUBE
                    ) {
                      this.props.detailViewModal.handleFormPropsData(
                        [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS],
                        { [field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]]: data ?? '' }
                      );
                    } else {
                      this.props.detailViewModal.handleFormPropsData(
                        [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS],
                        { [field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]]: data.target.value }
                      );
                    }
                  },
                  className:
                    field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.IMAGE ||
                    field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.EDITOR
                      ? 'col-lg-12'
                      : this.props.fieldClass,

                  // ...(field[PIM_FIELD_DETAIL_FIELD_KEY.RELEVANCE] === 2 && {
                  //   required: true,
                  //   validation: 'required',
                  // }),
                  isMulti:
                    (field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.IMAGE ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.LIST ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.SELECTION ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.CONTENT_TYPE ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.CATEGORY_RELATED ||
                      field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.ITEM_RELATED) &&
                    field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.multiple === '1',
                  isVideo:
                    field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.IMAGE &&
                    field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.webservice?.name ===
                      'aesir_dam_video',
                  isEditor:
                    field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.EDITOR &&
                    field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.editor === 'none'
                      ? false
                      : true,
                  ...(field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.EDITOR && {
                    placeholder: t('txt_type'),
                  }),
                  isCheckAll:
                    field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.CHECKBOX &&
                    field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.show_checkall === '1'
                      ? true
                      : false,
                  creatable:
                    field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.filter_type === 'creatable'
                      ? true
                      : false,
                  value:
                    this.props.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS]
                      .product_width,
                  format: field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.number_units,
                  placeholder: field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.placeholder
                    ? field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.placeholder
                    : null,
                  maxLength: field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.limit ?? null,
                  readOnly:
                    field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.readonly === '1' ? true : false,
                  params: field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS],
                  ...(field[PIM_FIELD_DETAIL_FIELD_KEY.TYPE] === FORM_FIELD_TYPE.DATE && {
                    dateFormat: dateFormatConverted,
                    timePicker:
                      field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.showTimePicker === '1'
                        ? true
                        : false,
                    disablePast:
                      field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.disablePast === '1' ? true : false,
                    changeYear:
                      field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.changeYear === 'true'
                        ? true
                        : false,
                    ...(field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.changeYear === 'true' && {
                      yearRangeMin: moment(
                        field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.yearRangeMin,
                        'YYYY'
                      ).toDate(),
                      yearRangeMax: moment(
                        field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.yearRangeMax,
                        'YYYY'
                      ).toDate(),
                    }),
                    minDate: field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.minDate
                      ? moment(field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.minDate).toDate()
                      : null,
                    maxDate: field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.maxDate
                      ? moment(field[PIM_FIELD_DETAIL_FIELD_KEY.PARAMS]?.maxDate).toDate()
                      : null,
                  }),
                  blurred: () => {
                    this.props.validator.showMessageFor(field[PIM_FIELD_DETAIL_FIELD_KEY.NAME]);
                  },
                  ref: (ref) => {
                    this.fieldRef[field[PIM_FIELD_DETAIL_FIELD_KEY.FIELD_CODE]] = ref;
                  },
                };
              }),
            ],
          };
        }),
      ];

      return (
        <>
          {this.props.fieldByGroup ? (
            <Tab.Container
              id="left-tabs-fields"
              activeKey={`${this.state.defaultActive}`}
              onSelect={(key) => {
                this.setState({
                  defaultActive: key,
                });
              }}
            >
              <Row className="gx-24">
                <Col lg={3}>
                  <div className="fs-14 pb-16 mb-1 border-bottom fw-semibold">
                    {t('txt_field_group')}
                  </div>
                  <Nav variant="tabs" className="flex-column">
                    {this.state.itemsByGroup?.map((group, key) => {
                      return (
                        <Nav.Item key={key}>
                          <Nav.Link eventKey={`group-${group.group}`}>{group.label}</Nav.Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav>
                </Col>
                <Col lg={9}>
                  <Tab.Content>
                    {this.state.itemsByGroup?.map((group, key) => {
                      return (
                        <Tab.Pane eventKey={`group-${group.group}`} key={key}>
                          <h3 className="mb-24 fw-bold">{group.label}</h3>
                          <div className="row">
                            {Object.keys(generateFormSetting)
                              .map((groupIndex) => {
                                if (generateFormSetting[groupIndex].group === group.group) {
                                  return [...Array(generateFormSetting[groupIndex])].map(
                                    (group) => {
                                      return renderingGroupFieldHandler(
                                        group,
                                        this.props.validator
                                      );
                                    }
                                  );
                                }
                              })
                              .reduce((arr, el) => {
                                return arr.concat(el);
                              }, [])}
                          </div>
                        </Tab.Pane>
                      );
                    })}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          ) : (
            Object.keys(generateFormSetting)
              .map((groupIndex) => {
                return [...Array(generateFormSetting[groupIndex])].map((group) => {
                  return renderingGroupFieldHandler(group, this.props.validator);
                });
              })
              .reduce((arr, el) => {
                return arr.concat(el);
              }, [])
          )}
        </>
      );
    }
  }
);

export default withTranslation()(withFieldViewModel(FieldsList));
