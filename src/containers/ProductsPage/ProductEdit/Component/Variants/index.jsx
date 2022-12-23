import ComponentSVG from 'components/ComponentSVG';
import FormRadio from 'components/Form/FormRadio';
import FormSelection from 'components/Form/FormSelection';
import Input from 'components/Form/Input';
import Label from 'components/Form/Label';
import Table from 'components/Table';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import numberWithCommas from 'utils/formatNumber';
import ModalVariantsPrice from './ModalVariantsPrice';
import ModalVariantsFields from './ModalVariantsFields';

const Variants = ({ t, formPropsData }) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [activeVariant, setActiveVariant] = useState({});
  const [showModalPrice, setShowModalPrice] = useState(false);
  const [showModalFields, setShowModalFields] = useState(false);

  const [optionVariants, setOptionVariants] = useState([]);

  const handleOptionToArr = () => {
    let filteredOptionVariants = optionVariants.filter(
      (item) => item?.options && item.options.length > 0
    );

    return recursive([], [], filteredOptionVariants).map((item, index) => {
      let variant = {};
      if (formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.VARIANTS]) {
        variant = formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.VARIANTS]?.find((x) => {
          return Object.keys(item).every((option) => {
            if (x[option] === item[option]) {
              return true;
            }
            return false;
          });
        });
      }
      let skuParams = formPropsData.quickSKU
        ? formPropsData.quickSKU + '-' + index
        : variant?.custom_fields?.sku
        ? variant?.custom_fields?.sku
        : 'SKU-PRODUCT' + '-' + index;
      return {
        ...item,
        price: formPropsData.quickPrice
          ? formPropsData.quickPrice
          : variant?.price
          ? variant?.price
          : 0,
        sku: skuParams,
        field: 'Edit',
        property_values: item,
        custom_fields: {
          ...formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS],
          sku: skuParams,
        },
      };
    });
  };

  let filterSetArr = handleOptionToArr();

  const dataTable = React.useMemo(
    () => filterSetArr,
    [filterSetArr, formPropsData.quickPrice, formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.VARIANTS]]
  );
  const headerClass = 'py-15 border text-center text-gray bg-gray-300 fw-semibold';
  const cellClass = 'd-flex align-items-center justify-content-center';
  const columnsTable = React.useMemo(
    () => [
      ...optionVariants.map((item) => {
        return {
          Header: item.name.toUpperCase(),
          accessor: item.value_name,
          className: headerClass,
          enableRowSpan: true,
          Cell: ({ value }) => {
            return <div className={cellClass}>{value}</div>;
          },
        };
      }),
      // {
      //   Header: 'IMAGE',
      //   accessor: 'image',
      //   className: headerClass,
      //   Cell: ({ value }) => {
      //     return <div className={cellClass}>{value}</div>;
      //   },
      // },
      {
        Header: () => (
          <>
            PRICE (VND) <span className="text-danger">*</span>
          </>
        ),
        accessor: 'price',
        className: headerClass,
        Cell: ({ row, value }) => {
          return (
            <div className={cellClass}>
              <Input
                field={{
                  getValueSelected: value,
                  classNameInput: 'fs-14 me-1 border-0 price-input text-end px-0',
                  handleChange: (event) => {
                    formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.VARIANTS][row.index].price =
                      event.target.value;
                  },
                }}
              />
              <div
                className="cursor-pointer"
                onClick={() => {
                  setActiveVariant(row);
                  setShowModalPrice(true);
                }}
              >
                <ComponentSVG url="/assets/images/plus-circle.svg" className={`bg-success ms-0`} />
              </div>
            </div>
          );
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
        Cell: ({ row, value }) => {
          return (
            <div className={cellClass}>
              <Input
                field={{
                  getValueSelected: value,
                  classNameInput: 'fs-14 me-1 border-0 price-input px-0 w-100 text-center',
                  handleChange: (event) => {
                    formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.VARIANTS][
                      row.index
                    ].custom_fields.sku = event.target.value;
                  },
                }}
              />
            </div>
          );
        },
      },
      {
        Header: 'FIELD',
        accessor: 'field',
        className: headerClass,
        Cell: ({ row, value }) => {
          return (
            <div
              className={`${cellClass} text-success cursor-pointer`}
              onClick={() => {
                setActiveVariant(row);
                setShowModalFields(true);
              }}
            >
              {value}
            </div>
          );
        },
      },
    ],
    [filterSetArr]
  );

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
                        getValueSelected: variant.name,
                        classNameInput: 'fs-14',
                        placeholder: t('txt_type'),
                        handleChange: (event) => {
                          optionVariants[key] = {
                            name: event.target.value,
                            value_name: event.target.value,
                          };
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
                        handleChange: async (data) => {
                          Object.assign(optionVariants[key], {
                            options: data,
                          });
                          if (optionVariants[key].name && optionVariants[key].options.length) {
                            formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.VARIANTS] =
                              handleOptionToArr();
                          }
                          forceUpdate();
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

  return (
    <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
      <h3 className="mb-16 fw-bold">{t('txt_product_variant')}</h3>
      <Form.Group className={`mb-24`}>
        <FormRadio
          field={{
            key: 'variant_select',
            checkbox: true,
            getDataSelectOptions: [
              {
                label: t('txt_use_product_attribute'),
                value: 'yes',
              },
            ],
            handleChange: (data) => {
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
          setOptionVariants([
            ...optionVariants,
            { name: '', value_name: Math.random().toString(), options: [] },
          ]);
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
                getValueSelected: formPropsData.quickPrice ?? numberWithCommas(7000000),
                classNameInput: 'fs-14',
                placeholder: t('txt_type'),
                format: 'VND',
                handleChange: (event) => {
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
                getValueSelected: formPropsData.quickSKU ?? 'SKU-PRODUCT',
                classNameInput: 'fs-14',
                placeholder: t('txt_type'),
                handleChange: (event) => {
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
              forceUpdate();
              formPropsData.quickPrice = formPropsData.quickPrice ?? numberWithCommas(7000000);
              formPropsData.quickSKU = formPropsData.quickSKU ?? 'SKU-PRODUCT';
              formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.VARIANTS] = dataTable.map((variant) => {
                return {
                  ...variant,
                };
              });
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
      <ModalVariantsPrice
        dataTable={dataTable}
        optionVariants={optionVariants}
        showModal={showModalPrice}
        setShowModal={setShowModalPrice}
        activeVariant={activeVariant}
        formPropsData={formPropsData}
      />
      <ModalVariantsFields
        dataTable={dataTable}
        optionVariants={optionVariants}
        showModal={showModalFields}
        setShowModal={setShowModalFields}
        activeVariant={activeVariant}
        formPropsData={formPropsData}
      />
    </div>
  );
};

const recursive = (oldArrs, oldItem, arrays) => {
  let test = oldArrs;
  if (arrays && arrays?.length > 0) {
    if (arrays[0].options.length) {
      arrays[0].options.forEach((b) => {
        if (arrays?.length === 1 && arrays[0].name) {
          test.push({
            ...oldItem,
            [arrays[0].value_name]: b.label,
          });
        }
        recursive(test, { ...oldItem, [arrays[0].value_name]: b.label }, arrays.slice(1));
      });
    }
  }
  return test;
};

export default withTranslation('common')(Variants);
