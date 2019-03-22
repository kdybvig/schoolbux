import  {useState, useEffect}  from 'react';

const useKeyPress = (keys: string[]) => {

    const [isKeyDown, setIsKeyDown] = useState<boolean | null>(null)
    const [isKeyReleased, setIsKeyReleased] = useState<boolean | null>(null)


    function handleKeyDown(e : KeyboardEvent) {
        setIsKeyReleased(false)
        if(keys.indexOf(e.key) === -1) return
        setIsKeyDown(true)
        return
    }

    function handleKeyUp(e : KeyboardEvent) {
        if(keys.indexOf(e.key) === -1) return
        setIsKeyDown(false)
        if(isKeyReleased === false) setIsKeyReleased(true)
        return
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown',handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }) 

    return [isKeyDown, isKeyReleased]
}

export default useKeyPress;