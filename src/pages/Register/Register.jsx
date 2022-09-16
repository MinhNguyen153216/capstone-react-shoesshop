import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {},
    validationSchema: Yup.object().shape({}),
    onSubmit: (values) => {},
  });

  return <div>Register</div>;
}
