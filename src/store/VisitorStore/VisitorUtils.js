/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

class VisitorUtils {
  transformVisitorResponseIntoModel = (response) => {
    let transformResponse = response.length
      ? response.map((item) => {
          return { name: item.date, line: item.visits };
        })
      : [];
    return transformResponse;
  };

  transformResponseIntoSearchItems = (response) => {
    return response;
  };
}

const utils = new VisitorUtils();

export default utils;
