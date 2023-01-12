/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Suspense, useEffect } from 'react';

import { Route, Redirect } from 'react-router-dom';
import { authRoutes } from '../../routes/routes';
import Spinner from '../../components/Spinner';

import { isLogin } from '../../auth';

import { useThemeContext } from 'themes/ThemeContextProvider';
const AuthLayout = () => {
  const { changeTheme } = useThemeContext();
  useEffect(() => {
    changeTheme();
  }, []);

  return isLogin() ? (
    <Redirect to="/" />
  ) : (
    <div className="container-fluid">
      <div className="row">
        <main>
          <Suspense fallback={<Spinner />}>
            {authRoutes.map(({ path, exact, main }, i) => {
              return <Route key={i} exact={exact} path={path} component={main} />;
            })}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
