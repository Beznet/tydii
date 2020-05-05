import Layout from '../components/Layout';
import React from 'react'
import usePersistedState from '../hooks/usePersistedState'

export default function LocalStateResults () {
  const [localStateItems, _] = usePersistedState('items', {})
  const localStateValues = Object.values(localStateItems)
  const donate = localStateValues.filter( item => item.rating <= 3)
  const keep = localStateValues.filter( item => item.rating > 3)




  // todo: take each item name/rating and list it into different categories
  return (
    <Layout>
      <div>
        <h2>Keep</h2>
        {
          keep.map( item => <li>{item.name}</li>)
        }
      </div>
      <div>
        <h2>Donate</h2>
        {
          donate.map( item => <li>{item.name}</li>)
        }
      </div>
    </Layout>
  )
}