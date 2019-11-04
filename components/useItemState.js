import { useState } from 'react'

export default (initialValue) => {
  const [items, setItems] = useState(initialValue);

  console.log(items)
  
  return {
    items,
    addItem: (itemText) => {
      setItems([...items, itemText])
    },
    deleteItem: (itemIndex) => {
      const newItems = items.filter((_, index) => index !== itemIndex)

      setItems(newItems)
    }
  }
}