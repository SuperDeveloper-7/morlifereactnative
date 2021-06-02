import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('R8A8RQUVDK', 'eda0158136c7d12c25d2a0be60a76995');
const index = client.initIndex('dev_ROUTINES');

export default async function searchPublicRoutines(key) {
  const { hits } = await index.search(key);
  return hits;
}
