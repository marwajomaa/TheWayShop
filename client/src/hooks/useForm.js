import React, { useEffect, useState } from "react";

export function useForm(initialValues, validateOnChange, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setTimeout(() => console.log(values), 3000);
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const clearInputs = () => {
    setValues(initialValues);
  };

  return {
    values,
    setValues,
    handleInputChange,
    clearInputs,
    errors,
    setErrors,
    submitError,
    setSubmitError,
  };
}
