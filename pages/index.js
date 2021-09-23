import { getProductsInCollection } from "../lib/shopify";

export default function Home() {
  return <div className="text-3xl">Hello from Shopify NextJS</div>;
}

export async function getStaticProps() {
  const products = await getProductsInCollection();
  return {
    props: {
      products,
    },
  };
}
