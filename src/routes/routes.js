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
import { BrowserRouter } from 'react-router-dom';

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

const mainRoutes = (basename = '/') => {
  return [
    {
      path: ['/'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <DashboardPageProvider />
        </BrowserRouter>
      ),
    },
    {
      path: ['/products', '/products/all'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <ProductsPage />
        </BrowserRouter>
      ),
    },
    {
      path: ['/variants/edit/:id'],
      exact: true,
      main: ({ match }) => (
        <BrowserRouter basename={basename}>
          <EditVariantProvider match={match} />
        </BrowserRouter>
      ),
    },
    {
      path: ['/variants/add'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <EditVariantProvider />
        </BrowserRouter>
      ),
    },

    {
      path: ['/categories', '/categories'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <CategoriesPage />
        </BrowserRouter>
      ),
    },
    {
      path: '/members',
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <MembersPage />
        </BrowserRouter>
      ),
    },
    {
      path: ['/members/edit/:id'],
      exact: true,
      main: ({ match }) => (
        <BrowserRouter basename={basename}>
          <EditMemberProvider match={match} />
        </BrowserRouter>
      ),
    },
    {
      path: ['/members/add'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <EditMemberProvider />
        </BrowserRouter>
      ),
    },
    {
      path: '/data-stream',
      exact: true,
      main: () => <DataStreamPage />,
    },
    {
      path: ['/setting', '/setting/configuration'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <SettingPage />
        </BrowserRouter>
      ),
    },
    {
      path: '/region-country',
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <RegionCountryPage />
        </BrowserRouter>
      ),
    },
    {
      path: '/help-center',
      exact: true,
      main: () => <HelpCenterPage />,
    },
    {
      path: ['/products/edit/:id'],
      exact: true,
      main: ({ match }) => (
        <BrowserRouter basename={basename}>
          <EditProductProvider match={match} />
        </BrowserRouter>
      ),
    },
    {
      path: ['/products/add'],
      exact: true,
      main: () => <EditProductProvider />,
    },
    {
      path: ['/categories/edit/:id'],
      exact: true,
      main: ({ match }) => (
        <BrowserRouter basename={basename}>
          <EditCategoryProvider match={match} />
        </BrowserRouter>
      ),
    },
    {
      path: ['/categories/add'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <EditCategoryProvider />
        </BrowserRouter>
      ),
    },
    {
      path: '/fields',
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <FieldsPage />
        </BrowserRouter>
      ),
    },
    {
      path: ['/fields/edit/:id'],
      exact: true,
      main: ({ match }) => (
        <BrowserRouter basename={basename}>
          <EditFieldProvider match={match} />
        </BrowserRouter>
      ),
    },
    {
      path: ['/fields/add'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <EditFieldProvider />
        </BrowserRouter>
      ),
    },
    {
      path: '/fields-group',
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <FieldsGroupPage />
        </BrowserRouter>
      ),
    },
    {
      path: ['/fields-group/edit/:id'],
      exact: true,
      main: ({ match }) => (
        <BrowserRouter basename={basename}>
          <EditFieldGroupProvider match={match} />
        </BrowserRouter>
      ),
    },
    {
      path: ['/fields-group/add'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <EditFieldGroupProvider />
        </BrowserRouter>
      ),
    },
    {
      path: '/dam',
      exact: true,
      main: () => <DigitalAssetsPage />,
    },
    {
      path: '/debtor-group',
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <DebtorGroupPage />
        </BrowserRouter>
      ),
    },
    {
      path: ['/debtor-group/edit/:id'],
      exact: true,
      main: ({ match }) => (
        <BrowserRouter basename={basename}>
          <EditDebtorGroupProvider match={match} />
        </BrowserRouter>
      ),
    },
    {
      path: ['/debtor-group/add'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <EditDebtorGroupProvider />
        </BrowserRouter>
      ),
    },
    {
      path: ['/prices'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <ProductPrice />
        </BrowserRouter>
      ),
    },
    {
      path: ['/prices/edit/:id'],
      exact: true,
      main: ({ match }) => (
        <BrowserRouter basename={basename}>
          <EditProductPriceProvider match={match} />
        </BrowserRouter>
      ),
    },
    {
      path: ['/prices/add'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <EditProductPriceProvider />
        </BrowserRouter>
      ),
    },
    {
      path: ['/product-types'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <ProductTypePage />
        </BrowserRouter>
      ),
    },
    {
      path: ['/product-types/edit/:id'],
      exact: true,
      main: ({ match }) => (
        <BrowserRouter basename={basename}>
          <EditProductTypeProvider match={match} />
        </BrowserRouter>
      ),
    },
    {
      path: ['/product-types/add'],
      exact: true,
      main: () => (
        <BrowserRouter basename={basename}>
          <EditProductTypeProvider />
        </BrowserRouter>
      ),
    },
  ];
};

const settingRoutes = [
  {
    path: '/profile',
    exact: false,
    main: () => <ProfilePage />,
  },
];

const integrationRoutes = () =>
  mainRoutes('/pim')
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
