import { FilteringFieldsetApiService, FilteringFieldsetItemModel } from 'aesirx-lib';

class FilteringFieldsetStore {
  async getList(filters) {
    try {
      const getListAPIService = new FilteringFieldsetApiService();
      const respondedData = await getListAPIService.getList(filters);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getListWithoutPagination() {
    try {
      const getListAPIService = new FilteringFieldsetApiService();
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
        const getDetailInfoAPIService = new FilteringFieldsetApiService();

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
        FilteringFieldsetItemModel.__transformItemToApiOfCreation(createFieldData);
      let resultOnSave;
      const createFilteringFieldsetApiService = new FilteringFieldsetApiService();

      // eslint-disable-next-line prefer-const
      resultOnSave = await createFilteringFieldsetApiService.create(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async update(updateFieldData) {
    try {
      const convertedUpdateGeneralData =
        FilteringFieldsetItemModel.__transformItemToApiOfUpdation(updateFieldData);

      let resultOnSave;
      const updateFilteringFieldsetApiService = new FilteringFieldsetApiService();
      // eslint-disable-next-line prefer-const
      resultOnSave = await updateFilteringFieldsetApiService.update(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async delete(arr) {
    try {
      const aesirxFilteringFieldsetApiService = new FilteringFieldsetApiService();
      const respondedData = await aesirxFilteringFieldsetApiService.deleteFields(arr);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }
}

export { FilteringFieldsetStore };
