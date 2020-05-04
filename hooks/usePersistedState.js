import React, {useState, useEffect} from 'react'

function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(
      () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    useEffect(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(state))
      }
    }, [key, state, window])
    return [state, setState]
  }

  export default usePersistedState