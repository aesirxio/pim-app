import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

const mainMenu = [
  {
    text: 'txt_left_menu_dashboard',
    link: `/`,
    icons: '/assets/images/dashboard.svg',
    icons_color: '/assets/images/dashboard.svg',
  },
  {
    text: 'txt_left_menu_products',
    link: `/products`,
    icons: '/assets/images/products.svg',
    icons_color: '/assets/images/products.svg',
    submenu: [
      {
        text: 'txt_left_menu_all_products',
        link: `/products/all`,
      },
      {
        text: 'txt_left_menu_add_new',
        link: `/products/add`,
      },
      // {
      //   text: 'txt_left_menu_products_variant',
      //   link: `/products/products-variant`,
      // },
    ],
  },
  {
    text: 'txt_left_menu_prices',
    link: `/prices`,
    icons: '/assets/images/price-tag.png',
    icons_color: '/assets/images/price-tag.png',
    submenu: [
      {
        text: 'txt_left_menu_list_prices',
        link: `/prices`,
      },
      {
        text: 'txt_left_menu_debtor_group',
        link: `/debtor-group`,
      },
    ],
  },
  {
    text: 'txt_left_menu_categories',
    link: `/categories`,
    icons: '/assets/images/categories.svg',
    icons_color: '/assets/images/categories.svg',
  },
  {
    text: 'txt_left_menu_product_type',
    link: `/product-types`,
    icons: '/assets/images/product-type.svg',
    icons_color: '/assets/images/product-type.svg',
  },
  {
    text: 'txt_left_menu_brand',
    link: `/brands`,
    icons: '/assets/images/brand.svg',
    icons_color: '/assets/images/brand.svg',
  },
  {
    text: 'txt_left_menu_filtering_fieldset',
    link: `/filtering-fieldset`,
    icons: '/assets/images/filtering-fieldset.svg',
    icons_color: '/assets/images/filtering-fieldset.svg',
  },
  {
    text: 'txt_left_menu_filtering_field',
    link: `/filtering-field`,
    icons: '/assets/images/filtering-field.svg',
    icons_color: '/assets/images/filtering-field.svg',
  },
  {
    text: 'txt_left_menu_filtering_value',
    link: `/filtering-value`,
    icons: '/assets/images/filtering-value.svg',
    icons_color: '/assets/images/filtering-value.svg',
  },
  {
    text: 'txt_left_menu_product_fieldvalue',
    link: `/product-fieldvalue`,
    icons: '/assets/images/product-fieldvalue.svg',
    icons_color: '/assets/images/product-fieldvalue.svg',
  },
  {
    text: 'txt_left_menu_type',
    link: `/types`,
    icons: '/assets/images/type.svg',
    icons_color: '/assets/images/type.svg',
  },
  {
    text: 'txt_left_menu_subtype',
    link: `/subtypes`,
    icons: '/assets/images/subtype.svg',
    icons_color: '/assets/images/subtype.svg',
  },
  {
    text: 'txt_left_menu_tax',
    link: `/tax`,
    icons: '/assets/images/tax.svg',
    icons_color: '/assets/images/tax.svg',
  },
  {
    text: 'txt_left_menu_shipping',
    link: `/shipping-method`,
    icons: '/assets/images/shipping.svg',
    icons_color: '/assets/images/shipping.svg',
    submenu: [
      {
        text: 'txt_left_menu_shipping_method',
        link: `/shipping-method`,
      },
      {
        text: 'txt_left_menu_shipping_zone',
        link: `/shipping-zone`,
      },
      {
        text: 'txt_left_menu_shipping_rate',
        link: `/shipping-rate`,
      },
    ],
  },
  {
    text: 'txt_left_menu_member_list',
    link: `/members`,
    icons: '/assets/images/member-list.svg',
    icons_color: '/assets/images/member-list.svg',
  },
  {
    text: 'txt_left_menu_dam',
    link: `/dam`,
    icons: '/assets/images/data-stream.svg',
    icons_color: '/assets/images/data-stream.svg',
  },
];

const settingMenu = [
  {
    name: 'profile',
    text: 'txt_menu_profile',
    link: '/profile',
    icons_fa: faUser,
  },
];

const profileMenu = [
  {
    key: 1,
    text: 'txt_profile',
    link: '/profile',
  },
];

const menuSetup = [
  {
    text: 'txt_left_menu_fields',
    link: '/fields',
    icons: '/assets/images/fields.svg',
    icons_color: '/assets/images/fields.svg',
  },
  {
    text: 'txt_left_menu_fields_group',
    link: '/fields-group',
    icons: '/assets/images/fields-group.svg',
    icons_color: '/assets/images/fields-group.svg',
  },
];

const integrationMenu = () => {
  return [
    ...mainMenu
      .filter((item) => item.link !== '/dam' && item.link !== '/' && item.link !== '/members')
      .map((item) => {
        item.link = '/pim' + item.link;
        return item;
      }),
    {
      text: 'txt_left_menu_shipping_zone',
      link: `/pim/shipping-zone`,
    },
    {
      text: 'txt_left_menu_shipping_rate',
      link: `/pim/shipping-rate`,
    },
    {
      text: 'txt_left_menu_debtor_group',
      link: `/pim/debtor-group`,
    },
    ...menuSetup.map((item) => {
      item.link = '/pim' + item.link;
      return item;
    }),
  ];
};

export { profileMenu, mainMenu, settingMenu, menuSetup, integrationMenu };
