## Money Manager
(This project is being developed...)

THE PRODUCT

An easy way to manage and take control of your finances. You can create monthly budgets, register all your transactions, and define different categories for your expenditures. You only need to focus on recording your transactions and creating budgets; this product will handle all your finances, providing:

- Clarity on how far your money stretches till the end of the month.
- Insight into how much money you can spend in each expense category.
- Quick and easy transaction registration.
- Easy adjustment of your accounts whenever needed.
- The ability to manage all aspects of your personal finances easily, always maintaining control.
  
THE PROJECT

This project has been planned and developed with the intention of making it available for anyone looking to organize their personal finances.

It has been designed with a Mobile-First approach, as using it through the phone is the simplest way to develop the habit of recording all your transactions. Whether it's a simple cup of coffee or paying your rent, this project aims to make financial management seamless.

The project is being developed using the following technologies:

- React
- Next.js 14
- TypeScript
- Tailwind
- CSS modules
- Prisma ORM (handling database)
  
It is designed under the server-side rendering philosophy, prioritizing server-side processing and leaving client-side rendering for user interactivity. Most data fetching is done in the server component that needs the data or in the page component passing data to the client component requiring it. Currently, no React hooks or global state handlers are being used. Client and server connections are established through Next.js server actions. All database tables are created to ensure the app functions properly. Database modifications are made using Prisma ORM, taking into consideration the preservation of data consistency using $transactions.

The project will continue to grow with the following features:

- User authentication
- Debts handling
- Savings handling
- Voice interface for transaction creation
- Desktop version
