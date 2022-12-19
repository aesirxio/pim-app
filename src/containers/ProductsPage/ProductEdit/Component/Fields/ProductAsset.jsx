import React from 'react';
import { withTranslation } from 'react-i18next';
const ProductAsset = ({ t }) => {
  return (
    <>
      <p className="mb-24">{t('txt_more_photography_for_this_product')}</p>
    </>
  );
};
export default withTranslation('common')(ProductAsset);
