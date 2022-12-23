import React from 'react';
import { Button, Col, Form, Nav, Row, Tab } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import ModalComponent from 'components/Modal';
import Label from 'components/Form/Label';
import Input from 'components/Form/Input';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
const ModalVariantsPrice = ({
  t,
  dataTable,
  optionVariants,
  activeVariant,
  showModal,
  setShowModal,
  formPropsData,
}) => {
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <ModalComponent
      show={showModal}
      centered
      onHide={handleClose}
      header={<div className="fs-2 fw-bold mb-0">{t('txt_edit_price_variant')}</div>}
      dialogClassName={'modal-xl'}
      body={
        <div className="">
          <Tab.Container
            id="left-tabs-fields"
            defaultActiveKey={activeVariant ? 'variant-' + activeVariant.index : 'variant-0'}
          >
            <Row className="gx-24">
              <Col lg={3}>
                <div className="fs-14 pb-16 mb-1 border-bottom fw-semibold text-uppercase">
                  {t('txt_variants')}
                </div>
                <Nav variant="tabs" className="flex-column">
                  {dataTable?.map((item, key) => {
                    const variantString = optionVariants.reduce(
                      (prev, curr) => `${prev}${prev && '-'} ${item[curr.name]} `,
                      ''
                    );
                    return (
                      <Nav.Item key={key}>
                        <Nav.Link eventKey={`variant-${key}`}>{variantString}</Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
              </Col>
              <Col lg={9}>
                <Tab.Content>
                  {dataTable?.map((item, key) => {
                    return (
                      <Tab.Pane key={key} eventKey={`variant-${key}`}>
                        <Row className="gx-24">
                          <Col lg={6}>
                            <Form.Group className={`w-100`}>
                              <Label text="Price" />
                              <Input
                                field={{
                                  getValueSelected: item.price,
                                  classNameInput: 'fs-14',
                                  placeholder: t('txt_type'),
                                  format: 'VND',
                                  handleChange: (event) => {
                                    formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.VARIANTS][
                                      key
                                    ].price = event.target.value;
                                    item.price = event.target.value;
                                  },
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className={`w-100`}>
                              <Label text="Discount Price" />
                              <Input
                                field={{
                                  getValueSelected: item.retail_price,
                                  classNameInput: 'fs-14',
                                  placeholder: t('txt_type'),
                                  format: 'VND',
                                  handleChange: (event) => {
                                    formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.VARIANTS][
                                      key
                                    ].retail_price = event.target.value;
                                    item.retail_price = event.target.value;
                                  },
                                }}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      }
      footer={
        <>
          <Button
            variant={`success`}
            className={`px-4 py-1 fw-bold mb-0 fs-14 lh-sm`}
            onClick={() => {
              setShowModal(false);
            }}
          >
            {t('txt_submit')}
          </Button>
        </>
      }
    />
  );
};
export default withTranslation('common')(ModalVariantsPrice);
