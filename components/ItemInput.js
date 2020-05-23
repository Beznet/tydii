import React from 'react'
import { Form, FormGroup, Input } from 'reactstrap'
import useInputState from './useInputState'

const ItemInput = ({ saveItem }) => {
  const { value, reset, onChange } = useInputState('')
  const itemSubmit = event => {
    event.preventDefault()
    saveItem(value)
    reset()
  }

  return (
    <Form onSubmit={itemSubmit}>
      <FormGroup className="input-group justify-content-center mt-3">
        <Input
          id="inputItem"
          placeholder="stuff goes here"
          bsSize="lg"
          onChange={onChange}
          value={value}
        />
        <button
          type="submit"
          id="action-button"
          className="ml-2"
          onClick={itemSubmit}
        >
          Add
        </button>
      </FormGroup>
    </Form>
  )
}

export default ItemInput
