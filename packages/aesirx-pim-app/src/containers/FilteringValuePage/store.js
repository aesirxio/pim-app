import { FilteringValueApiService, FilteringValueItemModel } from 'aesirx-lib';

class FilteringValueStore {
  async getList(filters) {
    try {
      const getListAPIService = new FilteringValueApiService();
      const respondedData = await getListAPIService.getList(filters);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getListWithoutPagination(filters) {
    try {
      const getListAPIService = new FilteringValueApiService();
      const respondedData = await getListAPIService.getList({ ...filters, 'list[limit]': 9999 });

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
        const getDetailInfoAPIService = new FilteringValueApiService();

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
        FilteringValueItemModel.__transformItemToApiOfCreation(createFieldData);
      let resultOnSave;
      const createFilteringValueApiService = new FilteringValueApiService();

      // eslint-disable-next-line prefer-const
      resultOnSave = await createFilteringValueApiService.create(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async update(updateFieldData) {
    try {
      const convertedUpdateGeneralData =
        FilteringValueItemModel.__transformItemToApiOfUpdation(updateFieldData);

      let resultOnSave;
      const updateFilteringValueApiService = new FilteringValueApiService();
      // eslint-disable-next-line prefer-const
      resultOnSave = await updateFilteringValueApiService.update(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async delete(arr) {
    try {
      const aesirxFilteringValueApiService = new FilteringValueApiService();
      const respondedData = await aesirxFilteringValueApiService.deleteFields(arr);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }
}

export { FilteringValueStore };
