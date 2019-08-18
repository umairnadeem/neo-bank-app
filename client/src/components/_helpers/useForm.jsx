import { useState } from 'react';

/**
 * A custom hook which holds the state and handleChange/handleSubmit functions for form components
 * @param {Object} initialValues - Initial state for form fields
 */
export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e, callback) => {
    e.preventDefault();
    callback(values);
  };

  return [values, handleChange, handleSubmit];
};
