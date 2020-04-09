import { useCallback, useState } from 'react'

function useToggle (initialToggled = false) {
  const [toggled, setToggled] = useState(initialToggled)
  const toggle = useCallback(() => setToggled(toggled => !toggled), [])

  return [toggled, toggle, setToggled]
}

export default useToggle