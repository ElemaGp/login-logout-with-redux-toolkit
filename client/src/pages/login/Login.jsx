import style from "./login.module.scss"
import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from "../../components/formikComponents/FormikControl"
import { Button } from "@mui/material"
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../../components/reduxToolkit/features/userSlice"
import usePasswordToggle from "../../usePasswordToggle"
import { Stack } from "@mui/system"


function Login () {

  //Redux-toolkit part (the dispatch of the "login" action creator is done in the "onSubmit" a few lines below)
  const user = useSelector(state => state.user) // "const user" is declared to be equal to the "user" in userSlice.jsx. Meaning it now contains the initial state object properties that the "user" has in useSlice.jsx, and the properties' values will be updated accordingly when the actions are dispatched. Btw, "const user = useSelector(state => state.user)" gives us the state of the entire "user" object in the user slice. If for instance, i just wanted to get the state of the the loading, then i would have done "const user = useSelector(state => state.user.loading)". "user" is what i named my userSlice in userSlice.jsx so it is the name of the user object. Any of the properties (in the "initial state" section) can now be accessed through it eg "state.user.loading", "state.user.websiteuser", "state.user.error".
  const dispatch = useDispatch()

  //password eye-toggle
  const [passwordInputType, EyeIcon] = usePasswordToggle(); //bringing in the values of "const inputType" and "const icon" which i returned from the usePasswordToggle custom hook as "const passwordInputType" and "const EyeIcon".

  //formik part
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

  const onSubmit = values => {    //alternatively, i can just destructure this "values" object to directly get the email and password.
    console.log('Form data', values)
    dispatch(login({email: values.email, password: values.password})) //dispatching the "login" action-creator function in userSlice, which will then dispach the action "user/login" in userSlice.jsx.
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

          <div className={style.passwordArea}>
              <FormikControl
                control='MuiInput'
                type={passwordInputType}
                label='Password'
                name='password'    //the "name's" value has to match with the initial value's name above.
                error={Boolean(formik.errors.password) && Boolean(formik.touched.password)} //if both "formik.errors" and "formik.touched" are true, then the "error" prop is true.
                helperText={Boolean(formik.touched.password) && formik.errors.password} //if "formik.touched.password" is true, then display the "formik.errors" associated with the "password".
              />
              <div className={style.passwordEyeIcon}>{EyeIcon}</div>
            </div>
            
            {/* <button type='submit' disabled={!formik.isValid} className={style.btn}>Sign Up</button> "formik.isValid is false whenever there is an error" */}
            <Button type="submit" variant="contained" color="primary" size="large" disabled={!formik.dirty || !formik.isValid}>Login</Button>
          </Form>
        )
      }}
    </Formik>
    
  )
}

export default Login
