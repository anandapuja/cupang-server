import { products } from "./seeders/productsSeed";
import { customers } from "./seeders/customersSeed";
import { Product } from "./seeders/productsSeed";
import { Customer } from "./seeders/customersSeed";
import { prisma } from "../src/utils/prisma";

async function seedProduct(products: Product[]) {
  for (const product of products) {
    const productImages = product.images;
    const upsertProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        slug: product.slug,
        price: product.price,
        description: product.description,
        stock: product.stock,
        sold: product.sold,
        images: {
          create: productImages,
        },
      },
      create: {
        name: product.name,
        slug: product.slug,
        price: product.price,
        description: product.description,
        stock: product.stock,
        sold: product.sold,
        images: {
          create: productImages,
        },
      },
    });
  }
}

async function seedCustomer(customers: Customer) {
  await prisma.customer.upsert({
    where: {
      username: customers.username,
    },
    update: customers,
    create: customers,
  });
}

seedProduct(products)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

seedCustomer(customers)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
