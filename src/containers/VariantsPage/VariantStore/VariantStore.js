import { AesirxPimVariantApiService, VariantItemModel } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class VariantStore {
  aesirxPimVariantApiService = null;

  constructor() {
    this.aesirxPimVariantApiService = new AesirxPimVariantApiService();
  }

  async create(data, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData = VariantItemModel.__transformItemToApiOfCreation(data);

      let resultOnSave;

      resultOnSave = await this.aesirxPimVariantApiService.create(convertedUpdateGeneralData);

      if (resultOnSave?.result) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave?.result, 'Created successfully');
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
      return resultOnSave?.result;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
      return 0;
    }
  }

  async update(data, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData = VariantItemModel.__transformItemToApiOfUpdation(data);

      let resultOnSave;

      resultOnSave = await this.aesirxPimVariantApiService.update(convertedUpdateGeneralData);

      if (resultOnSave?.result) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave?.result, 'Updated successfully');
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
      return resultOnSave?.result;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
      return 0;
    }
  }

  async getVariantDetail(id, callbackOnSuccess, callbackOnError) {
    try {
      const respondedData = await this.aesirxPimVariantApiService.getVariantDetail(id);
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
    }
  }
}
