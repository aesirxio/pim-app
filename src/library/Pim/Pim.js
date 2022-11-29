/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { ColectionModel } from './PimModel';
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
        results = new ColectionModel(data);
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
}

export default AesirxPimApiService;
