import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import ComponentSVG from 'components/ComponentSVG';
import './index.scss';
const ActionsBar = ({ t, buttons = [] }) => {
  return (
    <div className="d-flex align-items-center">
      {buttons.map((item, key) => {
        return (
          <div key={key} className="ms-15">
            <Button
              variant={`${item.variant ? item.variant : 'light'}`}
              className={`${
                item.title === t('txt_cancel') ? 'text-danger' : ''
              } px-16 fw-semibold d-flex align-items-center rounded-1`}
              onClick={item.handle}
            >
              {item.icon && (
                <ComponentSVG
                  url={item.icon}
                  className={`icon-${item.variant ? item.variant : 'light'} me-1`}
                />
              )}
              {item.title}
            </Button>
          </div>
        );
      })}
    </div>
  );
};
export default withTranslation('common')(ActionsBar);
