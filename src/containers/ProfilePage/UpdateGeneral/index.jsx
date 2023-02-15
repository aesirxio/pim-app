/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { observer } from 'mobx-react';
import { Component } from 'react';

import { Storage } from 'aesirx-dma-lib';
import 'react-datepicker/dist/react-datepicker.css';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import FormComponent from '../../../components/Form';
import Spinner from '../../../components/Spinner';
import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { UPDATE_GENERAL_FIELD_KEY } from '../../../constants/ProfileModule';
import '../index.scss';
import SubmitButton from '../Layout/SubmitButton';
import { witheProfileViewModel } from '../ProfileViewModel/ProfileViewModelContextProvider';
import AvatarDAM from '../Layout/AvatarDAM';
import { Col, Row } from 'react-bootstrap';

const UpdateGeneral = observer(
  class UpdateGeneral extends Component {
    updateGeneralViewModel = null;
    formPropsData = {
      [UPDATE_GENERAL_FIELD_KEY.ID]: Storage.getItem('member_id'),
      [UPDATE_GENERAL_FIELD_KEY.USERNAME]: '',
      [UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM]: '',
      [UPDATE_GENERAL_FIELD_KEY.FULLNAME]: '',
      [UPDATE_GENERAL_FIELD_KEY.EMAIL]: '',
      [UPDATE_GENERAL_FIELD_KEY.BIRTHDAY]: '',
      [UPDATE_GENERAL_FIELD_KEY.PHONE]: '',
      [UPDATE_GENERAL_FIELD_KEY.ADDRESS]: '',
      [UPDATE_GENERAL_FIELD_KEY.ADDRESS_2]: '',
      [UPDATE_GENERAL_FIELD_KEY.ZIPCODE]: '',
      [UPDATE_GENERAL_FIELD_KEY.CITY]: '',
      [UPDATE_GENERAL_FIELD_KEY.STATE]: '',
      [UPDATE_GENERAL_FIELD_KEY.COUNTRY]: '',
      [UPDATE_GENERAL_FIELD_KEY.TIMEZONE]: '',
      [UPDATE_GENERAL_FIELD_KEY.ORGANIZATION]: '',
    };

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        getUrlImage: '',
      };
      this.validator = new SimpleReactValidator();
      const { viewModel } = props;
      this.updateGeneralViewModel = viewModel ? viewModel.getUpdateGeneralViewModel() : null;
      this.updateGeneralViewModel.setAllValue(this);
      this.validateInfoBeforeSending = this.validateInfoBeforeSending.bind(this);
      this.handleDamAssets = this.handleDamAssets.bind(this);
      this.updateGeneralViewModel.setForm(this);
    }

    componentDidMount() {
      this.updateGeneralViewModel.initializeData();
    }

    handleDamAssets(data) {
      if (data[0].extension !== 'mp4') {
        this.setState({
          getUrlImage: data,
        });
        this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM] = data[0].url;
      }
    }

    saveGeneralHandler = () => {
      this.updateGeneralViewModel.saveGeneralInformationOnPage();
    };

    blurringFieldHandler = () => {
      this.validator.hideMessageFor('password');
    };

    validateInfoBeforeSending = () => {
      if (this.validator.allValid()) {
        this.setState({ loading: true });
        this.saveGeneralHandler();
      } else {
        this.validator.showMessages();
        this.forceUpdate();
        return false;
      }
    };

    clearImage = (defaultImage) => {
      this.setState({
        getUrlImage: '',
      });
      this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM] = defaultImage;
    };

    generateFormSetting = () => {
      return [
        {
          fields: [
            {
              label: 'txt_organization',
              key: UPDATE_GENERAL_FIELD_KEY.ORGANIZATION,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ORGANIZATION],
              className: 'col-lg-6',
              readOnly: true,
            },
            {
              label: 'txt_username',
              key: UPDATE_GENERAL_FIELD_KEY.USERNAME,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.USERNAME],
              className: 'col-lg-6',
              readOnly: true,
            },
            {
              label: 'txt_Email',
              key: UPDATE_GENERAL_FIELD_KEY.EMAIL,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.EMAIL],
              className: 'col-lg-6',
              readOnly: true,
            },

            {
              label: 'txt_fullname',
              key: UPDATE_GENERAL_FIELD_KEY.FULLNAME,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME],
              className: 'col-lg-6',
              handleChange: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME] = event.target.value;
              },
            },
            {
              label: 'txt_Phone',
              key: UPDATE_GENERAL_FIELD_KEY.PHONE,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.PHONE],
              className: 'col-lg-6',
              handleChange: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.PHONE] = event.target.value;
              },
            },
          ],
        },
      ];
    };

    avatarOnSelectHandler = (data) => {
      if (data.split(/[#?]/)[0].split('.').pop().trim() !== 'mp4') {
        this.setState({
          getUrlImage: data,
        });
        this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM] = data;
      }
    };

    render() {
      const { memberInfo } = this.updateGeneralViewModel;
      return (
        <>
          {!memberInfo ? (
            <Spinner />
          ) : (
            <>
              <Row>
                <Col lg={9}>
                  <FormComponent
                    formClassName={'row'}
                    generateFormSetting={() => this.generateFormSetting()}
                    formPropsData={this.formPropsData}
                    viewModel={this.updateGeneralViewModel}
                    key={Math.random(40, 200)}
                  />
                </Col>
                <Col lg={3}>
                  <AvatarDAM
                    formPropsData={this.formPropsData}
                    avatarOnSelectHandler={this.avatarOnSelectHandler}
                  />
                </Col>
              </Row>
              <SubmitButton validateInfoBeforeSending={this.validateInfoBeforeSending} />
            </>
          )}
        </>
      );
    }
  }
);

export default withTranslation('common')(witheProfileViewModel(UpdateGeneral));
