/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from './index.module.scss';
import './index.scss';

export default class ComponentEditor extends React.Component {
  render() {
    return (
      <div className={styles['custom-editor']}>
        <CKEditor editor={ClassicEditor} {...this.props} />
      </div>
    );
  }
}
