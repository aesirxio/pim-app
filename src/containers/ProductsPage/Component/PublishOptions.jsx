import ComponentSVG from 'components/ComponentSVG';
import FormSelection from 'components/Form/FormSelection';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import FormRadio from 'components/Form/FormRadio';
const PublishOptions = ({ t, formPropsData }) => {
  return (
    <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
      <h5 className="fw-bold text-blue-0 text-uppercase fs-6 border-bottom pb-24 mb-24">
        {t('txt_publish_options')}
      </h5>
      <div className="d-flex align-items-center justify-content-between w-100 mb-24">
        <div>
          <ComponentSVG url="/assets/images/post-status.svg" color="#222328" className="pe-1" />
          Status:
        </div>
        <Form.Group className={`w-60`}>
          <FormSelection
            field={{
              getValueSelected: formPropsData?.status ?? {
                label: 'Publish',
                value: 'publish',
              },
              getDataSelectOptions: [
                {
                  label: 'Publish',
                  value: 'publish',
                },
                {
                  label: 'Status 2',
                  value: 'status-2',
                },
              ],
              handleChange: (data) => {
                formPropsData.status = data;
              },
            }}
          />
        </Form.Group>
      </div>
      <div className="d-flex align-items-center justify-content-between w-100 mb-24 border-bottom pb-24">
        <div>
          <ComponentSVG url="/assets/images/user.svg" color="#222328" className="pe-1" />
          Author:
        </div>
        <Form.Group className={`w-60`}>
          <FormSelection
            field={{
              getValueSelected: formPropsData?.user ?? {
                label: 'Karina Tr',
                value: 'karina',
              },
              getDataSelectOptions: [
                {
                  label: 'Karina Tr',
                  value: 'karina',
                },
                {
                  label: 'User 2',
                  value: 'user-2',
                },
              ],
              handleChange: (data) => {
                formPropsData.user = data;
              },
            }}
          />
        </Form.Group>
      </div>
      <div className="d-flex align-items-center justify-content-between w-100 mb-24">
        <div>Feature</div>
        <Form.Group className={`w-40`}>
          <FormRadio
            field={{
              key: PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED,
              value: 'yes',
              option: [
                {
                  label: 'Yes',
                  value: 'yes',
                },
                {
                  label: 'No',
                  value: 'no',
                  className: 'me-0',
                },
              ],
              changed: (data) => {
                console.log(data);
              },
            }}
          />
        </Form.Group>
      </div>
    </div>
  );
};
export default withTranslation('common')(PublishOptions);
