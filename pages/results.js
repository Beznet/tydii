import Layout from '../components/Layout';
import React, {useContext} from 'react'
import ItemContext from '../components/ItemContext'

export default function Results() {
    const { items  } = useContext(ItemContext)
    console.log(items)
    return (
    <Layout>
        {items}
    </Layout>
    );
}