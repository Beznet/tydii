import React from 'react'
import useInputState from './useInputState';
import { Col, Row, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';

const ItemForm = ({saveItem}) => {
  const {value, reset, onChange} = useInputState('')
  const itemSubmit = (event) => {
    event.preventDefault();
    saveItem(value);
    reset();
  }

  return (
        <Form
          onSubmit={itemSubmit}
        >
        <FormGroup className='input-group'>
          <Input
            id='inputItem'
            placeholder='Add Your Items Here'
            bsSize='lg'
            onChange={onChange}
            value={value}
          />
          <Button color="primary" onClick={itemSubmit}>Add</Button>
        </FormGroup>
        </Form>
  )
}

export default ItemForm