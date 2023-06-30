import { FilteringFieldApiService, FilteringFieldItemModel } from 'aesirx-lib';

class FilteringFieldStore {
  async getList(filters) {
    try {
      const getListAPIService = new FilteringFieldApiService();
      const respondedData = await getListAPIService.getList(filters);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getListWithoutPagination(filters) {
    try {
      const getListAPIService = new FilteringFieldApiService();
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
        const getDetailInfoAPIService = new FilteringFieldApiService();

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
        FilteringFieldItemModel.__transformItemToApiOfCreation(createFieldData);
      let resultOnSave;
      const createFilteringFieldApiService = new FilteringFieldApiService();

      // eslint-disable-next-line prefer-const
      resultOnSave = await createFilteringFieldApiService.create(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async update(updateFieldData) {
    try {
      const convertedUpdateGeneralData =
        FilteringFieldItemModel.__transformItemToApiOfUpdation(updateFieldData);

      let resultOnSave;
      const updateFilteringFieldApiService = new FilteringFieldApiService();
      // eslint-disable-next-line prefer-const
      resultOnSave = await updateFilteringFieldApiService.update(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async delete(arr) {
    try {
      const aesirxFilteringFieldApiService = new FilteringFieldApiService();
      const respondedData = await aesirxFilteringFieldApiService.deleteFields(arr);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }
}

export { FilteringFieldStore };
