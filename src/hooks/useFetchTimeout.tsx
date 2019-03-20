import { useState, useEffect } from 'react';

const useFetchTimeout = () => {
    const [didTimeOut, setDidTimeOut] = useState(false)
    const [didFetch, setDidFetch] = useState(false)
    const [timeoutError, setTimeoutError] = useState('')

    let timer: NodeJS.Timeout

    const runTimer = (duration: number) => {
    console.log('starting', duration)
    if(!duration) return
    if(timer) {
        clearTimeout(timer)
    }
    console.log('timer')
    timer = setTimeout(() => {
        if(didFetch) return
        console.log('timed out')
        setDidTimeOut(true)
    }, duration)  
    }

    useEffect(() => {
        return () => {
            if(timer) clearTimeout(timer)  
        }  
    }, [])

    const startFetchTimeout = (duration: number) => {
        setDidFetch(false)
        setDidTimeOut(true)
        runTimer(duration)
    }
  return (
    {didTimeOut, startFetchTimeout, setDidFetch, timeoutError}
  )
}

export default useFetchTimeout;