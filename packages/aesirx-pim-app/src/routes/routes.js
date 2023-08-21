/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';
import {
  LoginPage,
  ProfilePage,
  DigitalAssetsPage,
  MembersPage,
  EditMemberProvider,
  history,
} from 'aesirx-uikit';

const DashboardPageProvider = lazy(() => import('../containers/DashboardsPage'));
const EditProductProvider = lazy(() => import('containers/ProductsPage/edit'));
const EditCategoryProvider = lazy(() => import('containers/CategoriesPage/edit'));
const EditFieldProvider = lazy(() => import('containers/FieldsPage/edit'));
const EditFieldGroupProvider = lazy(() => import('containers/FieldsGroupPage/edit'));

const EditDebtorGroupProvider = lazy(() => import('containers/DebtorGroupPage/edit'));
const EditProductPriceProvider = lazy(() => import('containers/ProductPricesPage/edit'));
const EditVariantProvider = lazy(() => import('containers/VariantsPage/edit'));
const ProductsPage = lazy(() => import('../containers/ProductsPage'));
const ProductPrice = lazy(() => import('../containers/ProductPricesPage'));
const CategoriesPage = lazy(() => import('../containers/CategoriesPage'));
const FieldsPage = lazy(() => import('../containers/FieldsPage'));
const DebtorGroupPage = lazy(() => import('../containers/DebtorGroupPage'));
const FieldsGroupPage = lazy(() => import('../containers/FieldsGroupPage'));
const ProductTypePage = lazy(() => import('../containers/ProductTypePage'));
const EditProductTypeProvider = lazy(() => import('containers/ProductTypePage/edit'));
const BrandPage = lazy(() => import('../containers/BrandPage'));
const EditBrandProvider = lazy(() => import('containers/BrandPage/edit'));
const FilteringFieldsetPage = lazy(() => import('../containers/FilteringFieldsetPage'));
const EditFilteringFieldsetProvider = lazy(() => import('containers/FilteringFieldsetPage/edit'));
const FilteringFieldPage = lazy(() => import('../containers/FilteringFieldPage'));
const EditFilteringFieldProvider = lazy(() => import('containers/FilteringFieldPage/edit'));
const FilteringValuePage = lazy(() => import('../containers/FilteringValuePage'));
const EditFilteringValueProvider = lazy(() => import('containers/FilteringValuePage/edit'));
const ProductFieldValuePage = lazy(() => import('../containers/ProductFieldValuePage'));
const EditProductFieldValueProvider = lazy(() => import('containers/ProductFieldValuePage/edit'));
const TypePage = lazy(() => import('../containers/TypePage'));
const EditTypeProvider = lazy(() => import('containers/TypePage/edit'));
const SubTypePage = lazy(() => import('../containers/SubTypePage'));
const EditSubTypeProvider = lazy(() => import('containers/SubTypePage/edit'));

const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage text="PIM" />,
  },
];

