import Layout from '../components/Layout';
import Link from 'next/link';
import ItemInput from '../components/ItemInput';

export default function Index() {
  return (
    <Layout>
      <h1>Min App</h1>
      <ItemInput />
    </Layout>
  );
}