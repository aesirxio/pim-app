/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxMemberApiService from 'aesirx-dma-lib/src/Member/Member';
import { ProductDetailModel } from 'library/Pim/PimModel';
import { runInAction } from 'mobx';

export default class ProductStore {
  async updateProduct(updateProductData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        ProductDetailModel.__transformItemToApiOfUpdation(updateProductData);

      let resultOnSave;
      const updateProductApiService = new AesirxMemberApiService();

      resultOnSave = await updateProductApiService.updateMember(convertedUpdateGeneralData);

      if (resultOnSave.result.success) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave);
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getDetail(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const getDetailInfoAPIService = new AesirxMemberApiService();
        const respondedData = await getDetailInfoAPIService.getDetailInfo(id);
        if (respondedData) {
          runInAction(() => {
            callbackOnSuccess(respondedData);
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getDetailProduct(id) {
    if (!id) return false;

    try {
      const getDetailInfoAPIService = new AesirxMemberApiService();
      const respondedData = await getDetailInfoAPIService.getDetailInfo(id);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }
}
