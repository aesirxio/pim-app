/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
// import i18n from 'translations/i18n';

import './index.scss';
import Menu from '../Menu';
// import { Dropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import Menu2 from 'components/Menu2';
import { observer } from 'mobx-react';
import { AesirXDamStorage } from 'aesirx-dam-app';
// import { NavLink } from 'react-router-dom';
const SbarLeft = observer(
  class SbarLeft extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      let { settingPage } = this.props;

      // const listLanguages = Object.keys(i18n.options.resources).map(function (key) {
      //   return { language: key, title: i18n.options.resources[key].title };
      // });
      // let currentLanguage = listLanguages.filter((lang) => {
      //   if (lang.language == i18n.language) {
      //     return lang.title;
      //   }
      // });
      return (
        <aside
          className={`sidebar w-248  mt-0 position-relative bg-dark mh-100 h-100 d-flex flex-column z-index-100 justify-content-between`}
        >
          {!settingPage ? (
            <>
              <Menu />
            </>
          ) : (
            <Menu2 />
          )}

          <div className="d-flex align-items-center justify-content-between bottom-0 w-100 pt-1 button-language item_menu">
            {/* <Dropdown as={'div'} className="col py-2 px-3">
              <Dropdown.Toggle
                variant="dark"
                id="dropdown-basic"
                className="bg-transparent border-0 p-0"
              >
                <FontAwesomeIcon icon={faGlobe} /> {currentLanguage[0]?.title}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {listLanguages.map((item, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      href="#"
                      className=""
                      onClick={() => {
                        i18n.changeLanguage(item.language);
                      }}
                    >
                      {item.title}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown> */}
            {/* <NavLink
              exact={true}
              to={'/help-center'}
              className={`d-block px-24 py-16 link_menu text-white text-decoration-none `}
              activeClassName={`active`}
            >
              <span
                className="icon d-inline-block align-text-bottom"
                style={{
                  WebkitMaskImage: `url(/assets/images/help-center.svg)`,
                  WebkitMaskRepeat: 'no-repeat',
                }}
              ></span>
              <span className="ms-16 text d-inline-block">{t('txt_menu_help_center')}</span>
            </NavLink> */}

            {/* <a href="/" className="d-flex align-items-center py-2 px-3">
              <ComponentImage src="/assets/images/help-icon.svg" />
              <span className="text-white ps-3">{t('txt_help_center')}</span>
            </a> */}
          </div>
          <div className='px-1'><AesirXDamStorage /></div>
        </aside>
      );
    }
  }
);

export default withTranslation('common')(SbarLeft);
