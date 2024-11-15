/*
  Warnings:

  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_product_Id_fkey";

-- DropTable
DROP TABLE "CartItem";

-- CreateTable
CREATE TABLE "carts_items" (
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" INTEGER NOT NULL,
    "sub_total_price" INTEGER NOT NULL,
    "product_Id" TEXT NOT NULL,
    "cart_id" TEXT NOT NULL,

    CONSTRAINT "carts_items_pkey" PRIMARY KEY ("product_Id","cart_id")
);

-- AddForeignKey
ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_product_Id_fkey" FOREIGN KEY ("product_Id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
