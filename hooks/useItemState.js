import { useState } from 'react'
import uniqid from 'uniqid'

const DEFAULT_RATING = 3

/**
 * Generate new item with desired structure
 * @returns {Item} new item
 */
const generateNewItem = name => {
  const id = uniqid()
  return {
    id,
    name,
    rating: DEFAULT_RATING,
    result: 'owned'
  }
}

/**
 * Replace an item in list with updatedItem matching the same id
 * @param items {Array} list of items
 * @param updatedItem {Item} item with updated data
 */
const updateItem = (items, updatedItem) => {
  const itemIndex = items.findIndex(item => item.id === updatedItem.id)

  if (itemIndex === -1) return items

  const newItems = [
    ...items.slice(0, itemIndex), // previous items
    updatedItem, // updated item
    ...items.slice(itemIndex + 1), // items after
  ]
  return newItems
}

export default initialValue => {
  const [items, setItems] = useState(initialValue)

  return {
    items,
    addItem: itemText => {
      setItems([...items, generateNewItem(itemText)])
    },
    updateItem: updatedItem => {
      const updatedItemList = updateItem(items, updatedItem)
      setItems(updatedItemList)
    },
    deleteItem: id => {
      const newItems = items.filter(item => item.id !== id)
      setItems(newItems)
    },
  }
}
