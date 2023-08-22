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
    }

    componentDidMount() {
      const fetchData = async () => {
        await this.countryListViewModel.initializeAllData();
      };
      fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
      if (
        this.viewModel.shippingZoneDetailViewModel.formPropsData[
          PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY
        ]?.id &&
        prevState?.country !==
          this.viewModel.shippingZoneDetailViewModel.formPropsData[
            PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY
          ]?.id
      ) {
        const fetchDataState = async () => {
          await this.stateListViewModel.handleFilter({
            'filter[country_id]':
              this.viewModel.shippingZoneDetailViewModel.formPropsData[
                PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY
              ]?.id,
          });
          await this.stateListViewModel.initializeAllData();
        };
        fetchDataState();
      }
      if (
        this.viewModel.shippingZoneDetailViewModel.formPropsData[
          PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE
        ]?.id &&
        prevState?.state !==
          this.viewModel.shippingZoneDetailViewModel.formPropsData[
            PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE
          ]?.id
      ) {
        const fetchDataCity = async () => {
          await this.cityListViewModel.handleFilter({
            'filter[state_id]':
              this.viewModel.shippingZoneDetailViewModel.formPropsData[
                PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE
              ]?.id,
          });
          await this.cityListViewModel.initializeAllData();
        };
        fetchDataCity();
      }
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
              handleChange: (data) => {
                data &&
                  this.viewModel.handleFormPropsData(
                    PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY,
                    { id: data?.value, name: data?.label } ?? {}
                  );
                this.viewModel.handleFormPropsData(
                  PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY_ID,
                  data?.value ?? 0
                );
                this.setState((prevState) => {
                  return {
                    ...prevState,
                    country: data?.value,
                  };
                });
              },
              required: true,
              validation: 'required',
              placeholder: t('txt_select_country'),
              className: 'col-lg-12',
            },
            ...(this.viewModel.shippingZoneDetailViewModel.formPropsData[
              PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.COUNTRY
            ]?.id && this.stateListViewModel?.successResponse?.state
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
                    handleChange: (data) => {
                      data &&
                        this.viewModel.handleFormPropsData(
                          PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE,
                          { id: data?.value, name: data?.label } ?? {}
                        );
                      this.viewModel.handleFormPropsData(
                        PIM_SHIPPING_ZONE_DETAIL_FIELD_KEY.STATE_ID,
                        data?.value ?? 0
                      );
                      this.setState((prevState) => {
                        return {
                          ...prevState,
                          state: data?.value,
                        };
                      });
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
            ]?.id && this.cityListViewModel?.successResponse?.state
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
                        data?.value ?? 0
                      );
                    },
                    required: true,
                    validation: 'required',
                    placeholder: t('txt_select_state'),
                    className: 'col-lg-12',
                  },
                ]
              : []),
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
        </>
      );
    }
  }
);
export default withTranslation()(ShippingZoneInformation);
