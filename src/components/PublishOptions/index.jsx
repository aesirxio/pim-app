import ComponentSVG from 'components/ComponentSVG';
import FormSelection from 'components/Form/FormSelection';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import FormRadio from 'components/Form/FormRadio';
import CustomizedDatePicker from 'components/DatePicker';
import { FORMAT_DATE, FORMAT_TIME } from 'constants/FormFieldType';
import { AUTHORIZATION_KEY, Storage } from 'aesirx-dma-lib';
import UtilsStore from 'store/UtilsStore/UtilsStore';
import UtilsViewModel from 'store/UtilsStore/UtilsViewModel';
import { observer } from 'mobx-react';

const utilsStore = new UtilsStore();
const utilsViewModel = new UtilsViewModel(utilsStore);

const PublishOptions = observer(
  class PublishOptions extends Component {
    constructor(props) {
      super(props);
      this.utilsListViewModel = utilsViewModel ? utilsViewModel.getUtilsListViewModel() : null;
    }

    async componentDidMount() {
      if (!this.utilsListViewModel.listPublishStatus.length) {
        await this.utilsListViewModel.getListPublishStatus();
      }
    }
    render() {
      const {
        t,
        detailViewModal,
        formPropsData,
        isEdit,
        isPublished = true,
        isFeatured = true,
        isLastModified = true,
        isCreateBy = true,
      } = this.props;
      let createBy = isEdit
        ? formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_USER_NAME]
        : Storage.getItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME);
      let modifiedBy = isEdit
        ? formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.MODIFIED_USER_NAME]
        : Storage.getItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME);
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm">
          <h5 className="fw-bold text-blue-0 text-uppercase fs-6 border-bottom pb-24 mb-24">
            {t('txt_publish_options')}
          </h5>
          {isPublished && (
            <div className="d-flex align-items-center justify-content-between w-100 mb-24">
              <div>
                <ComponentSVG url="/assets/images/post-status.svg" className="pe-1 bg-black" />
                {t('txt_status')}:
              </div>

              <Form.Group className={`w-60`}>
                <FormSelection
                  field={{
                    getValueSelected:
                      formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED] !== undefined
                        ? {
                            label: t(
                              `txt_${this.utilsListViewModel.listPublishStatus
                                ?.find(
                                  (x) =>
                                    x.value.toString() ===
                                    formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED].toString()
                                )
                                ?.label?.toString()
                                .toLowerCase()}`
                            ),
                            value: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED].toString(),
                          }
                        : null,
                    getDataSelectOptions: this.utilsListViewModel.listPublishStatus?.map(
                      (status) => ({
                        label: t(`txt_${status?.label && status.label?.toString().toLowerCase()}`),
                        value: status.value.toString(),
                      })
                    ),
                    arrowColor: 'var(--dropdown-indicator-color)',
                    handleChange: (data) => {
                      detailViewModal.handleFormPropsData(
                        PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED,
                        data.value
                      );
                    },
                  }}
                />
              </Form.Group>
            </div>
          )}
          {isLastModified && (
            <div className="d-flex align-items-center justify-content-between w-100 mb-24 border-bottom pb-24">
              <div>{t('txt_last_modified')}:</div>
              <div className="text-gray">{modifiedBy}</div>
            </div>
          )}
          {isFeatured && (
            <div className="d-flex align-items-center justify-content-between w-100 mb-24">
              <div>{t('txt_feature')}</div>
              <Form.Group>
                <FormRadio
                  field={{
                    key: PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED,
                    getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED]
                      ? {
                          label:
                            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED] === '1'
                              ? t('txt_yes')
                              : 'No',
                          value: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED].toString(),
                        }
                      : {
                          label: 'No',
                          value: '0',
                        },
                    getDataSelectOptions: [
                      {
                        label: t('txt_yes'),
                        value: '1',
                      },
                      {
                        label: t('txt_no'),
                        value: '0',
                        className: 'me-0',
                      },
                    ],
                    handleChange: (data) => {
                      detailViewModal.handleFormPropsData(
                        PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED,
                        data.target.value
                      );
                    },
                  }}
                />
              </Form.Group>
            </div>
          )}
          <div className="d-flex align-items-center justify-content-between w-100 mb-24">
            <div>{t('txt_create_date')}:</div>
            <Form.Group className={``}>
              <div className="fs-14">
                <CustomizedDatePicker
                  dateFormat={FORMAT_DATE + ' ' + FORMAT_TIME}
                  defaultDate={
                    formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_TIME]
                      ? formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_TIME]
                      : new Date()
                  }
                  isDisabled={true}
                  showTimeSelect={true}
                  isUTC={true}
                />
              </div>
            </Form.Group>
          </div>
          {isCreateBy && (
            <div className="d-flex align-items-center justify-content-between w-100">
              <div>{t('txt_create_by')}:</div>
              <div className="text-gray">{createBy}</div>
            </div>
          )}
        </div>
      );
    }
  }
);
export default withTranslation('common')(PublishOptions);
