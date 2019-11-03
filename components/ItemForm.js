import React from 'react'
import useInputState from './useInputState';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';

const ItemForm = ({saveItem}) => {
  const {value, reset, onChange} = useInputState('')
  const itemSubmit = (event) => {
    event.preventDefault();
    saveItem(value);
    reset();
  }

  return (
    <div>
      <Form
        onSubmit={itemSubmit}
      >
      <FormGroup>
        <Input 
          id="inputItem"
          placeholder="item input"
          onChange={onChange}
          value={value}
        />
        <Button onClick={itemSubmit}>Submit</Button>
      </FormGroup>
      </Form>
    </div>
  )
}

export default ItemForm