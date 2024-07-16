<div align="center">
  <br />
    <a href="https://github.com/Xhoni96/e-commerce-Next.js/tree/main/e-commerce-admin" target="_blank">
      <img src="https://res.cloudinary.com/drvanrh8x/image/upload/v1721086505/assets/Dashboard_iy7acq.png" alt="CMS Banner">
    </a>
  <br />

  <div>
    <a href="https://nextjs.org/" target="_blank">
         <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    </a>
     <a href="https://www.typescriptlang.org/" target="_blank">
       <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    </a>
     <a href="https://tailwindcss.com/" target="_blank">
     <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    </a>
     <a href="https://www.edgedb.com/" target="_blank">
      <img src="https://img.shields.io/badge/EdgeDB-38ef7d?style=for-the-badge&color=38ef7d" alt="edgedb" />
    </a>
      <a href="https://clerk.com/" target="_blank">
      <img src="https://img.shields.io/badge/Clerk-black?style=for-the-badge&color=black&logo=clerk&logoColor=white" alt="clerk" />
    </a>
    <a href="https://stripe.com/" target="_blank">
      <img src="https://img.shields.io/badge/Stripe-635bff?style=for-the-badge&color=635bff&logo=stripe&logoColor=white" alt="stripe" />
    </a>
      <a href="https://ui.shadcn.com/" target="_blank">
      <img src="https://img.shields.io/badge/shadcn/ui-black?style=for-the-badge&color=black&logo=shadcn/ui&logoColor=white" alt="shadcn" />
    </a>
    </div >

  <h3 align="center">Eccommerce + Dashboard & CMS</h3>

   <div align="center">
     Fullstack responsive E-commerce Platform with Admin Dashboard and CMS. Responsive store for customers to browse and purchase products using Stripe checkout.
    </div> 
    </div>

## <a name="quick-start">🤸 Getting Started</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Installation**

Install the project dependencies using npm:

```bash
npm install

npm run generate_edgeql
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
# Clerk

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Cloudinary

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
FRONTEND_STORE_URL=http://localhost:3001

# Stripe
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
```

Replace the placeholder values with your actual credentials.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
