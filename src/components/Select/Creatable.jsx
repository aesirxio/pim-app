/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import customStyles from './customStyles';
import { ThemesContext } from 'themes/ThemeContextProvider';
import { withTranslation } from 'react-i18next';
import ComponentSVG from 'components/ComponentSVG';

class CreatableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue ?? [],
      inputValue: '',
    };
  }

  createOption = (label) => ({
    label,
    value: label,
  });
  handleKeyDown = async (event) => {
    if (!this.state.inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        await this.setState((prevState) => {
          return {
            ...prevState,
            inputValue: '',
            value: [...prevState.value, this.createOption(this.state.inputValue)],
          };
        });
        this.props.onChange(this.state.value);

        event.preventDefault();
    }
  };

  componentDidMount() {}
  render() {
    const { t } = this.props;
    const { theme } = this.context;
    let { isBorder, plColor, placeholder, arrowColor, onChange } = this.props;
    let creatable = true;
    if (theme == 'dark') {
      plColor = '#bfc9f7';
    }
    let styles = customStyles(isBorder, plColor, arrowColor, creatable);

    const ClearIndicator = (props) => {
      const {
        children = <div className="text-danger">{t('txt_remove_all')}</div>,
        getStyles,
        innerProps: { ref, ...restInnerProps },
      } = props;
      return (
        <div
          {...restInnerProps}
          ref={ref}
          style={{
            ...getStyles('clearIndicator', props),
            position: 'absolute',
            top: '-38px',
            right: '0',
            paddingRight: 0,
          }}
        >
          <div style={{ padding: '0px 5px' }}>{children}</div>
        </div>
      );
    };

    const MultiValueRemove = (props) => {
      return (
        <components.MultiValueRemove {...props}>
          {' '}
          <ComponentSVG url="/assets/images/cancel.svg" color="#C0C0C0" />
        </components.MultiValueRemove>
      );
    };

    return (
      <CreatableSelect
        {...this.props}
        components={{
          ClearIndicator,
          MultiValueRemove,
          DropdownIndicator: null,
        }}
        styles={styles}
        inputValue={this.state.inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        placeholder={placeholder ?? t('txt_type_something_and_press_enter')}
        onChange={(newValue) => {
          onChange(newValue);
          return this.setState((prevState) => {
            return {
              ...prevState,
              value: newValue,
            };
          });
        }}
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
