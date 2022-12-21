/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { DashboardModel } from './PimDashboardModel';
import PimDashboardRoute from './PimDashboardRoute';
import { Component } from 'react';
import axios from 'axios';

/**
 * API Service - Dashboards
 */
class AesirxPimDashboardApiService extends Component {
  route = null;

  constructor(props) {
    super(props);
    this.route = new PimDashboardRoute();
  }

  getStatisticalData = async () => {
    try {
      const data = await this.route.getStatisticalData();
      let results = null;
      if (data) {
        results = new DashboardModel(data);
      }
      return results;
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };
}

export default AesirxPimDashboardApiService;
