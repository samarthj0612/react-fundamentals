"use client";

import { Formik, FormikHelpers } from "formik";

interface FormValues {
  email: string;
  password: string;
}

const page = () => {
  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Form using Formik</h1>

      <Formik<FormValues>
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors: Partial<FormValues> = {};

          if (!values.email) {
            errors.email = 'Email is Required';
          } else if (!values.password) {
            errors.password = 'Password is Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4 shadow-[0px_0px_20px_5px_rgba(0,0,0,0.2)] rounded-sm">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="border rounded-sm px-4 py-2 w-full sm:w-100"
              placeholder="Email"
            />

            <p className="text-sm text-red-500">{errors.email && touched.email && errors.email}</p>

            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="border rounded-sm px-4 py-2 w-full sm:w-100"
              placeholder="Password"
            />

            <p className="text-sm text-red-500">{errors.password && touched.password && errors.password}</p>

            <button type="submit" disabled={isSubmitting} className="w-fit mt-2 px-8 py-1 rounded text-white bg-[#007BFF]/80 hover:bg-[#007BFF] cursor-pointer transition-all">
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default page