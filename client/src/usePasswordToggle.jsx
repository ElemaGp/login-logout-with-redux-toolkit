import React, { useState } from 'react'
import {AiOutlineEye} from 'react-icons/ai';
import {AiOutlineEyeInvisible} from 'react-icons/ai';

const usePasswordToggle = () => {
    const [visible, setVisibility] = useState(false);

    const handleClick = () => {
        setVisibility(!visible);
    }

    const Icon = (
        visible ? <AiOutlineEyeInvisible onClick={handleClick}/> : <AiOutlineEye onClick={handleClick}/>
    )

    const InputType = visible ? "text" : "password";

  return [InputType, Icon]
}

export default usePasswordToggle