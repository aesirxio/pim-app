// import { PIM_VARIANT_DETAIL_FIELD_KEY } from 'aesirx-lib';
import { notify } from 'aesirx-uikit';
import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';

class VariantDetailViewModel {
  variantStore = null;
  formStatus = PAGE_STATUS.READY;
  formPropsData = {};

  constructor(variantStore) {
    makeAutoObservable(this);
    this.variantStore = variantStore;
  }

  initializeData = async (variantId) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.variantStore.getVariantDetail(
      variantId,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.variantStore.create(
      this.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.variantStore.update(
      this.formPropsData,
      this.callbackOnUpdateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnUpdateSuccessHandler = async (result, message) => {
    await this.variantStore.getVariantDetail(
      result,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (message) {
      notify(message, 'success');
    }
  };

  callbackOnSuccessHandler = (result, message) => {
    if (result) {
      this.formPropsData = result;
      if (message) {
        notify(message, 'success');
      }
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnErrorHandler = (error) => {
    console.log(error);
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.formPropsData[key], value);
      } else {
        this.formPropsData[key] = value;
      }
    }
  };
}

export default VariantDetailViewModel;
