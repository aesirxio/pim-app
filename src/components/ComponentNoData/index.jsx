/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import React from 'react';
import { Component } from 'react';
import './index.scss';
import { withTranslation } from 'react-i18next';
import ComponentImage from 'components/ComponentImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class ComponentNoData extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { icons, text, title, link, linlText, isBtn, width, className, iconColor, iconBg } =
      this.props;
    return (
      <div
        className={
          className
            ? className
            : 'text-center h-100 d-flex flex-column justify-content-center align-items-center'
        }
      >
        <div
          className={`mb-2 d-inline-block position-relative rounded-circle ${iconBg}`}
        >
          <ComponentImage
            className={`${iconColor}`}
            src={icons}
            alt={icons}
          />
        </div>
        <h5>{title}</h5>
        {text && <p className={`my-2 fs-14 text-black-50 w-100 mx-auto ${width}`}>{text}</p>}

        {isBtn && (
          <Link
            to={{ pathname: link, state: { openModal: true } }}
            className="btn btn-success d-inline-block w-fit"
          >
            <i className="text-white me-2">
              <FontAwesomeIcon icon={faPlus} />
            </i>
            {linlText}
          </Link>
        )}
      </div>
    );
  }
}

export default withTranslation('common')(ComponentNoData);
