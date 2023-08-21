/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from 'aesirx-uikit';
import { PIM_CATEGORY_DETAIL_FIELD_KEY } from 'aesirx-lib';
import moment from 'moment';
class CategoryListViewModel {
  categoryStore = null;
  formStatus = PAGE_STATUS.READY;
  categoryListViewModel = null;
  items = [];
  filter = {};
  successResponse = {
    state: false,
    content_id: '',
    listPublishStatus: [],
    1: [],
    filters: {
      'list[limit]': 10,
    },
    listCategoriesWithoutPagination: [],
  };

  constructor(categoryStore) {
    makeAutoObservable(this);
    this.categoryStore = categoryStore;
  }

  setForm = (categoryListViewModel) => {
    this.categoryListViewModel = categoryListViewModel;
  };

  initializeData = async () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
    const dataList = await this.categoryStore.getList(this.successResponse.filters);
    runInAction(() => {
      if (!dataList?.error) {
        this.onSuccessHandler(dataList?.response, '');
      } else {
        this.onErrorHandler(dataList?.response);
      }
    });

    const dataListWithoutPagination = await this.categoryStore.getListWithoutPagination();
    runInAction(() => {
      if (!dataListWithoutPagination?.error) {
        this.onSuccessGetCategoriesHandler(dataListWithoutPagination?.response, '');
      } else {
        this.onErrorHandler(dataListWithoutPagination?.response);
      }
    });

    const dataPublish = await this.categoryStore.getListPublishStatus();
    runInAction(() => {
      if (!dataPublish?.error) {
        this.onSuccessHandler(dataPublish?.response, '');
      } else {
        this.onErrorHandler(dataPublish?.response);
      }
    });

    runInAction(() => {
      this.successResponse.state = true;
    });
  };

  initializeDataCustom = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    runInAction(() => {
      this.successResponse.state = false;
    });
    const data = await this.categoryStore.getList(this.filter);
    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandlerCustom(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
      this.successResponse.state = true;
    });
  };
  onSuccessHandlerCustom = (result) => {
    this.items = result.listItems;
    this.formStatus = PAGE_STATUS.READY;
  };

  getListByFilter = async (key, value) => {
    value ? (this.successResponse.filters[key] = value) : delete this.successResponse.filters[key];

    //pagination
    if (key != 'list[limitstart]' && key != 'list[limit]') {
      delete this.successResponse.filters['list[limitstart]'];
    } else {
      if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination?.page >= this.successResponse.pagination?.totalItems
      ) {
        this.successResponse.filters['list[limitstart]'] =
          Math.ceil(this.successResponse.pagination.totalItems / value - 1) * value;
      } else if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination?.page < this.successResponse.pagination?.totalItems
      ) {
        this.successResponse.filters['list[limitstart]'] =
          (this.successResponse.pagination?.page - 1) * value;
      }
    }

    const data = await this.categoryStore.getList(this.successResponse.filters);
    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
      this.successResponse.state = true;
    });
  };

  setPublished = async (id, state = 0) => {
    const dataUpdate = await this.categoryStore.updateCategory({
      id: id.toString(),
      published: state.toString(),
    });
    runInAction(() => {
      if (!dataUpdate?.error) {
        this.onSuccessSetPublished(dataUpdate?.response, 'Updated successfully');
      } else {
        this.onErrorHandler(dataUpdate?.response);
      }
    });

    const data = await this.categoryStore.getList(this.successResponse.filters);
    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
      this.successResponse.state = true;
    });
  };

  updateStatus = async (arr, status = 0) => {
    const res = await this.categoryStore.updateStatus(arr, status);
    runInAction(() => {
      if (!res?.error) {
        this.onSuccessHandler(res?.response, 'Updated successfully');
      } else {
        this.onErrorHandler(res?.response);
      }
      this.successResponse.state = true;
    });
    if (res) {
      const data = await this.categoryStore.getList(this.successResponse.filters);
      runInAction(() => {
        if (!data?.error) {
          this.onSuccessHandler(data?.response, '');
        } else {
          this.onErrorHandler(data?.response);
        }
        this.successResponse.state = true;
      });
    }
  };

  deleteCategories = async (arr) => {
    const res = await this.categoryStore.deleteCategories(arr);
    runInAction(() => {
      if (!res?.error) {
        this.onSuccessHandler(res?.response, 'Deleted successfully');
      } else {
        this.onErrorHandler(res?.response);
      }
      this.successResponse.state = true;
    });
    if (res) {
      const data = await this.categoryStore.getList(this.successResponse.filters);
      runInAction(() => {
        if (!data?.error) {
          this.onSuccessHandler(data?.response, '');
        } else {
          this.onErrorHandler(data?.response);
        }
        this.successResponse.state = true;
      });
    }
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
  };

  onErrorHandler = (error) => {
    Array.isArray(error?._messages) && error?._messages[0]?.message
      ? notify(error?._messages[0]?.message, 'error')
      : error?.message && notify(error?.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error?.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  onSuccessHandler = (result, message) => {
    if (result?.listItems) {
      this.successResponse.listCategories = this.transform(result.listItems);
      this.successResponse.pagination = result.pagination;
      // Need improve response
      this.items = result.listItems;
    }

    if (result?.listPublishStatus) {
      this.successResponse.listPublishStatus = result.listPublishStatus;
    }
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onSuccessSetPublished = async (result, message) => {
    this.successResponse.listCategories = this.successResponse.listCategories.map((o) => {
      if (o.category.id == result) {
        return { ...o, published: { ...o.published, state: !o.published.state } };
      }
      return o;
    });
    if (result && message) {
      notify(message, 'success');
    }
  };

  onSuccessGetCategoriesHandler = (result) => {
    this.successResponse.listCategoriesWithoutPagination = result.listItems.map((o) => {
      let dash = '';
      for (let index = 2; index < o.level; index++) {
        dash += '- ';
      }
      return { value: o.id, label: `${dash}${o.title}` };
    });
  };

  transform = (data) => {
    return data.map((o) => {
      const date = moment(o[PIM_CATEGORY_DETAIL_FIELD_KEY.MODIFIED_TIME]).format('DD MMM, YYYY');
      return {
        category: {
          id: o[PIM_CATEGORY_DETAIL_FIELD_KEY.ID],
          name: o[PIM_CATEGORY_DETAIL_FIELD_KEY.TITLE],
          level: o[PIM_CATEGORY_DETAIL_FIELD_KEY.LEVEL],
        },
        type: o[PIM_CATEGORY_DETAIL_FIELD_KEY.PRODUCT_TYPE_NAME],
        productQuantity: o[PIM_CATEGORY_DETAIL_FIELD_KEY.PRODUCT_QUANTITY],
        lastModified: {
          status: o[PIM_CATEGORY_DETAIL_FIELD_KEY.PUBLISHED],
          dateTime: date ?? '',
          author: o[PIM_CATEGORY_DETAIL_FIELD_KEY.CREATED_USER_NAME],
        },
        published: {
          state: o[PIM_CATEGORY_DETAIL_FIELD_KEY.PUBLISHED],
          id: o[PIM_CATEGORY_DETAIL_FIELD_KEY.ID],
        },
        parentName: o[PIM_CATEGORY_DETAIL_FIELD_KEY.PARENT_NAME],
      };
    });
  };

  isLoading = () => {
    runInAction(() => {
      this.successResponse.state = false;
    });
  };

  resetItemsList = () => {
    runInAction(() => {
      this.items = [];
    });
  };
}

export default CategoryListViewModel;
