# Next Sanity Demo Store

![Next Sanity Demo Store](images/nsds.jpg)

Next Sanity Demo Store is an example ecommerce store website for educational purposes only. It is built on Next.js 13 with the app router. Pages and components are server side rendered wherever possible. It is coupled with Sanity headless CMS to handle all data. Nextauth with custom Sanity adapter is used for authentication flow. Paypal integration for payment processing, with server side verification for orders and payments in Next API routes. Global state is managed by Zustand and localstorage is used to store insensitive data.

Live site: [https://nsds.vercel.app/](https://nsds.vercel.app/)

## Stack

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

## Key Features

- Fully intergrated with Sanity CMS
- Statically generated category pages
- Statically generated individual product pages
- Paypal payment integration
- User account page with order history and user profile
- Cached shopping basket locally and stored in the database
- Protected pages and routes with middleware
