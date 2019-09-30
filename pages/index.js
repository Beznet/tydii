import Layout from '../components/Layout';
import ItemForm from '../components/ItemForm';

export default function Index() {
  return (
    <Layout>
      <h1>Min App</h1>
      <ItemForm 
        saveItem={console.warn}
      />
    </Layout>
  );
}