const mainRoutes = [
  {
    path: ['/'],
    exact: true,
    main: () => <DashboardPageProvider />,
  },
  {
    path: ['/products', '/products/all'],
    exact: true,
    main: () => <ProductsPage />,
  },
  {
    path: ['/variants/edit/:id'],
    exact: true,
    main: ({ match }) => <EditVariantProvider match={match} />,
  },
  {
    path: ['/variants/add'],
    exact: true,
    main: () => <EditVariantProvider />,
  },

  {
    path: ['/categories', '/categories'],
    exact: true,
    main: () => <CategoriesPage />,
  },
  {
    path: '/members',
    exact: true,
    main: () => <MembersPage />,
  },
  {
    path: ['/members/edit/:id'],
    exact: true,
    main: ({ match }) => <EditMemberProvider match={match} />,
  },
  {
    path: ['/members/add'],
    exact: true,
    main: () => <EditMemberProvider />,
  },
  {
    path: ['/products/edit/:id'],
    exact: true,
    main: ({ match }) => <EditProductProvider match={match} />,
  },
  {
    path: ['/products/add'],
    exact: true,
    main: () => <EditProductProvider />,
  },
  {
    path: ['/categories/edit/:id'],
    exact: true,
    main: ({ match }) => <EditCategoryProvider match={match} />,
  },
  {
    path: ['/categories/add'],
    exact: true,
    main: () => <EditCategoryProvider />,
  },
  {
    path: '/fields',
    exact: true,
    main: () => <FieldsPage />,
  },
  {
    path: ['/fields/edit/:id'],
    exact: true,
    main: ({ match }) => <EditFieldProvider match={match} />,
  },
  {
    path: ['/fields/add'],
    exact: true,
    main: () => <EditFieldProvider />,
  },
  {
    path: '/fields-group',
    exact: true,
    main: () => <FieldsGroupPage />,
  },
  {
    path: ['/fields-group/edit/:id'],
    exact: true,
    main: ({ match }) => <EditFieldGroupProvider match={match} />,
  },
  {
    path: ['/fields-group/add'],
    exact: true,
    main: () => <EditFieldGroupProvider />,
  },
  {
    path: '/dam',
    exact: true,
    main: () => <DigitalAssetsPage />,
  },
  {
    path: '/debtor-group',
    exact: true,
    main: () => <DebtorGroupPage />,
  },
  {
    path: ['/debtor-group/edit/:id'],
    exact: true,
    main: ({ match }) => <EditDebtorGroupProvider match={match} />,
  },
  {
    path: ['/debtor-group/add'],
    exact: true,
    main: () => <EditDebtorGroupProvider />,
  },
  {
    path: ['/prices'],
    exact: true,
    main: () => <ProductPrice />,
  },
  {
    path: ['/prices/edit/:id'],
    exact: true,
    main: ({ match }) => <EditProductPriceProvider match={match} />,
  },
  {
    path: ['/prices/add'],
    exact: true,
    main: () => <EditProductPriceProvider />,
  },
  {
    path: ['/product-types'],
    exact: true,
    main: () => <ProductTypePage />,
  },
  {
    path: ['/product-types/edit/:id'],
    exact: true,
    main: ({ match }) => <EditProductTypeProvider match={match} />,
  },
  {
    path: ['/product-types/add'],
    exact: true,
    main: () => <EditProductTypeProvider />,
  },
  {
    path: ['/brands'],
    exact: true,
    main: () => <BrandPage />,
  },
  {
    path: ['/brands/edit/:id'],
    exact: true,
    main: ({ match }) => <EditBrandProvider match={match} />,
  },
  {
    path: ['/brands/add'],
    exact: true,
    main: () => <EditBrandProvider />,
  },
  {
    path: ['/filtering-fieldset'],
    exact: true,
    main: () => <FilteringFieldsetPage />,
  },
  {
    path: ['/filtering-fieldset/edit/:id'],
    exact: true,
    main: ({ match }) => <EditFilteringFieldsetProvider match={match} />,
  },
  {
    path: ['/filtering-fieldset/add'],
    exact: true,
    main: () => <EditFilteringFieldsetProvider />,
  },
  {
    path: ['/filtering-field'],
    exact: true,
    main: () => <FilteringFieldPage />,
  },
  {
    path: ['/filtering-field/edit/:id'],
    exact: true,
    main: ({ match }) => <EditFilteringFieldProvider match={match} />,
  },
  {
    path: ['/filtering-field/add'],
    exact: true,
    main: () => <EditFilteringFieldProvider />,
  },
  {
    path: ['/filtering-value'],
    exact: true,
    main: () => <FilteringValuePage />,
  },
  {
    path: ['/filtering-value/edit/:id'],
    exact: true,
    main: ({ match }) => <EditFilteringValueProvider match={match} />,
  },
  {
    path: ['/filtering-value/add'],
    exact: true,
    main: () => <EditFilteringValueProvider />,
  },
  {
    path: ['/product-fieldvalue'],
    exact: true,
    main: () => <ProductFieldValuePage />,
  },
  {
    path: ['/product-fieldvalue/edit/:id'],
    exact: true,
    main: ({ match }) => <EditProductFieldValueProvider match={match} />,
  },
  {
    path: ['/product-fieldvalue/add'],
    exact: true,
    main: () => <EditProductFieldValueProvider />,
  },
  {
    path: ['/types'],
    exact: true,
    main: () => <TypePage />,
  },
  {
    path: ['/types/edit/:id'],
    exact: true,
    main: ({ match }) => <EditTypeProvider match={match} />,
  },
  {
    path: ['/types/add'],
    exact: true,
    main: () => <EditTypeProvider />,
  },
  {
    path: ['/subtypes'],
    exact: true,
    main: () => <SubTypePage />,
  },
  {
    path: ['/subtypes/edit/:id'],
    exact: true,
    main: ({ match }) => <EditSubTypeProvider match={match} />,
  },
  {
    path: ['/subtypes/add'],
    exact: true,
    main: () => <EditSubTypeProvider />,
  },
];

const settingRoutes = [
  {
    path: '/profile',
    exact: false,
    main: () => <ProfilePage />,
  },
];

const integrationRoutes = () =>
  mainRoutes
    .filter((item) => item.path !== '/digital-assets')
    .map((item) => {
      if (Array.isArray(item.path)) {
        item.path = item.path.map((path) => '/pim' + path);
      } else {
        item.path = '/pim' + item.path;
      }

      return item;
    });

const historyPush = (link) => {
  return history.push((process.env.REACT_APP_INTERGRATION ? '/pim' : '') + link);
};

export { authRoutes, mainRoutes, settingRoutes, integrationRoutes, historyPush };
