import style from "./login.module.scss"
import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from "../../components/formikComponents/FormikControl"
import { Button } from "@mui/material"


function Login () {

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    password: Yup.string().required('Required')
  })

  const onSubmit = values => {
    console.log('Form data', values)
  }

  return (
    
    
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
          <Form className={style.formContainer}>
            <h1 className={style.signupText}>LOG IN</h1>
            <FormikControl
              control='MuiInput'
              // control='chakraInput'
              type='email'
              label='Email'
              name='email'    //the "name" has to match with the initial value's name above.
              error={Boolean(formik.errors.email) && Boolean(formik.touched.email)} //if both "formik.errors" and "formik.touched" are true, then the "error" prop is true.
              helperText={Boolean(formik.touched.email) && formik.errors.email} //if "formik.touched.email" is true, then display the "formik.errors" associated with the "email".
            />
            <FormikControl
              control='MuiInput'
              type='password'
              label='Password'
              name='password'    //the "name's" value has to match with the initial value's name above.
              error={Boolean(formik.errors.password) && Boolean(formik.touched.password)} //if both "formik.errors" and "formik.touched" are true, then the "error" prop is true.
              helperText={Boolean(formik.touched.password) && formik.errors.password} //if "formik.touched.password" is true, then display the "formik.errors" associated with the "password".
            />
            
            {/* <button type='submit' disabled={!formik.isValid} className={style.btn}>Sign Up</button> "formik.isValid is false whenever there is an error" */}
            <Button type="submit" variant="contained" color="primary" size="large" disabled={!formik.dirty || !formik.isValid}>Sign Up</Button>
          </Form>
        )
      }}
    </Formik>
    
  )
}

export default Login
