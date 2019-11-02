import React from 'react'
import useInputState from './useInputState';

const ItemForm = ({saveItem}) => {
  const {value, reset, onChange} = useInputState('')
  const itemSubmit = (event) => {
    event.preventDefault();
    saveItem(value);
    reset();
  }

  return (
    <div>
      <form
        onSubmit={itemSubmit}
      >
        <input 
          id="inputItem"
          placeholder="item input"
          onChange={onChange}
          value={value}
        />
        <button onClick={itemSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default ItemForm