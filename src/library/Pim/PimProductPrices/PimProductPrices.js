/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { Component } from 'react';
import axios from 'axios';
import PimProductPricesRoute from './PimProductPricesRoute';
import { ProductPriceModel } from './PimProductPricesModel';

/**
 * API Service - Product
 */
class AesirxPimProductPricesApiService extends Component {
  route = null;

  constructor(props) {
    super(props);
    this.route = new PimProductPricesRoute();
  }

  getList = async (filter) => {
    try {
      const data = await this.route.getList(filter);
      let listItems = null;
      let pagination = null;

      if (data?._embedded) {
        listItems = await Promise.all(
          data._embedded.item.map(async (o) => {
            return new ProductPriceModel(o);
          })
        );
      }

      pagination = {
        page: data.page,
        pageLimit: data.pageLimit,
        totalPages: data.totalPages,
        totalItems: data.totalItems,
        limitStart: data.limitstart,
      };

      return {
        listItems: listItems ?? [],
        pagination: pagination ?? {},
      };
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };

  updateStatus = async (arr, status) => {
    try {
      const listSelected = arr.map((o) => {
        return { id: o, published: status };
      });

      const result = await this.route.updateStatus(listSelected);

      if (result) {
        return result.result;
      }
      return { message: 'Something have problem' };
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };

  updatePrices = async (arr) => {
    try {
      const result = await this.route.updatePrices(arr);
      if (result) {
        return result.result;
      }
      return { message: 'Something have problem' };
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };
  
}

export default AesirxPimProductPricesApiService;
