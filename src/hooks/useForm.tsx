import React, { FunctionComponent, useState } from 'react';


interface values {
    [key: string] : (string)
}
const useForm = (submitFunction: (e: any) => void) => {
    const [values, setValues] = useState<values>({});
    const [isDisabled, setIsDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        submitFunction(e);
    }

    const handleChange = (e: any) => {
        e.preventDefault()
        const {name, value} = e.target
        setValues(prevValues=>({...prevValues, [name] : value}))
    }

    const capitalize = (str: string): string => {
        if(str.indexOf(' ') >= 0) return (
          str.split(' ').map(str => capitalize(str)).join(' ')
        ) 
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    

    return (
        {
            handleSubmit,
            handleChange,
            values,
            setValues,
            isDisabled,
            setIsDisabled,
            error,
            setError,
            capitalize
        }
    )
}

export default useForm;