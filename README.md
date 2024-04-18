# tRPC + Express + React (with Vite) Scaffolding

This is a minimal monorepo for Express.js as backend and React frontend with tRPC support. Which is can be used as a starting point for any express trpc react application, with prisma.

## Clone and install dependencies 🏭

```bash
$ git clone https://github.com/Manan17/prisha-policy.git
$ cd prisha-policy
$ npm i --workspaces
# Only if using the prisma ORM
Create a database in Postgres and add this env:
PORT=3000
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database>?schema=public"
$ npx prisma db push
```

## Quick Start 🏃‍♂️

The quickest way to get started is to clone the project and install the dependencies using:

```bash
$ npm i --workspaces
$ npm run dev
```

## License 🎫

[MIT](LICENSE)

## Contribute 🤝

You can fork this repo and send me a PR.
