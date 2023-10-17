import { CustomerGroupApiService, CustomerGroupItemModel } from 'aesirx-lib';

class CustomerGroupStore {
  async getList(filters) {
    try {
      const getListAPIService = new CustomerGroupApiService();
      const respondedData = await getListAPIService.getList(filters);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getListWithoutPagination() {
    try {
      const getListAPIService = new CustomerGroupApiService();
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
        const getDetailInfoAPIService = new CustomerGroupApiService();

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
        CustomerGroupItemModel.__transformItemToApiOfCreation(createFieldData);
      let resultOnSave;
      const createOrganizationApiService = new CustomerGroupApiService();

      // eslint-disable-next-line prefer-const
      resultOnSave = await createOrganizationApiService.create(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async update(updateFieldData) {
    try {
      const convertedUpdateGeneralData =
        CustomerGroupItemModel.__transformItemToApiOfUpdation(updateFieldData);

      let resultOnSave;
      const updateOrganizationApiService = new CustomerGroupApiService();
      // eslint-disable-next-line prefer-const
      resultOnSave = await updateOrganizationApiService.update(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async delete(arr) {
    try {
      const aesirxOrganizationApiService = new CustomerGroupApiService();
      const respondedData = await aesirxOrganizationApiService.delete(arr);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }
}

export { CustomerGroupStore };
