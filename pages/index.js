import { getProductsInCollection } from "../lib/shopify";
import ProductList from "../components/ProductList";
import Hero from "../components/Hero";
import Head from "next/head";

export default function Home({ products }) {
  return (
    <div className="">
      <Head>
        <title>Modern eCommerce Example</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          http-equiv="Content-Type"
          content="text/html; charset=ISO-8859-1"
        />
        <meta
          name="description"
          content="Modern eCommerce Example focusing on Shopify, NextJS, TailwindCSS, and GraphQL "
        />
        <meta property="og:title" content="Modern eCommerce Example" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vercel.com/amorem/shopify-nextjs-tailwind"
        />
        <meta
          property="og:image"
          content="https://vercel.com/amorem/shopify-nextjs-tailwind/images/share.png"
        />
        <meta
          property="og:description"
          content="Modern eCommerce Example focusing on Shopify, NextJS, TailwindCSS, and GraphQL "
        />
        <meta property="og:locale" content="en-US" />
        <meta property="og:site_name" content="Modern eCommerce Example" />
      </Head>
      <Hero />
      <ProductList products={products} />
    </div>
  );
}

export async function getStaticProps() {
  const products = await getProductsInCollection();
  return {
    props: {
      products,
    },
  };
}
