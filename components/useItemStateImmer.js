import { useState } from 'react'
import uniqid from 'uniqid'
import produce from 'immer'

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
    rating: DEFAULT_RATING
  }
}

/** 
 * Add a new item to the list of items
 * @param items {Array} list of items
 * @param updatedItem {Item} item with updated data
 */
const addItem = (items, newItem) => {
  const nextState = produce(items, draftItems => {
    draftItems.push(newItem)
  })

  return nextState
}

/** 
 * Replace an item in list with updatedItem matching the same id
 * @param items {Array} list of items
 * @param updatedItem {Item} item with updated data
 */
const updateItem = (items, updatedItem) => {
  const nextState = produce(items, draftItems => {
    const itemIndex = draftItems.findIndex(item => item.id === updatedItem.id)

    if(itemIndex >= 0)
      draftItems.splice(itemIndex, 1, updatedItem)
  })

  return nextState
}

/** 
 * Delete an item in list with specified id
 * @param items {Array} list of items
 * @param id id of item to delete
 */
const deleteItem = (items, id) => {
  const nextState = produce(items, draftItems => {
    const itemIndex = draftItems.findIndex(item => item.id === id)

    if(itemIndex >= 0)
      draftItems.splice(itemIndex, 1)
  })

  return nextState
}


export default (initialValue) => {
  const [items, setItems] = useState(initialValue);

  return {
    items,
    addItem: (itemText) => {
      const nextState = addItem(items, generateNewItem(itemText))
      setItems(nextState)
    },
    updateItem: updatedItem => {
      const nextState = updateItem(items, updatedItem)
      setItems(nextState)
    },
    deleteItem: id => {
      const nextState = deleteItem(items, id)
      setItems(nextState)
    }
  }

}
