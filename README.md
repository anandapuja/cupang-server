# Cupang Server

This is Restful API of Cupang Commerce.

# Backend Tech Stack

1. Typescript
2. Bun
3. Hono
   1. Zod
   2. JWT
   3. Bycript
4. Prisma ORM
5. Postgresql

### Backend API Endpoints

Priority:

| Endpoint        | HTTP     | Description          | Permission |
| --------------- | -------- | -------------------- | ---------- |
| `/products`     | `GET`    | Get all products     | Public     |
| `/products/:id` | `GET`    | Get product by id    | Public     |
| `/products`     | `POST`   | Add new product      | Admin      |
| `/products`     | `DELETE` | Delete all products  | Admin      |
| `/products/:id` | `DELETE` | Delete product by id | Admin      |
| `/products/:id` | `PATCH`  | Update product by id | Admin      |

With Auth:

| Endpoint          | HTTP     | Description              | Permission    |
| ----------------- | -------- | ------------------------ | ------------- |
| `/users`          | `GET`    | Get all users            | Public        |
| `/users/:id`      | `GET`    | Get user by id           | Public        |
| `/auth/register`  | `POST`   | Register new user        | Public        |
| `/auth/login`     | `POST`   | Login user               | Public        |
| `/auth/me`        | `GET`    | Check authenticated user | Authenticated |
| `/auth/logout`    | `POST`   | Logout user              | Authenticated |
| `/cart`           | `GET`    | Get user's cart          | Authenticated |
| `/cart/items`     | `POST`   | Add product to cart      | Authenticated |
| `/cart/items/:id` | `DELETE` | Delete product from cart | Authenticated |
| `/cart/items/:id` | `PATCH`  | Update product quantity  | Authenticated |
