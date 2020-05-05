import Layout from '../components/Layout'
import React from 'react'
import usePersistedState from '../hooks/usePersistedState'
import useSWR from 'swr'

export default function LocalStateResults () {
  const [localStateItems, _] = usePersistedState('items', {})
  const localStateValues = Object.values(localStateItems)
  const donate = localStateValues.filter( item => item.rating <= 3)
  const keep = localStateValues.filter( item => item.rating > 3)

  const {data} = useSWR('/api/me', async function(args) {
    const res = await fetch(args);
    return res.json();
  });
  if(!data) {
    console.log('no data')
  }
  else if (data.userId) {
    console.log('logged in')
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch('/api/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: data.userId,
        list: localStateItems
      }),
    })
      .then((r) => r.json())
  }

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
      <button type='submit' onClick={handleSubmit}>Save</button>
    </Layout>
  )
}