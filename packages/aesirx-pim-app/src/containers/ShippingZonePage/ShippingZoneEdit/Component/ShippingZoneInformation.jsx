import { PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY } from 'aesirx-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { FORM_FIELD_TYPE, Spinner, renderingGroupFieldHandler } from 'aesirx-uikit';
import { ShippingZoneViewModelContext } from 'containers/ShippingZonePage/ShippingZoneViewModel/ShippingZoneViewModelContextProvider';
import { CountryStore } from 'containers/CountryPage/store';
import CountryViewModel from 'containers/CountryPage/CountryViewModel/CountryViewModel';
import { StateStore } from 'containers/StatePage/store';
import StateViewModel from 'containers/StatePage/StateViewModel/StateViewModel';
import { CityStore } from 'containers/CityPage/store';
import CityViewModel from 'containers/CityPage/CityViewModel/CityViewModel';
import { Row } from 'react-bootstrap';

const countryStore = new CountryStore();
const countryViewModel = new CountryViewModel(countryStore);
const stateStore = new StateStore();
const stateViewModel = new StateViewModel(stateStore);
const cityStore = new CityStore();
const cityViewModel = new CityViewModel(cityStore);

const ShippingZoneInformation = observer(
  class ShippingZoneInformation extends Component {
    static contextType = ShippingZoneViewModelContext;

    constructor(props) {
      super(props);
      this.countryListViewModel = countryViewModel.countryListViewModel;
      this.stateListViewModel = stateViewModel.stateListViewModel;
      this.cityListViewModel = cityViewModel.cityListViewModel;
      this.state = { country: null };
      this.validator = this.props.validator;
    }

    componentDidMount() {
      const fetchData = async () => {
        await this.countryListViewModel.initializeAllData();
      };
      fetchData();
    }

    render() {
      this.viewModel = this.context.model.shippingZoneDetailViewModel;

      const { t, validator, isEdit } = this.props;

      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_country'),
              key: PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.shippingZoneDetailViewModel.formPropsData[
                PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY
              ]?.id
                ? {
                    label:
                      this.viewModel.shippingZoneDetailViewModel.formPropsData[
                        PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY
                      ]?.name,
                    value:
                      this.viewModel.shippingZoneDetailViewModel.formPropsData[
                        PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY
                      ]?.id,
                  }
                : null,
              getDataSelectOptions: this.countryListViewModel?.successResponse
                ?.listCountrysWithoutPagination?.length
                ? this.countryListViewModel?.successResponse?.listCountrysWithoutPagination?.map(
                    (item) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                      };
                    }
                  )
                : [],
              handleChange: async (data) => {
                data &&
                  this.viewModel.handleFormPropsData(
                    PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY,
                    { id: data?.value, name: data?.label } ?? {}
                  );
                this.viewModel.handleFormPropsData(
                  PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY_ID,
                  data?.value ?? null
                );
                data &&
                  this.viewModel.handleFormPropsData(
                    PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE,
                    { id: null, name: null } ?? {}
                  );
                this.viewModel.handleFormPropsData(
                  PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE_ID,
                  null
                );
                this.setState((prevState) => {
                  return {
                    ...prevState,
                    country: data?.value,
                  };
                });
                if (data?.value && data?.value !== this.state.country) {
                  await this.stateListViewModel.handleFilter({
                    'filter[country_id]': data?.value,
                  });
                  await this.stateListViewModel.initializeAllData();
                }
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_select_country'),
              className: 'col-lg-12',
            },
            ...(this.viewModel.shippingZoneDetailViewModel.formPropsData[
              PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY
            ]?.id &&
            this.stateListViewModel?.successResponse?.state &&
            this.stateListViewModel?.successResponse?.listStatesWithoutPagination?.length
              ? [
                  {
                    label: t('txt_state'),
                    key: PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE,
                    type: FORM_FIELD_TYPE.SELECTION,
                    getValueSelected: this.viewModel.shippingZoneDetailViewModel.formPropsData[
                      PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE
                    ]?.id
                      ? {
                          label:
                            this.viewModel.shippingZoneDetailViewModel.formPropsData[
                              PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE
                            ]?.name,
                          value:
                            this.viewModel.shippingZoneDetailViewModel.formPropsData[
                              PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE
                            ]?.id,
                        }
                      : null,
                    getDataSelectOptions: this.stateListViewModel?.successResponse
                      ?.listStatesWithoutPagination?.length
                      ? this.stateListViewModel?.successResponse?.listStatesWithoutPagination?.map(
                          (item) => {
                            return {
                              label: item?.label,
                              value: item?.value,
                            };
                          }
                        )
                      : [],
                    handleChange: async (data) => {
                      data &&
                        this.viewModel.handleFormPropsData(
                          PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE,
                          { id: data?.value, name: data?.label } ?? {}
                        );
                      this.viewModel.handleFormPropsData(
                        PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE_ID,
                        data?.value ?? null
                      );
                      data &&
                        this.viewModel.handleFormPropsData(
                          PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.CITY,
                          { id: null, name: null }
                        );
                      this.viewModel.handleFormPropsData(
                        PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.CITY_ID,
                        null
                      );
                      this.setState((prevState) => {
                        return {
                          ...prevState,
                          state: data?.value,
                        };
                      });
                      if (data?.value && data?.value !== this.state.state) {
                        await this.cityListViewModel.handleFilter({
                          'filter[state_id]': data?.value,
                        });
                        await this.cityListViewModel.initializeAllData();
                      }
                    },
                    required: true,
                    validation: 'required',
                    placeholder: t('txt_select_state'),
                    className: 'col-lg-12',
                  },
                ]
              : []),
            ...(this.viewModel.shippingZoneDetailViewModel.formPropsData[
              PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE
            ]?.id &&
            this.stateListViewModel?.successResponse?.state &&
            this.cityListViewModel?.successResponse?.state &&
            this.stateListViewModel?.successResponse?.listStatesWithoutPagination?.length &&
            this.cityListViewModel?.successResponse?.listCitysWithoutPagination?.length
              ? [
                  {
                    label: t('txt_city'),
                    key: PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.CITY,
                    type: FORM_FIELD_TYPE.SELECTION,
                    getValueSelected: this.viewModel.shippingZoneDetailViewModel.formPropsData[
                      PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.CITY
                    ]?.id
                      ? {
                          label:
                            this.viewModel.shippingZoneDetailViewModel.formPropsData[
                              PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.CITY
                            ]?.name,
                          value:
                            this.viewModel.shippingZoneDetailViewModel.formPropsData[
                              PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.CITY
                            ]?.id,
                        }
                      : null,
                    getDataSelectOptions: this.cityListViewModel?.successResponse
                      ?.listCitysWithoutPagination?.length
                      ? this.cityListViewModel?.successResponse?.listCitysWithoutPagination?.map(
                          (item) => {
                            return {
                              label: item?.label,
                              value: item?.value,
                            };
                          }
                        )
                      : [],
                    handleChange: (data) => {
                      data &&
                        this.viewModel.handleFormPropsData(
                          PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.CITY,
                          { id: data?.value, name: data?.label } ?? {}
                        );
                      this.viewModel.handleFormPropsData(
                        PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.CITY_ID,
                        data?.value ?? null
                      );
                    },
                    required: true,
                    validation: 'required',
                    placeholder: t('txt_select_state'),
                    className: 'col-lg-12',
                  },
                ]
              : []),
            {
              label: t('txt_zip_start'),
              key: PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.ZIP_START,
              type: FORM_FIELD_TYPE.NUMBER,
              getValueSelected:
                this.viewModel.shippingZoneDetailViewModel.formPropsData[
                  PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.ZIP_START
                ],
              className: 'col-lg-6',
              placeholder: t('txt_type_zip_start'),
              required: true,
              validation: 'required|numeric|min:1,num',
              handleChange: (event) => {
                this.viewModel.handleFormPropsData(
                  PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.ZIP_START,
                  event.target.value
                );
              },
              blurred: () => {
                this.forceUpdate();
                this.validator.showMessageFor(t('txt_zip_start'));
              },
            },
            {
              label: t('txt_zip_end'),
              key: PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.ZIP_END,
              type: FORM_FIELD_TYPE.NUMBER,
              getValueSelected:
                this.viewModel.shippingZoneDetailViewModel.formPropsData[
                  PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.ZIP_END
                ],
              className: 'col-lg-6',
              placeholder: t('txt_type_zip_end'),
              required: true,
              validation: 'required|numeric|min:1,num',
              handleChange: (event) => {
                this.viewModel.handleFormPropsData(
                  PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.ZIP_END,
                  event.target.value
                );
              },
              blurred: () => {
                this.forceUpdate();
                this.validator.showMessageFor(t('txt_zip_end'));
              },
            },
          ],
        },
      ];
      return (
        <>
          {(!this.countryListViewModel?.successResponse?.state ||
            (this.state.country && !this.stateListViewModel?.successResponse?.state) ||
            (this.state.state && !this.cityListViewModel?.successResponse?.state)) && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
            <Row>
              {Object.keys(generateFormSetting)
                .map((groupIndex) => {
                  return [...Array(generateFormSetting[groupIndex])].map((group) => {
                    return renderingGroupFieldHandler(group, validator);
                  });
                })
                .reduce((arr, el) => {
                  return arr.concat(el);
                }, [])}
            </Row>
          </div>
        </>
      );
    }
  }
);
export default withTranslation()(ShippingZoneInformation);
