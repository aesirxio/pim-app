/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import './index.scss';
import { Collapse, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';

const dataMenuSetup = [
  {
    text: 'txt_left_menu_fields',
    link: '/fields',
    icons: '/assets/images/fields.svg',
    icons_color: '/assets/images/fields.svg',
  },
  {
    text: 'txt_left_menu_fields_group',
    link: '/fields-group',
    icons: '/assets/images/fields-group.svg',
    icons_color: '/assets/images/fields-group.svg',
  },
  {
    text: 'txt_left_menu_taxonomies',
    link: '/taxonomies',
    icons: '/assets/images/taxonomies.svg',
    icons_color: '/assets/images/taxonomies.svg',
  },
  {
    text: 'txt_menu_setting',
    link: '/setting',
    icons: '/assets/images/setting.svg',
    icons_color: '/assets/images/setting.svg',
  },
];
const Menu = observer((props) => {
  const [isOpenCollapse, setIsOpenCollapse] = useState('default');
  const handleOpen = (clickedIndex, parentIndex) => {
    if (isOpenCollapse === clickedIndex.toString()) {
      if (parentIndex) {
        setIsOpenCollapse(parentIndex.toString());
      } else {
        setIsOpenCollapse(null);
      }
    } else {
      if (isOpenCollapse?.includes(clickedIndex.toString())) {
        setIsOpenCollapse(null);
      } else {
        setIsOpenCollapse(clickedIndex.toString());
      }
    }
  };
  const checkActiveMenu = () => {
    if (window.location.pathname === '/') {
      document.getElementById('wr_list_menu').classList.remove('wr_list_menu');
    } else {
      document.getElementById('wr_list_menu').classList.add('wr_list_menu');
    }
  };

  const handleCheckActive = () => {
    checkActiveMenu();
  };

  const dataMenu = [
    {
      text: 'txt_left_menu_dashboard',
      link: `/`,
      icons: '/assets/images/dashboard.svg',
      icons_color: '/assets/images/dashboard.svg',
    },
    {
      text: 'txt_left_menu_products',
      link: `/products`,
      icons: '/assets/images/products.svg',
      icons_color: '/assets/images/products.svg',
      submenu: [
        {
          text: 'txt_left_menu_all_products',
          link: `/products/all`,
        },
        {
          text: 'txt_left_menu_add_new',
          link: `/products/add`,
        },
        {
          text: 'txt_left_menu_price_management',
          link: `/products/price-management`,
        },
        {
          text: 'txt_left_menu_products_variant',
          link: `/products/products-variant`,
        },
      ],
    },
    {
      text: 'txt_left_menu_categories',
      link: `/categories`,
      icons: '/assets/images/categories.svg',
      icons_color: '/assets/images/categories.svg',
    },
    {
      text: 'txt_left_menu_member_list',
      link: `/members-list`,
      icons: '/assets/images/members-list.svg',
      icons_color: '/assets/images/member-list.svg',
    },
    {
      text: 'txt_left_menu_import_export',
      link: `/import-export`,
      icons: '/assets/images/import.svg',
      icons_color: '/assets/images/import.svg',
    },
    {
      text: 'txt_left_menu_dam',
      link: `/dam`,
      icons: '/assets/images/data-stream.svg',
      icons_color: '/assets/images/data-stream.svg',
    },
  ];

  useEffect(() => {
    checkActiveMenu();
  }, []);

  const { t } = props;
  return (
    <>
      <nav className="main-menu py-24 mt-0">
        <p className="menu_title text-dark-blue fs-14 mb-0 text-uppercase">{t('txt_main_menu')}</p>
        <ul id="wr_list_menu" className="list-unstyled mb-0 pt-md-1">
          {dataMenu.map((menuList, menuListkey) => {
            return (
              <li
                key={menuListkey}
                className={`item_menu ${menuList.className ? menuList.className : ''}`}
              >
                {!menuList.submenu ? (
                  <>
                    {menuList.link && (
                      <NavLink
                        exact={true}
                        to={menuList.link}
                        className={`d-block px-24 py-16 link_menu text-white text-decoration-none`}
                        activeClassName={`active`}
                      >
                        <span
                          className="icon d-inline-block align-text-bottom"
                          style={{
                            WebkitMaskImage: `url(${menuList.icons_color})`,
                            WebkitMaskRepeat: 'no-repeat',
                          }}
                        ></span>
                        <span className="ms-16 text d-inline-block">{t(menuList.text)}</span>
                      </NavLink>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      variant=""
                      onClick={() => handleOpen(menuListkey)}
                      className={`d-flex align-items-center justify-content-start rounded-2 link_menu text-decoration-none text-break w-100 px-24 py-16 shadow-none ${
                        isOpenCollapse === menuListkey.toString() ||
                        isOpenCollapse?.includes(menuListkey + '-')
                          ? 'active'
                          : ''
                      }`}
                      aria-controls="wr_list_submenu"
                      aria-expanded={
                        isOpenCollapse === menuListkey.toString() ||
                        isOpenCollapse?.includes(menuListkey + '-')
                      }
                    >
                      <span
                        className="icon d-inline-block align-text-bottom"
                        style={{
                          WebkitMaskImage: `url(${menuList.icons_color})`,
                          WebkitMaskRepeat: 'no-repeat',
                        }}
                      ></span>
                      <span className="ms-16 text d-inline-block">{t(menuList.text)}</span>
                      <span
                        className="icon arrow d-inline-block align-text-bottom ms-auto"
                        style={{
                          WebkitMaskImage: `url(/assets/images/arrow-right.svg)`,
                          WebkitMaskRepeat: 'no-repeat',
                        }}
                      ></span>
                    </Button>
                    <Collapse
                      in={
                        isOpenCollapse === menuListkey.toString() ||
                        isOpenCollapse?.includes(menuListkey + '-')
                      }
                    >
                      <ul id="wr_list_submenu" className="list-unstyled">
                        {menuList.submenu.map((value, menuListSubkey) => {
                          return (
                            <li
                              key={menuListSubkey}
                              className={`item_menu`}
                              onClick={handleCheckActive}
                            >
                              {value.link && (
                                <NavLink
                                  exact={true}
                                  to={value.link}
                                  className={`d-block px-24 py-16 link_menu text-white text-decoration-none`}
                                  activeClassName={`active`}
                                >
                                  <i className="icon-submenu text-white">
                                    <FontAwesomeIcon icon={faCircle} />
                                  </i>
                                  <span className="text d-inline-block">{t(value.text)}</span>
                                </NavLink>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </Collapse>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <nav className="border-top border-dark-blue py-2 mt-0 mb-auto">
        <p className="menu_title text-dark-blue fs-14 mb-0 text-uppercase">{t('txt_set_up')}</p>
        <ul id="wr_list_menu" className="list-unstyled mb-0 pt-md-1">
          {dataMenuSetup.map((value, key) => {
            return (
              <li key={key} className={`item_menu ${value.className ? value.className : ''}`}>
                <NavLink
                  exact={true}
                  to={value.link}
                  className={`d-block px-24 py-16 link_menu text-white text-decoration-none `}
                  activeClassName={`active`}
                >
                  <span
                    className="icon d-inline-block align-text-bottom"
                    style={{
                      WebkitMaskImage: `url(${value.icons_color})`,
                      WebkitMaskRepeat: 'no-repeat',
                    }}
                  ></span>
                  <span className="ms-16 text d-inline-block">{t(value.text)}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
});

export default withTranslation('common')(withRouter(Menu));
