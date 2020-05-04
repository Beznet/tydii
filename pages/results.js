import Layout from '../components/Layout';
import React from 'react'
import usePersistedState from '../hooks/usePersistedState'

const LocalStateResults = () => {
  const [localStateItems, _] = usePersistedState('items', {})

  return (
    <div>
      {JSON.stringify(localStateItems)}
    </div>
  )

}

export default function Results() {
    return (
    <Layout>
        <LocalStateResults />
    </Layout>
    );
}