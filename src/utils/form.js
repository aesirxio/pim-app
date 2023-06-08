/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';
import Label from '../components/Form/Label';
import { FORM_FIELD_TYPE } from '../constants/FormFieldType';
import { Form } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';

const FormDateRangePicker = lazy(() => import('../components/Form/FormDateRangePicker'));
const CustomizedDatePicker = lazy(() => import('../components/DatePicker'));
const FormImage = lazy(() => import('../components/Form/FormImage'));
const FormVideo = lazy(() => import('../components/Form/FormVideo'));
const FormSelection = lazy(() => import('../components/Form/FormSelection'));
const FormSelectionFields = lazy(() => import('../components/Form/FormSelectionFields'));
const FormRadio = lazy(() => import('../components/Form/FormRadio'));
const FormCheckbox = lazy(() => import('../components/Form/FormCheckbox'));
const FormEditor = lazy(() => import('../components/Form/FormEditor'));

const Input = lazy(() => import('../components/Form/Input'));

const renderingGroupFieldHandler = (group, validator) => {
  return Object.keys(group.fields)
    .map((fieldIndex) => {
      return [...Array(group.fields[fieldIndex])].map((field) => {
        return (() => {
          let className = field.className ? field.className : '';
          switch (field.type) {
            case FORM_FIELD_TYPE.INPUT:
              return (
                <Form.Group key={field.key} ref={field.ref} className={`mb-24 ${className}`}>
                  <Label
                    text={field.label}
                    required={field.required ?? false}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Hello world!"
                  />
                  <Input field={field} />
                  {field.validation &&
                    validator.message(field.label, field.getValueSelected, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.NUMBER:
              return (
                <Form.Group key={field.key} ref={field.ref} className={`mb-24 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <Input field={field} />
                  {field.validation &&
                    validator.message(field.label, field.getValueSelected, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.TEXTAREA:
              return (
                <Form.Group key={field.key} className={`mb-24 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <Form.Control
                    as="textarea"
                    defaultValue={field.getValueSelected}
                    required={field.required ?? false}
                    id={field.key}
                    onChange={field.handleChange ?? undefined}
                    onBlur={field.blurred ?? undefined}
                  />

                  {field.validation &&
                    validator.message(field.label, field.getValueSelected, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.DATERANGE:
              return (
                <FormDateRangePicker
                  key={Math.random(40, 200)}
                  field={field}
                  validator={validator}
                />
              );
            case FORM_FIELD_TYPE.IMAGE:
              return (
                <Form.Group
                  key={Math.random(40, 200)}
                  ref={field.ref}
                  className={`mb-24 ${className}`}
                >
                  <Label text={field.label} required={field.required ?? false} />
                  {field.isVideo ? (
                    <FormVideo key={Math.random(40, 200)} field={field} />
                  ) : (
                    <FormImage key={Math.random(40, 200)} field={field} />
                  )}
                  {field.validation &&
                    validator.message(field.label, field.getValueSelected, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.SELECTION:
              return (
                <Form.Group key={field.key} ref={field.ref} className={`mb-24 ${className}`}>
                  {field.label && <Label text={field.label} required={field.required ?? false} />}

                  <FormSelection key={Math.random(40, 200)} field={field} />

                  {field.validation &&
                    validator.message(field.label, field.getValueSelected, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.LIST:
              return (
                <Form.Group key={field.key} ref={field.ref} className={`mb-24 ${className}`}>
                  {field.label && (
                    <Label
                      text={field.label}
                      required={field.required ?? false}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Hello world!"
                    />
                  )}

                  <FormSelection key={Math.random(40, 200)} field={field} />

                  {field.validation &&
                    validator.message(field.label, field.getValueSelected, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.SELECTION_FIELDS:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  {field.label && <Label text={field.label} required={field.required ?? false} />}

                  <FormSelectionFields key={Math.random(40, 200)} field={field} />

                  {field.validation &&
                    validator.message(field.label, field.getValueSelected, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.RADIO:
              return (
                <Form.Group key={field.key} ref={field.ref} className={`mb-24 ${className}`}>
                  <Label
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Hello world!"
                    text={field.label}
                    required={field.required ?? false}
                  />
                  <FormRadio field={field} />
                  {field.validation &&
                    validator.message(field.label, field.getValueSelected, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.CHECKBOX:
              return (
                <Form.Group key={field.key} ref={field.ref} className={`mb-24 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <FormCheckbox field={field} />
                  {field.validation &&
                    validator.message(field.label, field.getValueSelected, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.DATE:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 fs-14 ${className}`}>
                  <Label text={field.label} />
                  <CustomizedDatePicker
                    dateFormat={'dd/MM/yyyy'}
                    handleOnChange={(date) => field.handleChange(date)}
                    defaultDate={field.getValueSelected ? field.getValueSelected : null}
                    placeholderText={field.placeholder}
                  />
                </Form.Group>
              );

            case FORM_FIELD_TYPE.EDITOR:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-24 ${className}`}>
                  <Label
                    labelClassName={field.labelClassName}
                    text={field.label}
                    required={field.required ?? false}
                  />
                  {field.isEditor === false ? (
                    <Form.Control
                      as="textarea"
                      defaultValue={field.getValueSelected}
                      required={field.required ?? false}
                      id={field.key}
                      onChange={field.handleChange ?? undefined}
                      onBlur={field.blurred ?? undefined}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <FormEditor field={field} />
                  )}
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            default:
              return null;
          }
        })();
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
};

export { renderingGroupFieldHandler };
