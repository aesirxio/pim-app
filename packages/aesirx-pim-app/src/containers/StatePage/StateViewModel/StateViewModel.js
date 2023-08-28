/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import StateDetailViewModel from './StateDetailViewModel';
import StateListViewModel from './StateListViewModel';

class StateViewModel {
  stateDetailViewModel = {};
  stateListViewModel = {};

  constructor(stateStore) {
    if (stateStore) {
      this.stateDetailViewModel = new StateDetailViewModel(stateStore);
      this.stateListViewModel = new StateListViewModel(stateStore);
    }
  }

  getStateDetailViewModel = () => this.stateDetailViewModel;
  getStateListViewModel = () => this.stateListViewModel;
}

export default StateViewModel;
