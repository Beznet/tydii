import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import useInputState from './useInputState';

const ItemForm = ({ saveItem }) => {
  const { value, reset, onChange } = useInputState('');
  const itemSubmit = event => {
    event.preventDefault();
    saveItem(value);
    reset();
  };

  return (
    <Form onSubmit={itemSubmit}>
      <FormGroup className="input-group justify-content-center mt-3">
        <Input
          id="inputItem"
          placeholder="Add Your Items Here"
          bsSize="lg"
          onChange={onChange}
          value={value}
        />
        <button
          type="submit"
          className="ml-2"
          color="primary"
          onClick={itemSubmit}
        >
          Add
        </button>
      </FormGroup>
    </Form>
  );
};

export default ItemForm;
