/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const customStyles = (isBorder, plColor, arrowColor, creatable, isDisabled) => {
  return {
    control: (provided) => {
      return {
        ...provided,
        minHeight: creatable ? 110 : 40,
        height: '100%',
        alignItems: creatable ? 'start' : 'center',
        boxShadow: 'none',
        borderRadius: '5px',
        borderColor: isBorder ? 'var(--border-color)' : 'transparent',
        '&:hover': {
          // borderColor: isBorder ? '#8bdcbc' : 'transparent',
          // borderRight: '1px solid var(--border-color)',
        },
        // borderRight: '1px solid var(--border-color)',
        backgroundColor: isDisabled ? 'var(--border-color)' : '#ffffff',
        cursor: 'pointer',
        width: 'auto',
      };
    },

    menu: (styles) => {
      return {
        ...styles,
        top: 'calc(100% - 5px)',
        margin: 0,
        border: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderLeft: '1px solid var(--border-color)',
        borderRight: '1px solid var(--border-color)',
        boxShadow: '0 3px 5px rgb(0 0 0 / 5%)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        zIndex: 10,
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected ? 'var(--dropdown-item-hover-color)' : 'var(--dropdown-item-color)',
        backgroundColor: state.isSelected ? 'var(--dropdown-item-hover-bg)' : 'var(--dropdown-bg)',
        '&:hover': {
          color: 'var(--dropdown-item-color)',
          backgroundColor: 'var(--dropdown-item-hover-bg)',
        },
      };
    },
    indicatorSeparator: () => ({ display: 'none' }),

    dropdownIndicator: (base) => ({
      ...base,
      color: arrowColor ? arrowColor : 'var(--bs-success)',
      '&:hover': {
        color: 'var(--bs-success)',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--body-color)',
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: plColor ? plColor : 'var(--input-placeholder-color)',
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: '#EBEBEB',
        margin: '8px 8px 8px 2px',
        borderRadius: '5px',
      };
    },
    multiValueRemove: (styles) => ({
      ...styles,
      paddingLeft: '12px',
      paddingRight: '8px',
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--body-color)',
      backgroundColor: '#EBEBEB',
      order: 2,
      padding: '10px 16px 10px 0',
      fontSize: '14px',
    }),
  };
};

export default customStyles;
