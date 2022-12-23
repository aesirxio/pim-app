import React, { Component } from 'react';
import { Button, Col, Nav, Row, Tab } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import ModalComponent from 'components/Modal';
import FieldsList from 'components/Fields';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import FieldStore from 'containers/FieldsPage/FieldStore/FieldStore';
import FieldViewModel from 'containers/FieldsPage/FieldViewModel/FieldViewModel';
import { FieldViewModelContextProvider } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';
import { observer } from 'mobx-react';

const fieldStore = new FieldStore();
const fieldViewModel = new FieldViewModel(fieldStore);
const ModalVariantsFields = observer(
  class ModalVariantsFields extends Component {
    constructor(props) {
      super(props);
      this.fieldListViewModel = fieldViewModel ? fieldViewModel.getFieldListViewModel() : null;
    }

    async componentDidMount() {
      if (!this.fieldListViewModel.items.length) {
        this.fieldListViewModel.handleFilter({ type_id: 53 });
        await this.fieldListViewModel.initializeData();
      }
    }

    handleClose = () => {
      this.props.setShowModal(false);
    };
    render() {
      const {
        t,
        dataTable,
        optionVariants,
        activeVariant,
        showModal,
        setShowModal,
        formPropsData,
      } = this.props;
      return (
        <ModalComponent
          show={showModal}
          centered
          onHide={this.handleClose}
          header={<div className="fs-2 fw-bold mb-0">{t('txt_fields')}</div>}
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
                      {t('txt_seo')}
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
                            <FieldViewModelContextProvider viewModel={fieldViewModel}>
                              <FieldsList
                                formPropsData={
                                  formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.VARIANTS][key]
                                }
                                fieldClass={'col-lg-12'}
                              />
                            </FieldViewModelContextProvider>
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
    }
  }
);
export default withTranslation('common')(ModalVariantsFields);
