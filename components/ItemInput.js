import React from 'react'
import { Form, FormGroup, Input } from 'reactstrap'
import useInputState from '../hooks/useInputState'

const ItemInput = ({ saveItem }) => {
  const { value, reset, onChange } = useInputState('')

  const itemSubmit = e => {
    e.preventDefault()
    saveItem(value)
    reset()
  }

  return (
    <Form onSubmit={itemSubmit}>
      <FormGroup className="input-group justify-content-center mt-3">
        <Input
          id="inputItem"
          placeholder="enter items here"
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
