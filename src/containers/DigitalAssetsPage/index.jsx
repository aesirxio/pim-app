/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { AesirXDam } from 'aesirx-dam-app';
import { useThemeContext } from 'themes/ThemeContextProvider';

function DigitalAssetsPage() {
  const { theme } = useThemeContext();
  return (
    <div className="py-4 px-3 h-100 ">
      <AesirXDam theme={theme?.theme} />
    </div>
  );
}

export default DigitalAssetsPage;
