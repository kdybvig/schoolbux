import React, { FunctionComponent, useState, FormEvent } from 'react';


interface values {
    [key: string] : (string)
}
const useForm = (submitFunction: (e: FormEvent<Element>) => void,  initialValues?: values) => {
    const [values, setValues] = useState<values>(initialValues? initialValues: {});
    const [isDisabled, setIsDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent<Element>) => {
        e.preventDefault();
        submitFunction(e);
    }

    const handleChange = (e: any) => {
        e.preventDefault()
        const {name, value} = e.currentTarget
        setValues(prevValues=>({...prevValues, [name] : value}))
    }

    const capitalize = (str: string): string => {
        if(str.indexOf(' ') > 0) return (
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