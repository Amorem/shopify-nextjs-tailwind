const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storeFrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const gql = String.raw;

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
  const query = gql`
    {
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
    }
  `;
  const response = await ShopifyData(query);
  const allProducts = response.data.collectionByHandle.products.edges
    ? response.data.collectionByHandle.products.edges
    : [];
  return allProducts;
}

export async function getAllProducts() {
  const query = gql`
    {
      products(first: 25) {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `;
  const response = await ShopifyData(query);
  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];
  return slugs;
}

export async function getProductByHandle(handle) {
  const query = gql`
    {
        productByHandle(handle: "${handle}") {
          id
          title
          handle
          description
          images(first: 5) {
            edges {
              node {
                altText
                originalSrc
              }
            }
          }
          options {
            name
            id
            values
          }
          variants (first: 25) {
            edges {
              node {
                selectedOptions {
                  name
                  value
                }
                image {
                  originalSrc
                  altText
                }
                title
                id
                priceV2 {amount}
              }
            }
          }
        }
      }`;
  const response = await ShopifyData(query);
  const product = response.data.productByHandle
    ? response.data.productByHandle
    : [];
  return product;
}

export async function createCheckout(id, quantity) {
  const query = gql`
    mutation {
      checkoutCreate(input: { lineItems: [{ variantId: "${id}", quantity: ${quantity} }] }) {
        checkout {
          id
          webUrl
        }
      }
    }
  `;
  const response = await ShopifyData(query);
  const checkout = response.data.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : [];
  return checkout;
}

export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map((item) => {
    return `{
      variantId: "${item.id}",
      quantity: ${item.variantQuantity}
    }`;
  });

  const query = gql` 
    mutation {
      checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
        checkout {
          id
          webUrl
          lineItems(first: 25) {
            edges {
              node {
                id
                title
                quantity
              }
            }
        }
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  const checkout = response.data.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : [];
  return checkout;
}
