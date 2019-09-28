import React, { useState } from 'react'

const ItemInput = ({item}) => {
  return (
    <div>
      <form>
        <label htmlFOR="inputItem">
          Input Items: 
          <input 
            id="inputItem"
            value={item}
            placeholder="item input"
          />
        </label>
      </form>
    </div>
  )
}

export default ItemInput