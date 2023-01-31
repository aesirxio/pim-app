import React, { Component } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import FieldStore from 'containers/FieldsPage/FieldStore/FieldStore';
import FieldViewModel from 'containers/FieldsPage/FieldViewModel/FieldViewModel';
import Spinner from 'components/Spinner';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { FieldViewModelContextProvider } from 'containers/FieldsPage/FieldViewModel/FieldViewModelContextProvider';

import FieldsList from 'components/Fields';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';

const fieldStore = new FieldStore();
const fieldViewModel = new FieldViewModel(fieldStore);
const FieldsTab = observer(
  class FieldsTab extends Component {
    groupList = [];
    constructor(props) {
      super(props);
      this.fieldListViewModel = fieldViewModel ? fieldViewModel.getFieldListViewModel() : null;
      this.state = {
        defaultActive: '',
      };
    }

    async componentDidMount() {
      if (!this.fieldListViewModel.items.length) {
        this.fieldListViewModel.handleFilter({ 'filter[type_id]': 59, 'filter[published]': 1 });
        this.fieldListViewModel.handleFilterList({ limit: 0 });
        await this.fieldListViewModel.initializeDataCustom();
        await this.fieldListViewModel.getGroupList();
      }
      this.setState({
        defaultActive: 'group-' + this.fieldListViewModel.groupList[0]?.id,
      });
    }

    componentDidUpdate(prevProps) {
      if (this.props.requiredField !== prevProps.requiredField) {
        this.handleActiveTabRequiredField();
      }
    }

    handleActiveTabRequiredField() {
      if (this.props.requiredField) {
        let requiredFields = Object.keys(this.props.validator.fields).find(
          (key) => this.props.validator.fields[key] === false
        );
        let groupRequired = this.fieldListViewModel.items.find(
          (o) => o[PIM_FIELD_DETAIL_FIELD_KEY.NAME] === requiredFields
        )?.field_group_id;
        if (this.state.defaultActive !== 'group-' + groupRequired) {
          this.setState({
            defaultActive: 'group-' + groupRequired,
          });
        }
      }
    }

    render() {
      const { t, detailViewModal, formPropsData, validator } = this.props;
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          {this.fieldListViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <FieldViewModelContextProvider viewModel={fieldViewModel}>
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
                    {this.fieldListViewModel.groupList?.map((group, key) => {
                      return (
                        <Nav.Item key={key}>
                          <Nav.Link eventKey={`group-${group.id}`}>{group.label}</Nav.Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav>
                </Col>
                <Col lg={9}>
                  <Tab.Content>
                    {this.fieldListViewModel.groupList?.map((group, key) => {
                      return (
                        <Tab.Pane eventKey={`group-${group.id}`} key={key}>
                          <h3 className="mb-24 fw-bold">{group.label}</h3>
                          <div className="row">
                            <FieldsList
                              detailViewModal={detailViewModal}
                              formPropsData={formPropsData}
                              validator={validator}
                              groupID={group.id}
                              fieldClass={'col-lg-6'}
                              requiredField={this.props.requiredField}
                            />
                          </div>
                        </Tab.Pane>
                      );
                    })}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </FieldViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(FieldsTab);
