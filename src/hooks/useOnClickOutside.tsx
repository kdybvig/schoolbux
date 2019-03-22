import { useEffect, RefObject } from "react";


type ClickHandler = (event: MouseEvent | TouchEvent) => void

export function useOnClickOutside(ref : RefObject<HTMLElement>, handleClickOutside: ClickHandler) {
    useEffect(        
      () => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if(!ref.current) console.log('crap')
          if (!ref.current || ref.current.contains((event.target as Node))) {
            return;
          }
          handleClickOutside(event);
        };
  
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
  
        return () => {
          document.removeEventListener('mousedown', listener);
          document.addEventListener('touchstart', listener);
        };
      },
      [ref, handleClickOutside]
    );
  }