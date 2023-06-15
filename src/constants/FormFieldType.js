/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const FORM_FIELD_TYPE = {
  INPUT: 'text',
  TEXTAREA: 2,
  CHECKBOX: 'checkbox',
  NUMBER: 'number',
  DROPDOWN: 5,
  IMAGE: 'aesir_dam_asset',
  DATE: 'date',
  CALENDAR: 'calendar',
  DATERANGE: 8,
  SELECTION: 'select',
  LIST: 'list',
  SELECTION_FIELDS: 'select_fields',
  TAB: 10,
  PASSWORD: 11,
  CANVA: 12,
  LABELCARD: 13,
  INFORMATION: 14,
  LABELBTN: 15,
  SELECTIONPERSONA: 16,
  DESCRIPTION: 17,
  DAM: 18,
  BIRTHDAY: 19,
  PRICE: 20,
  RADIO: 'radio',
  AGE: 22,
  LOCATION: 23,
  TIMEZONE: 24,
  EDITOR: 'editor',
  VIDEO: 26,
  CATEGORY_RELATED: 'category_related',
  ITEM_RELATED: 'item_related',
  COLOR: 'color',
  REDITEM_TYPE: 'reditem.type',
  REDITEM_CATEGORY: 'reditem.category',
  RICATEGORIESTREE: 'ricategoriestree',
  REDITEM_CUSTOMFIELD: 'reditem.customfield',
};

const FORMAT_DATE = 'dd MMM, yyyy';
const FORMAT_DATE_TIME_UPDATE_POST = 'YYYY-MM-DD HH:mm:ss';
const FORMAT_DATE_UPDATE_POST = 'YYYY-MM-DD';
const FORMAT_TIME = 'HH:mm:ss';

export {
  FORM_FIELD_TYPE,
  FORMAT_DATE,
  FORMAT_DATE_TIME_UPDATE_POST,
  FORMAT_DATE_UPDATE_POST,
  FORMAT_TIME,
};
