import { ProductFieldValueApiService, ProductFieldValueItemModel } from 'aesirx-lib';

class ProductFieldValueStore {
  async getList(filters) {
    try {
      const getListAPIService = new ProductFieldValueApiService();
      const respondedData = await getListAPIService.getList(filters);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getListWithoutPagination() {
    try {
      const getListAPIService = new ProductFieldValueApiService();
      const respondedData = await getListAPIService.getList({ 'list[limit]': 9999 });

      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getDetail(id) {
    if (!id) return { error: false, response: false };

    try {
      const results = true;

      if (results) {
        const getDetailInfoAPIService = new ProductFieldValueApiService();

        const respondedData = await getDetailInfoAPIService.getDetail(id);

        return { error: false, response: respondedData };
      }
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async create(createFieldData) {
    try {
      const convertedUpdateGeneralData =
        ProductFieldValueItemModel.__transformItemToApiOfCreation(createFieldData);
      let resultOnSave;
      const createProductFieldValueApiService = new ProductFieldValueApiService();

      // eslint-disable-next-line prefer-const
      resultOnSave = await createProductFieldValueApiService.create(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async update(updateFieldData) {
    try {
      const convertedUpdateGeneralData =
        ProductFieldValueItemModel.__transformItemToApiOfUpdation(updateFieldData);

      let resultOnSave;
      const updateProductFieldValueApiService = new ProductFieldValueApiService();
      // eslint-disable-next-line prefer-const
      resultOnSave = await updateProductFieldValueApiService.update(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async delete(arr) {
    try {
      const aesirxProductFieldValueApiService = new ProductFieldValueApiService();
      const respondedData = await aesirxProductFieldValueApiService.deleteFields(arr);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }
}

export { ProductFieldValueStore };
