import { useState } from 'react';

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
