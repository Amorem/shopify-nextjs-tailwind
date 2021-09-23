const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storeFrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2021-07/graphql.json`;
  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storeFrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };
  try {
    const data = await fetch(URL, options).then((response) => response.json());
    return data;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
}

export async function getProductsInCollection() {
  const query = `{
        collectionByHandle(handle: "frontpage") {
          title
          products(first: 25) {
            edges {
              node {
                id
                title
                handle
                priceRange {
                    minVariantPrice {
                        amount
                    }
                }
                images(first: 5) {
                  edges {
                    node {
                      originalSrc
                      altText
                    }
                  }
                }
              }
            }
          }
        }
    }`;
  const response = await ShopifyData(query);
  const allProducts = response.data.collectionByHandle.products.edges
    ? response.data.collectionByHandle.products.edges
    : [];
  return allProducts;
}
