/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { ProductDetailModel } from './PimModel';
import PimRoute from './PimRoute';
import { Component } from 'react';
import axios from 'axios';

/**
 * API Service - Member
 */
class AesirxPimApiService extends Component {
  route = null;

  constructor(props) {
    super(props);
    this.route = new PimRoute();
  }

  getDetail = async (id = 0) => {
    try {
      const data = await this.route.getDetail(id);
      let results = null;
      let pagination = null;
      if (data) {
        results = new ProductDetailModel(data);
        pagination = results.getPagination();
      }
      if (results) {
        results = results.toJSON();
      }

      return {
        list: results ?? [],
        pagination: pagination ?? {},
      };
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };

  getList = async (filter) => {
    try {
      const data = await this.route.getList(filter);
      let results = null;
      // let pagination = null;
      if (data?._embedded) {
        results = await Promise.all(
          data._embedded.item.map(async (o) => {
            return new ProductDetailModel(o);
          })
        );

        // results = new ProductDetailModel(data);
        // results = results.toJSON();
        // pagination = results.getPagination();
      }
      return {
        listItems: results ?? [],
        // pagination: pagination ?? {},
      };
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };
}

export default AesirxPimApiService;
