import React , { useRef } from 'react'

const faceImages = [
  '',
  '/meh-face.png',
  '/thinking-face.png',
  '/smirk-face.png',
  '/smile-face.png',
  '/love-face.png',
]

const Slider = ({ value, onValueChange }) => {
  const ref = useRef()
  const onChange = e => {
    onValueChange(e.target.value)
    ref.current.classList.add("bounce")
    setTimeout(()=> ref.current.classList.remove("bounce"), 200)
  }

  return (
    <>
      <input type="range" value={value} onChange={onChange} min="1" max="5" />
      <img
        ref={ref}
        className="face-img pt-n2"
        src={faceImages[value]}
        alt="face-rating"
      />
    </>
  )
}
export default Slider
