import ComponentSVG from 'components/ComponentSVG';
import FormRadio from 'components/Form/FormRadio';
import FormSelection from 'components/Form/FormSelection';
import Input from 'components/Form/Input';
import Label from 'components/Form/Label';
import Table from 'components/Table';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import numberWithCommas from 'utils/formatNumber';
const Variants = ({ t, formPropsData }) => {
  const dataStatic = [
    {
      name: 'Color',
      options: [
        { label: 'Grey', value: 'gray' },
        { label: 'Yellow', value: 'yellow' },
      ],
    },
    {
      name: 'Size',
      options: [
        { label: 'S', value: 's' },
        { label: 'M', value: 'm' },
        { label: 'L', value: 'l' },
      ],
    },
    {
      name: 'Test',
      options: [
        { label: 'E', value: 'e' },
        { label: 'A', value: 'a' },
      ],
    },
  ];

  const [optionVariants, setOptionVariants] = useState(dataStatic);

  const a = dataStatic.reduce(
    (prev, current, currentIndex) => [...prev, dataStatic[currentIndex].options],
    []
  );
  console.log('aneee', a);

  const dataQuickSetup = optionVariants[0].options.map((variant) => ({
    color: variant.label,
    rows: optionVariants[1]?.options.map((subVariant) => ({
      size: subVariant.label,
      image: '',
      price: '7.000.000',
      sku: 'DNCHAIR007-GR-S',
      field: 'Edit',
    })),
  }));
  console.log('dataQuickSetup', dataQuickSetup);
  const variantOptions = () => {
    return (
      <>
        {optionVariants.map((variant, key) => {
          return (
            <Row key={key} className="gx-24 mb-24">
              <Col lg={3}>
                <div className="d-flex flex-wrap">
                  <div className="mb-8px fw-semibold w-100">{t('txt_option_name')}</div>
                  <Form.Group className={`w-100`}>
                    <Input
                      field={{
                        value: variant.name,
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
                        getValueSelected: variant.options ?? null,
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
          );
        })}
      </>
    );
  };
  const headerClass = 'py-15 border text-center text-gray bg-gray-300 fw-semibold';
  const cellClass = 'text-center';
  const columnsTable = React.useMemo(
    () => [
      {
        Header: 'COLOR',
        accessor: 'color',
        className: headerClass,
        enableRowSpan: true,
        Cell: ({ value }) => {
          return <div className={cellClass}>{value}</div>;
        },
      },
      {
        Header: 'SIZE',
        accessor: 'size',
        className: headerClass,
        Cell: ({ value }) => {
          return <div className={cellClass}>{value}</div>;
        },
      },
      {
        Header: 'IMAGE',
        accessor: 'image',
        className: headerClass,
        Cell: ({ value }) => {
          return <div className={cellClass}>{value}</div>;
        },
      },
      {
        Header: () => (
          <>
            PRICE (VND) <span className="text-danger">*</span>
          </>
        ),
        accessor: 'price',
        className: headerClass,
        Cell: ({ value }) => {
          return <div className={cellClass}>{value}</div>;
        },
      },
      {
        Header: () => (
          <>
            SKU VARIANT <span className="text-danger">*</span>
          </>
        ),
        accessor: 'sku',
        className: headerClass,
        Cell: ({ value }) => {
          return <div className={cellClass}>{value}</div>;
        },
      },
      {
        Header: 'FIELD',
        accessor: 'field',
        className: headerClass,
        Cell: ({ value }) => {
          return <div className={`${cellClass} text-success`}>{value}</div>;
        },
      },
    ],
    []
  );
  const origData = [
    {
      color: 'Grey',
      rows: [
        { size: 'S', image: '', price: '7.000.000', sku: 'DNCHAIR007-GR-S', field: 'Edit' },
        { size: 'S', image: '', price: '7.000.000', sku: 'DNCHAIR007-GR-S', field: 'Edit' },
        { size: 'S', image: '', price: '7.000.000', sku: 'DNCHAIR007-GR-S', field: 'Edit' },
      ],
    },
  ];
  const newData = [];
  origData.forEach((actorObj) => {
    actorObj.rows.forEach((row) => {
      newData.push({
        color: actorObj.color,
        size: row.size,
        image: row.image,
        price: row.price,
        sku: row.sku,
        field: row.field,
      });
    });
  });
  const dataTable = React.useMemo(() => newData, []);
  return (
    <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
      <h3 className="mb-16 fw-bold">{t('txt_product_variant')}</h3>
      <Form.Group className={`mb-24`}>
        <FormRadio
          field={{
            key: 'variant_select',
            checkbox: true,
            option: [
              {
                label: t('txt_use_product_attribute'),
                value: 'yes',
              },
            ],
            changed: (data) => {
              console.log(data);
            },
          }}
        />
      </Form.Group>
      {variantOptions()}
      <Button
        variant={`light`}
        className={` px-24 py-1 fw-semibold d-flex align-items-center rounded-1 border border-success border-da-1`}
        onClick={() => {
          setOptionVariants([...optionVariants, { name: '', value: [] }]);
          console.log('optionVariants', optionVariants);
        }}
      >
        <ComponentSVG url="/assets/images/plus.svg" className={`me-15`} />
        Add More variant
      </Button>
      <hr className="my-4" />
      <h3 className="mb-16 fw-bold">{t('txt_tips_quick_setup')}</h3>
      <p className="mb-24">{t('txt_type_your_price')}</p>
      <Row className="gx-24 align-items-end mb-4">
        <Col lg={4}>
          <Form.Group>
            <Label text={t('txt_price')} />
            <Input
              field={{
                value: formPropsData.quickPrice ?? numberWithCommas(7000000),
                classNameInput: 'fs-14',
                placeholder: t('txt_type'),
                format: 'VND',
                changed: (event) => {
                  formPropsData.quickPrice = event.target.value;
                },
              }}
            />
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group>
            <Label text={t('txt_sku_product')} />
            <Input
              field={{
                value: formPropsData.quickSKU ?? 'DNCHAIR007',
                classNameInput: 'fs-14',
                placeholder: t('txt_type'),
                changed: (event) => {
                  formPropsData.quickSKU = event.target.value;
                },
              }}
            />
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Button
            variant={`success`}
            className={`px-4 py-1 fw-bold mb-0 fs-14 lh-sm`}
            onClick={() => {
              console.log('test');
            }}
          >
            {t('txt_apply_for_all_variant')}
          </Button>
        </Col>
      </Row>
      <h3 className="mb-16 fw-bold">{t('txt_filterset')}</h3>
      <p className="mb-24">{t('txt_modify_the_variants')}:</p>
      <Table
        columns={columnsTable}
        data={dataTable}
        classNameTable={'table-bordered border-gray'}
      ></Table>
    </div>
  );
};
export default withTranslation('common')(Variants);
