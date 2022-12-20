/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const PIM_PRODUCT_DETAIL_FIELD_KEY = {
  ID: 'id',
  SKU: 'sku',
  TITLE: 'title',
  PUBLISHED: 'published',
  FEATURED: 'featured',
  CATEGORY_ID: 'category_id',
  CATEGORY_NAME: 'category_name',
  RELATED_CATEGORIES: 'related_categories',
  CUSTOM_FIELDS: 'custom_fields',
  ALIAS: 'alias',
  ORGANISATION: 'organisation',
  SALE_MARKET_ID: 'sale_market_id',
  SALE_MARKET_NAME: 'sale_market_name',
  TEMPLATE: 'template',
  TAGS: 'tags',
  PUBLISHED_UP: 'publish_up',
  CREATED_USER_NAME: 'created_user_name',
  MODIFIED_USER_NAME: 'modified_user_name',
  PIM_PRODUCT_TYPE: 'pim_product_type',
  CREATED_TIME: 'created_time',
  PUBLISH_UP: 'publish_up',
  VARIANTS: 'variants',
  DESCRIPTION: 'description',
  SHORT_DESCRIPTION: 'short_description',
};

const PIM_CATEGORY_DETAIL_FIELD_KEY = {
  ID: 'id',
  TITLE: 'title',
  ALIAS: 'alias',
  PUBLISHED: 'published',
  FEATURED: 'featured',
  PARENT_ID: 'parent_id',
  RELATED_CATEGORIES: 'related_categories',
  ORGANISATION_ID: 'organisation_id',
  CUSTOM_FIELDS: 'custom_fields',
  ORGANISATION: 'organisation',
  CREATED_USER_NAME: 'created_user_name',
  MODIFIED_USER_NAME: 'modified_user_name',
  CREATED_TIME: 'created_time',
  PUBLISH_UP: 'publish_up',
  CHILDREN: 'children',
  LEVEL: 'level',
};

const PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY = {
  ID: 'id',
  TITLE: 'title',
  PUBLISHED: 'published',
  FEATURED: 'featured',
  CUSTOM_FIELDS: 'custom_fields',
  CREATED_USER_NAME: 'created_user_name',
  MODIFIED_USER_NAME: 'modified_user_name',
  CREATED_TIME: 'created_time',
  PUBLISH_UP: 'publish_up',
};

const PIM_TAG_DETAIL_FIELD_KEY = {
  ID: 'id',
  TITLE: 'title',
  ALIAS: 'alias',
  PUBLISHED: 'published',
  FEATURED: 'featured',
  PARENT_ID: 'parent_id',
  ORGANISATION_ID: 'organisation_id',
  CUSTOM_FIELDS: 'custom_fields',
  ORGANISATION: 'organisation',
  CREATED_USER_NAME: 'created_user_name',
  CREATED_TIME: 'created_time',
  PUBLISH_UP: 'publish_up',
};

const PIM_FIELD_DETAIL_FIELD_KEY = {
  ID: 'id',
  NAME: 'name',
  PUBLISHED: 'published',
  FEATURED: 'featured',
  CUSTOM_FIELDS: 'custom_fields',
  CREATED_USER_NAME: 'created_user_name',
  MODIFIED_USER_NAME: 'modified_user_name',
  CREATED_TIME: 'created_time',
  PUBLISH_UP: 'publish_up',
  FIELD_GROUP_ID: 'field_group_id',
  FIELD_GROUP_NAME: 'field_group_name',
  TYPE: 'type',
  SECTION: 'content_types',
  FIELD_CODE: 'fieldcode',
  PARAMS: 'params',
  OPTIONS: 'options',
  RELEVANCE: 'relevance',
  UNIQUE: 'unique',
};

const PIM_FIELD_GROUP_DETAIL_FIELD_KEY = {
  ID: 'id',
  NAME: 'name',
  PUBLISHED: 'published',
  FEATURED: 'featured',
  CREATED_USER_NAME: 'created_user_name',
  MODIFIED_USER_NAME: 'modified_user_name',
  CREATED_TIME: 'created_time',
  PUBLISH_UP: 'publish_up',
  ALIAS: 'alias',
  DESCRIPTION: 'description',
  SECTION: 'content_types',
};

const PIM_PRICE_FIELD_KEY = {
  ID: 'id',
  PUBLISHED: 'published',
  CREATED_USER_NAME: 'created_user_name',
  MODIFIED_TIME: 'modified_time',
  CUSTOM_FIELDS: 'custom_fields',
  PRODUCTS: 'products',
  PRICE: 'price',
  RETAIL_PRICE: 'retail_price',
};

export {
  PIM_PRODUCT_DETAIL_FIELD_KEY,
  PIM_CATEGORY_DETAIL_FIELD_KEY,
  PIM_TAG_DETAIL_FIELD_KEY,
  PIM_FIELD_DETAIL_FIELD_KEY,
  PIM_PRICE_FIELD_KEY,
  PIM_FIELD_GROUP_DETAIL_FIELD_KEY,
  PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY,
};
