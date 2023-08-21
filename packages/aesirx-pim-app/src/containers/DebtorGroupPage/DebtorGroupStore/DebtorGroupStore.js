/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxPimDebtorGroupApiService } from 'aesirx-lib';
import { AesirxPimUtilApiService } from 'aesirx-lib';
import { DebtorGroupItemModel } from 'aesirx-lib';

export default class DebtorGroupStore {
  async create(createDebtorGroupData) {
    try {
      const convertedUpdateGeneralData =
        DebtorGroupItemModel.__transformItemToApiOfCreation(createDebtorGroupData);
      let resultOnSave;
      const createDebtorGroupApiService = new AesirxPimDebtorGroupApiService();

      resultOnSave = await createDebtorGroupApiService.create(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async update(updateDebtorGroupData) {
    try {
      const convertedUpdateGeneralData =
        DebtorGroupItemModel.__transformItemToApiOfUpdation(updateDebtorGroupData);

      let resultOnSave;
      const updateDebtorGroupApiService = new AesirxPimDebtorGroupApiService();

      resultOnSave = await updateDebtorGroupApiService.update(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async getDetail(id) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const getDetailInfoAPIService = new AesirxPimDebtorGroupApiService();

        const respondedData = await getDetailInfoAPIService.getDetail(id);

        return { error: false, response: respondedData };
      }
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async getList(filter) {
    try {
      const getListInfoAPIService = new AesirxPimDebtorGroupApiService();
      const respondedData = await getListInfoAPIService.getList(filter);
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async getListPublishStatus() {
    try {
      const getAesirxPimUtilApiService = new AesirxPimUtilApiService();
      const respondedData = await getAesirxPimUtilApiService.getListPublishStatus();
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async updateStatus(arr, status) {
    try {
      const updateStatusAPIService = new AesirxPimDebtorGroupApiService();
      const respondedData = await updateStatusAPIService.updateStatus(arr, status);
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async deleteDebtorGroups(arr) {
    try {
      const getAesirxPimDebtorGroupApiService = new AesirxPimDebtorGroupApiService();
      const respondedData = await getAesirxPimDebtorGroupApiService.deleteDebtorGroups(arr);
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }
}
