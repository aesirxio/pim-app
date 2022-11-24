/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

// import { isLogin } from 'auth';

import React, { lazy } from 'react';
// import { Redirect } from 'react-router-dom';

const LoginPage = lazy(() => import('../containers/LoginPage'));

const WelcomePage = lazy(() => import('../containers/WelcomePage'));
const DashboardPage = lazy(() => import('../containers/Dashboard'));
const AudiencePage = lazy(() => import('../containers/AudiencePage'));
const RevenuePage = lazy(() => import('../containers/RevenuePage'));
const BehaviorOverviewPage = lazy(() => import('../containers/Behavior/Overview'));
const BehaviorClickAnchorPage = lazy(() => import('../containers/Behavior/ClickAnchor'));
const UTMTrackingPage = lazy(() => import('../containers/Behavior/UTMTracking'));
const SubscriptionPage = lazy(() => import('../containers/SubscriptionPage'));
const MemberRolesPage = lazy(() => import('../containers/MemberRolesPage'));
const DataStreamPage = lazy(() => import('../containers/DataStreamPage'));
const RegionCountryPage = lazy(() => import('../containers/RegionCountryPage'));
const SettingPage = lazy(() => import('containers/SettingPage'));
const HelpCenterPage = lazy(() => import('containers/HelpCenterPage'));

const ProfilePage = lazy(() => import('../containers/ProfilePage'));

const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage />,
  },
];

const mainRoutes = [
  {
    path: ['/'],
    exact: true,
    main: () => <DashboardPage />,
  },
  {
    path: '/audience/overview',
    exact: true,
    main: () => <AudiencePage />,
  },
  { path: '/revenue', exact: true, main: () => <RevenuePage /> },
  {
    path: '/behavior/overview',
    exact: true,
    main: () => <BehaviorOverviewPage />,
  },
  {
    path: '/behavior/click-anchor',
    exact: true,
    main: () => <BehaviorClickAnchorPage />,
  },
  {
    path: '/behavior/utm-tracking',
    exact: true,
    main: () => <UTMTrackingPage />,
  },
  {
    path: '/subscription',
    exact: true,
    main: () => <SubscriptionPage />,
  },
  {
    path: '/member-roles',
    exact: true,
    main: () => <MemberRolesPage />,
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
];

const settingRoutes = [
  {
    path: '/profile',
    exact: false,
    main: ({ match, location }) => <ProfilePage match={match} location={location} />,
  },
  {
    path: '/welcome',
    exact: true,
    main: () => <WelcomePage />,
  },
];

export { authRoutes, mainRoutes, settingRoutes };
