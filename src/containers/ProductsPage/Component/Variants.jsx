import FormSelection from 'components/Form/FormSelection';
import Input from 'components/Form/Input';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
const Variants = ({ t, formPropsData }) => {
  return (
    <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
      <h4 className="mb-24">{t('txt_product_variant')}</h4>
      <Row className="gx-24">
        <Col lg={3}>
          <div className="d-flex flex-wrap">
            <div className="mb-8px fw-semibold w-100">{t('txt_option_name')}</div>
            <Form.Group className={`w-100`}>
              <Input
                field={{
                  value: formPropsData.variants,
                  classNameInput: 'fs-14',
                  placeholder: t('txt_type'),
                  changed: (event) => {
                    this.formPropsData.variants = event.target.value;
                  },
                }}
              />
            </Form.Group>
          </div>
        </Col>
        <Col lg={9}>
          <div className="d-flex flex-wrap">
            <div className="mb-8px fw-semibold w-100">{t('txt_option_value')}</div>
            <Form.Group className={`w-100`}>
              <FormSelection
                field={{
                  getValueSelected: formPropsData?.variants ?? null,
                  creatable: true,
                  handleChange: (data) => {
                    formPropsData.variants = data;
                  },
                }}
              />
            </Form.Group>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default withTranslation('common')(Variants);
