/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import CreatableSelect from 'react-select/creatable';
import customStyles from './customStyles';
import { ThemesContext } from 'themes/ThemeContextProvider';
import { withTranslation } from 'react-i18next';

class CreatableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      inputValue: '',
    };
  }

  createOption = (label) => ({
    label,
    value: label,
  });
  handleKeyDown = (event) => {
    if (!this.state.inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        this.setState((prevState) => {
          return {
            ...prevState,
            inputValue: '',
            value: [...prevState.value, this.createOption(this.state.inputValue)],
          };
        });
        event.preventDefault();
    }
  };

  componentDidMount() {}
  render() {
    const { t } = this.props;
    const { theme } = this.context;
    let { isBorder, plColor, placeholder, arrowColor } = this.props;
    let creatable = true;
    if (theme == 'dark') {
      plColor = '#bfc9f7';
    }
    let styles = customStyles(isBorder, plColor, arrowColor, creatable);

    return (
      <CreatableSelect
        {...this.props}
        components={{
          DropdownIndicator: null,
        }}
        styles={styles}
        inputValue={this.state.inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        placeholder={placeholder ?? t('txt_type')}
        onChange={(newValue) =>
          this.setState((prevState) => {
            return {
              ...prevState,
              value: newValue,
            };
          })
        }
        onInputChange={(newValue) =>
          this.setState((prevState) => {
            return {
              ...prevState,
              inputValue: newValue,
            };
          })
        }
        onKeyDown={this.handleKeyDown}
        value={this.state.value}
      />
    );
  }
}

CreatableComponent.contextType = ThemesContext;
export default withTranslation('common')(CreatableComponent);
