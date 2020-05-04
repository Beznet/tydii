import {useState, useEffect} from 'react'

// checks if the client has window to access localStorage API
const hasLocalStorage = () => (typeof window !== "undefined") && window.localStorage

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(
    () => {
      const valueFromLocalStorage = hasLocalStorage() ? localStorage.getItem(key) : null
      return hasLocalStorage() ? JSON.parse(valueFromLocalStorage) : defaultValue
    }
  )
  useEffect(() => {
    if (hasLocalStorage()) {
      localStorage.setItem(key, JSON.stringify(state))
    }
  }, [key, state])

  return [state, setState]
}

export default usePersistedState