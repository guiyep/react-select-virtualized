import { useEffect, useRef } from 'react';

export const useDebouncedCallback = (onCallback, wait, deps = []) => {
  const argsRef = useRef();
  const timeoutRef = useRef();

  const cleanup = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // TODO review this broke minimum input
  // useEffect(() => () => cleanup(), deps);

  const debouncedCallback = (...args) => {
    argsRef.current = args;

    cleanup();

    timeoutRef.current = setTimeout(() => {
      if (argsRef.current) {
        onCallback(...argsRef.current);
      }
    }, wait);
  };

  return debouncedCallback;
};
