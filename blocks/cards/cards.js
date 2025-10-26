import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
    console.log("block",block)
  const res = await fetch("https://dummyjson.com/products");
  const { products } = await res.json();
  console.log("products",products)
  const ul = document.createElement('ul');
  ul.classList.add('product-list');

  products.forEach((product) => {
    const li = document.createElement('li');
    li.classList.add('product-item');

    const picture = createOptimizedPicture(product.images, product.title, false, [{ width: '750' }]);
    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    li.append(picture, title, price);
    ul.append(li);
  });

  block.textContent = ''; // Clear existing content
  block.append(ul);
}
