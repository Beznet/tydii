import React from 'react';
import { Table } from 'reactstrap';

const DecisionTable = ({items}) => {
  const keep = [];
  const donate = [];
  
  for (const item of items) {
    if (item.rating <= 3) {
      donate.push(item)
    } else {
      keep.push(item)
    }
  }

  console.log('keep', keep, 'donate', donate)

  return (
    <Table>
      <thead>
        <tr>
          <th>Donate</th>
          <th>Keep</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
        </tr>
        <tr>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr>
        <tr>
          <td>Larry</td>
          <td>the Bird</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default DecisionTable;
