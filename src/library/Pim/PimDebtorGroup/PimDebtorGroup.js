/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { DebtorGroupItemModel, DebtorGroupModel } from './PimDebtorGroupModel';
import PimDebtorGroupRoute from './PimDebtorGroupRoute';
import { Component } from 'react';
import axios from 'axios';

/**
 * API Service - DebtorGroups
 */
class AesirxPimDebtorGroupApiService extends Component {
  route = null;

  constructor(props) {
    super(props);
    this.route = new PimDebtorGroupRoute();
  }

  create = async (data) => {
    try {
      const result = await this.route.create(data);
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

  update = async (data) => {
    try {
      const result = await this.route.update(data);
      console.log('resultenee', result);
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

  getDetail = async (id = 0) => {
    try {
      const data = await this.route.getDetail(id);
      let results = null;
      if (data) {
        results = new DebtorGroupItemModel(data);
      }
      if (results) {
        results = results.toJSON();
      }

      return results;
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };

  getList = async () => {
    try {
      const data = await this.route.getList();
      let results = null;
      if (data) {
        results = new DebtorGroupModel(data);
      }
      return results;
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };
}

export default AesirxPimDebtorGroupApiService;
