import React, { Component } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import FieldStore from 'containers/FieldsPage/FieldStore/FieldStore';
import FieldViewModel from 'containers/FieldsPage/FieldViewModel/FieldViewModel';
import { observer } from 'mobx-react';
import { FieldViewModelContextProvider } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';
import FieldsList from 'components/Fields';
import CategoryInformation from './CategoryInformation';
const fieldStore = new FieldStore();
const fieldViewModel = new FieldViewModel(fieldStore);
const CategoryTab = observer(
  class CategoryTab extends Component {
    groupList = [];
    constructor(props) {
      super(props);
      this.fieldListViewModel = fieldViewModel ? fieldViewModel.getFieldListViewModel() : null;
      this.detailViewModal = this.props.detailViewModal;
      this.state = {
        defaultActive: 'categoryInformation',
      };
    }

    componentDidUpdate(prevProps) {
      if (this.props.requiredField !== prevProps.requiredField) {
        this.handleActiveTabRequiredField();
      }
    }

    handleActiveTabRequiredField() {
      if (this.props.requiredField) {
        this.setState({
          defaultActive: 'customFields',
        });
      }
    }

    render() {
      const { t, validator } = this.props;
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
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
                  <Nav.Item>
                    <Nav.Link eventKey="categoryInformation">
                      {t('txt_category_information')}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="customFields">{t('txt_custom_fields')}</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col lg={9}>
                <FieldViewModelContextProvider viewModel={fieldViewModel}>
                  <Tab.Content>
                    <Tab.Pane eventKey="categoryInformation">
                      <CategoryInformation validator={validator} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="customFields">
                      <div className="row">
                        <FieldsList
                          detailViewModal={this.detailViewModal}
                          formPropsData={this.detailViewModal.categoryDetailViewModel.formPropsData}
                          validator={validator}
                          fieldClass={'col-lg-12'}
                          requiredField={this.props.requiredField}
                          typeId={65}
                        />
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </FieldViewModelContextProvider>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      );
    }
  }
);
export default withTranslation('common')(CategoryTab);
