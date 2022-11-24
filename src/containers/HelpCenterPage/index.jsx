import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class HelpCenterPage extends Component {
  render() {
    const { t } = this.props;

    return (
      <>
        <div className="py-4 px-3 h-100 d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <div className="position-relative">
              <h1 className="text-blue-0 fw-bold mb-8px fs-2">{t('txt_menu_help_center')}</h1>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withTranslation('common')(HelpCenterPage);
