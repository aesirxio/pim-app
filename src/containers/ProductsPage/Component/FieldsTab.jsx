import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/PimConstant';
import React from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
const FieldsTab = ({ t, formPropsData, validator }) => {
  const generateFormSetting = [
    {
      fields: [
        {
          label: 'txt_related_categories',
          key: PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID,
          type: FORM_FIELD_TYPE.SELECTION,
          getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID]
            ? {
                label: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME],
                value: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID],
              }
            : null,
          getDataSelectOptions: [
            {
              label: 'Category 1',
              value: 'category-1',
            },
            {
              label: 'Category 2',
              value: 'category-2',
            },
          ],
          placeholder: t('txt_select_category'),
          handleChange: (data) => {
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME] = data.label;
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID] = data.value;
          },
          className: 'col-lg-6',
        },
        {
          label: 'txt_related_categories',
          key: PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID,
          type: FORM_FIELD_TYPE.SELECTION,
          getValueSelected: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID]
            ? {
                label: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME],
                value: formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID],
              }
            : null,
          getDataSelectOptions: [
            {
              label: 'Category 1',
              value: 'category-1',
            },
            {
              label: 'Category 2',
              value: 'category-2',
            },
          ],
          placeholder: t('txt_select_category'),
          handleChange: (data) => {
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME] = data.label;
            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID] = data.value;
          },
          className: 'col-lg-6',
        },
      ],
    },
  ];
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
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="dimension">
                <div className="">
                  <h3 className="mb-24 fw-bold">{t('txt_dimension')}</h3>
                  <div className="row">
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
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productAsset">
                <div className="">
                  <div className="row">
                    <h3 className="mb-24 fw-bold">{t('txt_product_asset')}</h3>
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
