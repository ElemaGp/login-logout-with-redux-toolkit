//I'm using this "MuiInput.jsx" component instead of this "input.jsx" component, because this Muiinput component uses Material-ui library which helps me style the form better, especially for error state. (So the components being used for the form is MuiInput.jsx, FormikControl.jsx and SignupForm.jsx)

import React from 'react'
import {Field} from 'formik'
import { TextField } from '@mui/material'


function MuiInput(props) {
    const { label, name, type, error, helperText, ...rest } = props
  return (
    <div>
        <Field as={TextField} name={name} type={name}  variant="outlined" color="primary" label={label} sx={{width: {xs: 250, sm: 500}}} error={error} helperText={helperText}/>  {/*The "error" props makes the border red it is true (ie when there's an error), the helper text displays the error message*/}
    </div>
  )
}

export default MuiInput