import Layout from '../components/Layout';
import React from 'react'
import usePersistedState from '../hooks/usePersistedState'

const LocalStateResults = () => {
    const [localStateItems, _] = usePersistedState()
    
    const newLocalStateItems = localStateItems

    return (
      <div>
          {newLocalStateItems}
      </div>
    )
  
  }

export default function Results() {
    return (
    <Layout>
        {typeof window !== 'undefined' ? <LocalStateResults /> : 'window not there'}
    </Layout>
    );
}