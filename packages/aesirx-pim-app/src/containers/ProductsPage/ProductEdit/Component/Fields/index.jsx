import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';

import FieldsList from 'components/Fields';
const FieldsTab = observer(
  class FieldsTab extends Component {
    groupList = [];
    constructor(props) {
      super(props);
      this.state = {
        defaultActive: '',
      };
    }

    render() {
      const { detailViewModal, formPropsData, validator, productType } = this.props;
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          <FieldsList
            detailViewModal={detailViewModal}
            formPropsData={formPropsData}
            validator={validator}
            fieldClass={'col-lg-6'}
            requiredField={this.props.requiredField}
            type={'product'}
            productType={productType}
            fieldByGroup={true}
          />
        </div>
      );
    }
  }
);

export default withTranslation()(FieldsTab);
