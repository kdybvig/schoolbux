import { useState, useEffect } from 'react';

const useFetchTimeout = () => {
    const [didTimeOut, setDidTimeOut] = useState('')
    const [didFetch, setDidFetch] = useState(false)

    let timer: NodeJS.Timeout

    const runTimer = (duration: number) => {
    if(!duration) return
    if(timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        if(didFetch) return
        setDidTimeOut('Request timed out.')
    }, duration)  
    }

    useEffect(() => {
        return () => {
            if(timer) clearTimeout(timer)  
        }  
    }, [])

    const startFetchTimeout = (duration: number) => {
        setDidFetch(false)
        setDidTimeOut('')
        runTimer(duration)
    }

    const clearDidTimeOut= () => {
        setDidTimeOut('')
    }
  return (
    {didTimeOut, startFetchTimeout, setDidFetch, clearDidTimeOut }
  )
}

export default useFetchTimeout;