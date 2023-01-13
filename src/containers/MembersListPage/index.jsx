import Button from 'components/Button';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SelectComponent from 'components/Select';
import Table from 'components/Table';
import { Tab, Tabs } from 'react-bootstrap';

class MembersListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  render() {
    const { t } = this.props;
    const columnsTable = [
      {
        Header: () => {
          return (
            <div className="ps-2">
              <input type="checkbox" />
            </div>
          );
        },
        width: 30,
        className: 'py-2 opacity-50 border-bottom-1 text-uppercase',
        accessor: 'stickAll',
        Cell: () => {
          return (
            <div className="ps-2">
              <input className="opacity-50" type="checkbox" />
            </div>
          );
        },
      },
      {
        Header: t('txt_username'),
        accessor: 'username',
        className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
        width: '40%',
        Cell: ({ value }) => {
          return <>{value}</>;
        },
      },
      {
        Header: t('txt_email'),
        accessor: 'email',
        className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
        Cell: ({ value }) => {
          return <>{value}</>;
        },
      },
      {
        Header: t('txt_role'),
        accessor: 'role',
        className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
        Cell: ({ value }) => {
          return <>{value}</>;
        },
      },
      {
        Header: t('txt_date'),
        accessor: 'date',
        className: 'py-2 opacity-50 border-bottom-1 text-uppercase fw-semi',
        Cell: ({ value }) => {
          return <>{value}</>;
        },
      },
    ];
    const dataTable = [
      {
        username: 'Karina Tr',
        email: 'karina@aesirx.io',
        role: 'Super Admin',
        date: '3 Feb, 2022',
      },
    ];

    return (
      <div className="px-3 py-4">
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <h2 className="fw-bold">{t('txt_left_menu_member_list')}</h2>
          <Button
            icon={faPlus}
            text={t('txt_left_menu_add_new')}
            variant={`light`}
            className={` px-16 fw-semibold d-flex align-items-center rounded-1 btn btn-success`}
          ></Button>
        </div>
        <div className="mb-3">
          <Tabs
            defaultActiveKey={'membersList'}
            id="tab-setting"
            onSelect={(k) => this.setState({ key: k })}
          >
            <Tab key="membersList" eventKey="membersList" title={t('txt_all_members')} />
            <Tab key="superAdmin" eventKey="superAdmin" title={t('txt_super_admin')} />
            <Tab key="supplier" eventKey="supplier" title={t('txt_supplier')} />
            <Tab key="manager" eventKey="manager" title={t('txt_manager')} />
            <Tab
              key="productImporter"
              eventKey="productImporter"
              title={t('txt_product_importer')}
            />
            <Tab key="merchandiser" eventKey="merchandiser" title={t('txt_merchandiser')} />
          </Tabs>
        </div>
        <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
          <SelectComponent
            defaultValue={`test`}
            options={[{ label: 'Test', value: 'test' }]}
            className={`fs-sm`}
            isBorder={true}
            placeholder={t('txt_bulk_actions')}
            arrowColor={'var(--dropdown-indicator-color)'}
          />
          <div className="d-flex align-items-center">
            <div className="opacity-50 me-2">{t('txt_showing')}</div>
            <SelectComponent
              defaultValue={`test`}
              options={[{ label: 'Test', value: 'test' }]}
              className={`fs-sm`}
              isBorder={true}
              placeholder={t('txt_bulk_actions')}
              arrowColor={'var(--dropdown-indicator-color)'}
            />
          </div>
        </div>
        <div className="bg-white rounded">
          <Table columns={columnsTable} data={dataTable}></Table>
        </div>
      </div>
    );
  }
}
export default withTranslation('common')(MembersListPage);
