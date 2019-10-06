import React from 'react'
import useInputState from './useInputState';

const ItemForm = ({saveItem}) => {
  const {value, reset, onChange} = useInputState('')

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveItem(value);
          reset();
        }}
      >
        <input 
          id="inputItem"
          placeholder="item input"
          onChange={onChange}
          value={value}
        />
      </form>
    </div>
  )
}

export default ItemForm