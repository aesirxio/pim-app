import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { withVariantViewModel } from '../VariantViewModel/VariantViewModelContextProvider';

import { Col, Row, Button } from 'react-bootstrap';
import Input from 'components/Form/Input';
import PAGE_STATUS from 'constants/PageStatus';
import Spinner from '../../../components/Spinner';
import EditHeader from 'components/EditHeader';
import SimpleReactValidator from 'simple-react-validator';
import PublishOptions from 'components/PublishOptions';
import ActionsBar from 'components/ActionsBar';
import { PIM_VARIANT_DETAIL_FIELD_KEY } from 'aesirx-lib';
import ComponentSVG from 'components/ComponentSVG';

const EditVariant = observer(
  class EditVariant extends Component {
    viewModel = null;
    isEdit = false;

    constructor(props) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.state = {
        list: [{ id: Math.round(Math.random() * 10000), title: '', price: 0 }],
      };
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.viewModel.initializeData(this.props.match.params?.id);
      }
    }

    handle = () => {
      this.setState({
        list: [...this.state.list, { id: Math.round(Math.random() * 10000), title: '', price: 0 }],
      });
    };

    delete = (id) => {
      const newList = this.state.list.filter((o) => o.id != id);
      this.setState({
        list: newList,
      });
    };

    handleValidateForm() {
      if (this.validator.fields[PIM_VARIANT_DETAIL_FIELD_KEY.TITLE] === true) {
        this.setState((prevState) => {
          return {
            ...prevState,
            key: 'fields',
            requiredField: Math.random(1, 200),
          };
        });
      }
      this.validator.showMessages();
    }

    render() {
      const { t, history } = this.props;
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.viewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_variants')}
              isEdit={this.isEdit}
              redirectUrl={'/variants/all'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      history.push(`/variants/all`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.viewModel.update()
                          : await this.viewModel.create();
                        if (result !== 0) {
                          history.push(`/variants/all`);
                        }
                      } else {
                        this.handleValidateForm();
                      }
                    },
                  },
                  {
                    title: t('txt_save'),
                    validator: this.validator,
                    handle: async () => {
                      if (this.validator.allValid()) {
                        if (this.isEdit) {
                          await this.viewModel.update();
                        } else {
                          let result = await this.viewModel.create();
                          result && history.push(`/variants/edit/${result}`);
                        }
                      } else {
                        this.handleValidateForm();
                      }
                    },
                    icon: '/assets/images/save.svg',
                    variant: 'success',
                  },
                ]}
              />
            </div>
          </div>

          <Row className="gx-24 mb-24">
            <Col xxl={9} lg={8}>
              <Input
                field={{
                  getValueSelected:
                    this.viewModel.formPropsData[PIM_VARIANT_DETAIL_FIELD_KEY.TITLE],
                  classNameInput: 'py-1 fs-4',
                  placeholder: t('txt_add_product_name'),
                  handleChange: (event) => {
                    this.viewModel.formPropsData['title'] = event.target.value;
                  },
                  required: true,
                  blurred: () => {
                    this.validator.showMessageFor(PIM_VARIANT_DETAIL_FIELD_KEY.TITLE);
                  },
                }}
              />
              {this.validator.message(
                PIM_VARIANT_DETAIL_FIELD_KEY.TITLE,
                this.viewModel.formPropsData[PIM_VARIANT_DETAIL_FIELD_KEY.TITLE],
                'required',
                {
                  className: 'text-danger mt-8px',
                }
              )}

              <div className="p-24 bg-white rounded-1 shadow-sm mt-24">
                <h3 className="mb-16 fw-bold">{t('txt_product_variant')}</h3>

                <Row className="align-items-center mt-2">
                  <Col lg={5} className="fw-semibold">
                    {t('txt_value')}
                  </Col>
                  <Col lg={2} className="fw-semibold">
                    {t('txt_remove')}
                  </Col>
                </Row>

                {this.state.list.map((o, index) => {
                  return (
                    <Row key={index} className="align-items-center mt-2">
                      <Col lg={5}>
                        <Input
                          field={{
                            getValueSelected: o.title,
                            classNameInput: 'py-1 fs-14',
                            placeholder: t('txt_title'),
                            handleChange: (event) => {
                              o.title = event.target.value;
                            },
                          }}
                        />
                      </Col>
                      <Col lg={2}>
                        <button
                          className="bg-green-light border-0 h-40 rounded-2 px-1"
                          type={'button'}
                          onClick={() => {
                            this.delete(o.id);
                          }}
                        >
                          <ComponentSVG
                            color={'#1ab394'}
                            url={'/assets/images/cancel.svg'}
                            className={`bg-green`}
                          />
                        </button>
                      </Col>
                    </Row>
                  );
                })}

                <Button
                  active
                  style={{ borderStyle: 'dashed' }}
                  variant={`light`}
                  className={`px-16 fw-semibold d-flex border-green align-items-center rounded-1 mt-3`}
                  onClick={() => {
                    this.handle();
                  }}
                >
                  <ComponentSVG
                    color={'#1ab394'}
                    url={'/assets/images/plus.svg'}
                    className={`light me-1`}
                  />
                  <span>{t('txt_add_more_value')}</span>
                </Button>
              </div>
            </Col>
            <Col xxl={3} lg={4}>
              <PublishOptions
                detailViewModal={this.viewModel}
                formPropsData={this.viewModel.formPropsData}
                isEdit={false}
              />
            </Col>
          </Row>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withVariantViewModel(EditVariant)));
