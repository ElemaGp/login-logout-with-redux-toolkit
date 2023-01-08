import React, { useState } from 'react'
import {AiOutlineEye} from 'react-icons/ai';
import {AiOutlineEyeInvisible} from 'react-icons/ai';

const usePasswordToggle = () => {
    const [visible, setVisibility] = useState(false);
    const [visibleConfirmPassword, setVisibilityConfirmPassword] = useState(false);

    const handleClick = () => {
        setVisibility(!visible);
    }

    const handleEyeClickConfirmPassword = () => {
        setVisibilityConfirmPassword(!visibleConfirmPassword);
    }

    const Icon = (
        visible ? <AiOutlineEyeInvisible onClick={handleClick}/> : <AiOutlineEye onClick={handleClick}/>
    )
    
    const confirmPasswordIcon = (
        visibleConfirmPassword ? <AiOutlineEyeInvisible onClick={handleEyeClickConfirmPassword}/> : <AiOutlineEye onClick={handleEyeClickConfirmPassword}/>
    )

    const InputType = visible ? "text" : "password";

    const inputTypeConfirmPassword = visibleConfirmPassword ? "text" : "password";

  return [InputType, Icon, inputTypeConfirmPassword, confirmPasswordIcon]
}

export default usePasswordToggle