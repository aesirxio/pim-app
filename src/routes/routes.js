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
} from 'aesirx-uikit';

const DashboardPageProvider = lazy(() => import('../containers/DashboardsPage'));
const DataStreamPage = lazy(() => import('../containers/DataStreamPage'));
const RegionCountryPage = lazy(() => import('../containers/RegionCountryPage'));
const SettingPage = lazy(() => import('containers/SettingPage'));
const HelpCenterPage = lazy(() => import('containers/HelpCenterPage'));
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
    path: ['/variants/add', '/variants/edit/:id'],
    exact: true,
    main: ({ match }) => <EditVariantProvider match={match} />,
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
    path: ['/members/add', '/members/edit/:id'],
    exact: true,
    main: ({ match }) => <EditMemberProvider match={match} />,
  },
  {
    path: '/data-stream',
    exact: true,
    main: () => <DataStreamPage />,
  },
  {
    path: ['/setting', '/setting/configuration'],
    exact: true,
    main: () => <SettingPage />,
  },
  {
    path: '/region-country',
    exact: true,
    main: () => <RegionCountryPage />,
  },
  {
    path: '/help-center',
    exact: true,
    main: () => <HelpCenterPage />,
  },
  {
    path: ['/products/add', '/products/edit/:id'],
    exact: true,
    main: ({ match }) => <EditProductProvider match={match} />,
  },
  {
    path: ['/categories/add', '/categories/edit/:id'],
    exact: true,
    main: ({ match }) => <EditCategoryProvider match={match} />,
  },
  {
    path: '/fields',
    exact: true,
    main: () => <FieldsPage />,
  },
  {
    path: ['/fields/add', '/fields/edit/:id'],
    exact: true,
    main: ({ match }) => <EditFieldProvider match={match} />,
  },
  {
    path: '/fields-group',
    exact: true,
    main: () => <FieldsGroupPage />,
  },
  {
    path: ['/fields-group/add', '/fields-group/edit/:id'],
    exact: true,
    main: ({ match }) => <EditFieldGroupProvider match={match} />,
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
    path: ['/debtor-group/add', '/debtor-group/edit/:id'],
    exact: true,
    main: ({ match }) => <EditDebtorGroupProvider match={match} />,
  },
  {
    path: ['/prices'],
    exact: true,
    main: () => <ProductPrice />,
  },
  {
    path: ['/prices/add', '/prices/edit/:id'],
    exact: true,
    main: ({ match }) => <EditProductPriceProvider match={match} />,
  },
  {
    path: ['/product-types'],
    exact: true,
    main: () => <ProductTypePage />,
  },
  {
    path: ['/product-types/edit/:id', '/product-types/add'],
    exact: true,
    main: ({ match }) => <EditProductTypeProvider match={match} />,
  },
];

const settingRoutes = [
  {
    path: '/profile',
    exact: false,
    main: () => <ProfilePage />,
  },
];

export { authRoutes, mainRoutes, settingRoutes };
