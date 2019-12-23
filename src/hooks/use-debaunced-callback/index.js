import debounce from 'lodash.debounce';
import { useCallback } from 'react';

export const useDebouncedCallback = (callback, wait = 40) => {
  const debouncedCallbackHandler = useCallback(() => {
    return debounce(callback, wait, { leading: false, trailing: true });
  });

  return debouncedCallbackHandler();
};
