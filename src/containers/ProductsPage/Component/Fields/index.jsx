import React from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import Dimension from './Dimension';
import GeneralInformation from './GeneralInformation';
import ProductAsset from './ProductAsset';
const FieldsTab = ({ t, formPropsData, validator }) => {
  return (
    <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
      <Tab.Container id="left-tabs-fields" defaultActiveKey={'generalInformation'}>
        <Row className="gx-24">
          <Col lg={3}>
            <div className="fs-14 pb-16 mb-1 border-bottom fw-semibold">{t('txt_field_group')}</div>
            <Nav variant="tabs" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="generalInformation">{t('txt_general_information')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="dimension">{t('txt_dimension')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productAsset">{t('txt_product_asset')}</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg={9}>
            <Tab.Content>
              <Tab.Pane eventKey="generalInformation">
                <div className="">
                  <h3 className="mb-24 fw-bold">{t('txt_general_information')}</h3>
                  <div className="row">
                    <GeneralInformation formPropsData={formPropsData} validator={validator} />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="dimension">
                <div className="">
                  <h3 className="mb-24 fw-bold">{t('txt_dimension')}</h3>
                  <div className="row">
                    <Dimension formPropsData={formPropsData} validator={validator} />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productAsset">
                <div className="">
                  <div className="row">
                    <h3 className="mb-24 fw-bold">{t('txt_additional_image')}</h3>
                    <ProductAsset formPropsData={formPropsData} validator={validator} />
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};
export default withTranslation('common')(FieldsTab);
