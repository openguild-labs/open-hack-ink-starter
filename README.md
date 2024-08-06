# OpenHack ink! Starter ✒️

Getting started with ink! smart contract development. This repository is made by OpenGuild community to educate newcomers about ink! smart contract development.

## What is `ink!`?

[Read a full article made by OpenGuild community member](https://hongthaipham.github.io/blog/2024/07/25/ink-your-way-to-decentralized-apps-a-polkadot-smart-contract-tutorial#3-implement-the-smart-contract).

Polkadot is not just another blockchain; it's a paradigm shift in blockchain architecture. Unlike traditional monolithic blockchains, Polkadot envisions a future of interconnected chains, ushering in a new era of cross-chain interoperability.

Imagine a network where specialized blockchains, each optimized for specific tasks, seamlessly communicate and transact with one another. This is the essence of Polkadot.

Ready to dive into the world of decentralized applications on Polkadot? This tutorial will guide you through building your first dApp using `Ink!`, Polkadot's powerful smart contract language.

We will walk you through every step, from writing your first smart contract to deploying it on the Polkadot network. Finally, This workshop tutorial show you how to interact with your creation using a built-in UI.

## Learn more about OpenGuild

- **About us:** [Learn more about us](https://openguild.wtf/about)
- **Website:** [OpenGuild Website](https://openguild.wtf/)
- **Github:** [OpenGuild Labs](https://github.com/openguild-labs)
- **Discord**: [Openguild Discord Channel](https://discord.gg/bcjMzxqtD7)

## 🎯 Goals of the workshop

1. Get familiar with Git & Github via open-source contribution
   - Install `git` on your local device
   - Git `fork` and `clone` command
   - `commit` and `push` code from your local device to Github
   - Create a `Pull Request` and merge with this repository
2. Install and setup Rust and `cargo contract` on your local device
3. Install and setup ink! project
4. Connect to Rococo Contract network
5. Build and deploy your first ink! smart contract
6. Build a simple UI to interact with your smart contract

## Prerequisites

- Basic knowledge of Rust programming language
- Basic knowledge of React.js
- Basic knowledge of Polkadot network

## Workshop Agenda

- **Activity 1:** [Introduction to ink! and Setting up local development environment](#-activity-1-introduction-to-ink-and-polkadot)
- **Activity 2:** [Writing your first ink! smart contract](#-activity-2-writing-your-first-ink-smart-contract)
- **Activity 3:** [Deploying your smart contract to the Rococo network](#-activity-3-deploying-your-smart-contract-to-the-rococo-network)
- **Activity 4:** [Building a simple UI to interact with your smart contract](#-activity-4-building-a-simple-ui-to-interact-with-your-smart-contract)

## 👉 Activity 1: Introduction to ink! and Setting up local development environment

### What is ink!?

`Ink!` is a smart contract language developed by `Parity Technologies`. First introduced in 2018, Ink! has continued to evolve, with the latest version (as of this writing) being Ink! 5.0.

`Ink!` designed for `Substrate-based blockchains` comes with `Contract Pallet`, a runtime module that allows developers to deploy and execute smart contracts on the Polkadot network. It's based on `Rust`, a popular programming language known for its performance and safety features.

### Why ink!?

- **Performance:** Ink! smart contracts are compiled to WebAssembly (Wasm), enabling high performance and efficiency.

- **Safety:** Rust's strong type system and memory safety features help prevent common bugs and vulnerabilities in smart contracts.

### Setting up local development environment

- Install Rust: [Rust Installation Guide](https://www.rust-lang.org/tools/install)

If you already have Rust installed, update it to the latest version by running the following command:

```bash
rustup update
rustup component add rust-src
rustup target add wasm32-unknown-unknown --toolchain nightly
```

- Install `cargo-contract`

```bash
rustup component add rust-src
cargo install --force --locked cargo-contract
```

## 👉 Activity 2: Writing your first ink! smart contract

We will create a simple Todo smart contract use ink!. The smart contract will allow users to add, view, and toggle the status of todos.

### Create a new ink! project

```bash
cargo contract new todo_app
cd todo_app
```

### Define the smart contract storage

```rust
#[derive(Default, Clone)]
#[ink::scale_derive(Encode, Decode, TypeInfo)]
#[cfg_attr(feature = "std", derive(ink::storage::traits::StorageLayout))]
pub struct Todo {
   pub id: u64,
   pub content: String,
   pub completed: bool,
}

#[ink(storage)]
#[derive(Default)]
pub struct TodoApp {
   todos: Mapping<(AccountId, u64), Todo>,
   counter: Mapping<AccountId, u64>,
}
```

We define a struct `Todo` to represent a single todo item. It contains three fields: `id` to uniquely identify the todo, `content` to store the todo text, and `completed` to track the status of the todo.

- `#[derive(Default, Clone)]` is used to implement the `Default` and `Clone` traits for the `Todo` struct.
- `#[ink::scale_derive(Encode, Decode, TypeInfo)]` is used to derive the `Encode`, `Decode`, and `TypeInfo` traits for the `Todo` struct. These traits are required for encoding and decoding the struct data.
- `#[cfg_attr(feature = "std", derive(ink::storage::traits::StorageLayout)]` is used to derive the `StorageLayout` trait for the `Todo` struct. This trait is required for generating the storage layout of the struct. You can read more about storage layout at [here](https://use.ink/datastructures/storage-layout). Because we use a custom struct `Todo` to store data, we need to implement the `StorageLayout` trait for it. It helps the `ink!` runtime determine how to lay out the Todo struct's data in the contract's storage space to optimize storage usage and access patterns. The `StorageLayout` trait is part of the `ink::storage::traits` module.

The `TodoApp` struct contains two storage mappings: `todos` to store todo items and `counter` to generate unique IDs for todos. This is main struct of our smart contract.

- `#[ink(storage)]` is used to define the storage layout of the smart contract. This attribute tells the ink! compiler that the `TodoApp` struct should be stored in the contract's storage.
- `#[derive(Default)]` is used to implement the `Default` trait for the `TodoApp` struct.

To save todo items, we use a mapping `todos` with the key `(AccountId, u64)` and value `Todo`. The key is a tuple of `AccountId` and `u64`, where `AccountId` is the caller's account ID and `u64` is the todo ID. The value is a `Todo` struct representing the todo item. This mapping is used to store todo items in the contract's storage. Read more about `Mapping` at [here](https://use.ink/datastructures/mapping).

To generate unique IDs for todo items, we use another mapping `counter` with the key `AccountId` and value `u64`. The key is the caller's account ID, and the value is the next available todo ID. This mapping is used to keep track of how many todo items have been added by each caller.

### Implement contructor to initialize the smart contract

```rust
#[ink(constructor)]
pub fn new() -> Self {
   Self {
         todos: Mapping::default(),
         counter: Mapping::default(),
   }
}
```

The `new` function initializes the `TodoApp` struct with default values for the `todos` and `counter` mappings. This constructor is called when the smart contract is deployed to the blockchain. It sets up the initial state of the smart contract.

The `new` function is marked with the `#[ink(constructor)]` attribute. This attribute tells the `ink!` compiler that the function should be treated as a constructor. At the first time, we will create a new instance of the `TodoApp` struct and initialize the `todos` and `counter` mappings with default values.

### Implement the add_todo function

```rust
#[ink(message)]
pub fn add_todo(&mut self, content: String) {
   let caller = self.env().caller();
   let id = self.counter.get(caller).unwrap_or_default();

   let todo = Todo {
         id,
         content,
         completed: false,
   };
   self.todos.insert((caller, id), &todo);

   let next_id = id.checked_add(1).unwrap();
   self.counter.insert(caller, &next_id);
}
```

The `add_todo` function allows users to add a new todo item to the smart contract. It takes a `content` parameter representing the text of the todo item. The function performs the following steps:

- Get the caller's account ID using `self.env().caller()`.
- Get the next available todo ID for the caller from the `counter` mapping using `self.counter.get(caller).unwrap_or_default()`. If the caller has not added any todo items yet, the default value of `u64` (0) is used as the todo ID.
- Insert the new todo item into the `todos` mapping using `self.todos.insert((caller, id), &todo)`. The key is a tuple of the caller's account ID and the todo ID, and the value is the `Todo` struct representing the todo item.
- At last, increment the todo ID by 1 and update the `counter` mapping with the new value using `self.counter.insert(caller, &next_id)`.

### Implement the get_todos function

```rust
#[ink(message)]
pub fn get_todo(&self, id: u64) -> Option<Todo> {
   let caller = self.env().caller();
   Some(self.todos.get((caller, id)).unwrap())
}
```

The `get_todo` function allows users to retrieve a specific todo item by its ID. It takes an `id` parameter representing the ID of the todo item to retrieve.

### Implement the toggle_todo function

```rust
#[ink(message)]
pub fn toggle_todo(&mut self, id: u64) -> bool {
   let caller = self.env().caller();
   let todo = self.todos.get((caller, id)).unwrap();
   let mut todo = todo.clone();
   todo.completed = !todo.completed;
   self.todos.insert((caller, id), &todo);
   todo.completed
}
```

The `toggle_todo` function allows users to toggle the completion status of a todo item. It takes an `id` parameter representing the ID of the todo item to toggle. The function performs the following steps:

- Get the caller's account ID using `self.env().caller()`.

- Retrieve the todo item from the `todos` mapping using `self.todos.get((caller, id)).unwrap()`. If the todo item does not exist, the function will panic.

- Clone the todo item to modify its completion status using `let mut todo = todo.clone()`.

- Toggle the completion status of the todo item using `todo.completed = !todo.completed`.

- Update the todo item in the `todos` mapping with the modified completion status using `self.todos.insert((caller, id), &todo)`.

- Return the new completion status of the todo item.

### 🙋 Challenge: Improve the contract

- The `get_todo` function on Mapping return Option types. Using unwrap() directly assumes the value always exists, which could lead to panics (contract aborts) if a user requests a non-existent todo. Make it better.

- Currently, the contract only allows adding and toggle todo status. There are no ways to get list of todos of a user. Implement a new function to get all todos of a user.

- Add a new function to edit the content of a todo item.

## 👉 Activity 3: Deploying your smart contract to the Rococo network

At this point, you have successfully written your first ink! smart contract. The next step is to deploy it to the Rococo network, a Polkadot testnet, and interact with it using a UI at [here](https://ui.use.ink/?rpc=wss://rococo-contracts-rpc.polkadot.io).

### Add Rococo Contract network to SubWallet

- Open SubWallet and click on the `Settings` icon in the top right corner.

- Click on `Networks` and then `Add Network`.

- Enter the following details:

  - **Provider URL:** wss://rococo-contracts-rpc.polkadot.io
  - **Chain ID:** 42
  - **Name:** Rococo Contracts

- Click `Save` to add the Rococo Contracts network to SubWallet.

### Build smart contract

Run this command in the root directory of your `ink!` project to build the smart contract:

```bash
cargo contract build
```

This command compiles the smart contract code and generates the necessary Wasm and metadata files for deployment. If build is successful, you will see the following output:

```bash
Original wasm size: 46.2K, Optimized: 17.0K

The contract was built in DEBUG mode.

Your contract artifacts are ready. You can find them in:
/contracts/todo_app/target/ink

- todo_app.contract (code + metadata)
- todo_app.wasm (the contract's code)
- todo_app.json (the contract's metadata)
```

With the contract artifacts generated, you are ready to deploy the smart contract to the Rococo network.

### Deploy smart contract

Access the [UI for ink! contracts](https://ui.use.ink/?rpc=wss://rococo-contracts-rpc.polkadot.io) and connect to the Rococo Contracts network.

- Click on the `Add new contract` button at the sidebar.

- Click `Upload new contract code` and select the `todo_app.contract` file generated in the previous step to upload the contract code and metadata.

- Click `Next` to go to the instantiate screen.

- At this screen, if you have more than one constructor, you can select the constructor you want to use. In this case, select the `new()` constructor.

- Click `Next` and then `Upload and Instantiate` button to deploy the smart contract to the Rococo network.

- Once the contract is deployed, you will see the contract address and other details on the screen.

- Save the contract address to use it in the next step.

## 👉 Activity 4: Building a simple UI to interact with your smart contract

Now that you have deployed your smart contract to the Rococo network, it's time to build a simple UI to interact with it. We will use the Next.js framework to create a React.js application that connects to the contract and allows users to add, view, and toggle todo items.

### Create a new Next.js project

Run the following command to create a new Next.js project:

```bash
npx create-next-app todo-app-ui
cd todo-app-ui
```

### Install the required dependencies

This workshop uses the [`dedot`](https://github.com/dedotdev/dedot), a delightful JavaScript/TypeScript client for Polkadot & Substrate. Install the library by running the following command:

```bash
pnpm add dedot @polkadot/extension-inject
pnpm add -D @dedot/chaintypes
```

### Generate types for the smart contract

`dedot` includes a tool to generate types for `ink!` smart contracts. Follow the steps below to generate types for your smart contract:

- Copy 3 files `todo_app.contract`, `todo_app.wasm`, and `todo_app.json` from the `ink!` project to `artifacts` folder in the Next.js project.

- At root directory of Next.js project, run the following command to generate types for the smart contract:

```bash
npx dedot typink -m ./artifacts/todo_app.json -o ./lib
```

This command generates TypeScript types for the smart contract based on the metadata file `todo_app.json`. The types will be saved in the `lib` folder.

```bash
├── lib
├──── todo-app
├────── index.d.ts
├────── constructor-query.d.ts
├────── constructor-tx.d.ts
├────── events.d.ts
├────── tx.d.ts
├────── types.d.ts
```

This generated types will help you interact with the smart contract easily.

### Connect frontend to the blockchain

To connect the frontend to the SubWallet, you need to add the following code:

```typescript
const injectedWindow = window as Window & InjectedWindow;

// Get subwallet-js injected provider to connect with SubWallet
const provider: InjectedWindowProvider =
  injectedWindow.injectedWeb3["subwallet-js"];

const injected: Injected = await provider.enable!("Todo Dapp");
```

Init the `dedot` library with the injected provider:

```typescript
export const ROCOCO_CONTRACT = {
  name: "rococo-contracts",
  endpoint: "wss://rococo-contracts-rpc.polkadot.io",
  decimals: 12,
  prefix: 42,
  symbol: "ROC",
};

const wsProvider = new WsProvider(ROCOCO_CONTRACT.endpoint);
const client = new DedotClient(wsProvider);
await client.connect();
```

Initialize the contract instance:

```typescript
import { Contract, ContractMetadata } from "dedot/contracts";
import { TodoAppContractApi } from "@/lib/todo-app";

const contract = new Contract<TodoAppContractApi>(
  dedotClient,
  todoMetadata as ContractMetadata,
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESSS as string
);
```

- `TodoAppContractApi` is the generated types for the smart contract what we generated in the previous step.
- `todoMetadata` is the metadata of the smart contract. You can import it from `todo_app.json` file in the `artifacts` folder.
- `NEXT_PUBLIC_CONTRACT_ADDRESSS` is the contract address that you deployed to the Rococo network.

With the contract instance initialized, you can now interact with the smart contract using the provided API.

### Interact with the smart contract

Query `getCounter` function from the smart contract to get the current counter value, what is the number of todos that user added.

```typescript
const result = await contract?.query.getCounter(account.address, {
  caller: account.address,
});
```

Query `getTodo` function from the smart contract to get the todo item by its ID.

```typescript
const result = await contract?.query.getTodo(id, {
  caller: account.address,
});
```

Call `toggleTodo` function from the smart contract to toggle the completion status of a todo item.

```typescript
const { raw } = await contract.query.toggleTodo(id, {
  caller: account.address,
});

contract.tx
  .toggleTodo(id, {
    gasLimit: raw.gasRequired,
  })
  .signAndSend(
    account.address,
    {
      signer: signer,
    },
    async ({ status, events }) => {
      if (
        status.type === "BestChainBlockIncluded" ||
        status.type === "Finalized"
      ) {
        resolve(id.toString());
      }
    }
  );
```

At first, we will call query function to get the gas required for the transaction. Then, we will use the gas required from the query result to sign and send the transaction.

To create a new todo item, call the `addTodo` function from the smart contract. This function takes the content of the todo item as a parameter.

```typescript
const { raw } = await contract.query.addTodo(data.content, {
  caller: account.address,
});

contract.tx
  .addTodo(data.content, {
    gasLimit: raw.gasRequired,
  })
  .signAndSend(
    account.address,
    {
      signer: signer,
    },
    async ({ status, events }) => {
      if (
        status.type === "BestChainBlockIncluded" ||
        status.type === "Finalized"
      ) {
        resolve(data);
      }
    }
  );
```

Similar to the `toggleTodo` function, we first call the query function to get the gas required for the transaction. Then, we use the gas required from the query result to sign and send the transaction.

To make a transaction, you need to sign the transaction with the user's account. You can use the `signer` object to sign the transaction. The `signer` object is created using the `injected` object obtained from the injected provider.

```typescript
const signer = injected?.signer;
```

## Conclusion

Congratulations! You have successfully completed the workshop and built your first Dapp on Polkadot. You have learned how to write `ink!` smart contracts, deploy them to the Rococo network, and build a simple UI to interact with them. We hope you enjoyed the workshop and found it informative. If you have any questions or feedback, feel free to reach out to us on Discord or GitHub.

You can find the complete code for the smart contract and UI in this repository. Feel free to explore the code, experiment with it, and build on top of it. We encourage you to continue learning and building on Polkadot and contribute to the OpenGuild community.

- [ink! smart contract](/contracts/todo_app/)
- [Nextjs UI](/frontend/todo-app-ui/)
- Demo: https://open-hack-ink-starter.vercel.app/

---

# 🙌 How to contribute to the community?

To submit a proposal, ideas, or any questions, please submit them here: [OpenGuild Discussion 💬](https://github.com/orgs/openguild-labs/discussions)
View tickets and activities that you can contribute: [Community Activities 🖐️](https://github.com/orgs/openguild-labs/discussions/categories/activities)

- **Help to grow the community:** Community growth is a collective effort. By actively engaging with and inviting fellow enthusiasts to join our community, you play a crucial role in expanding our network. Encourage discussions, share valuable insights, and foster a welcoming environment for newcomers.

- **Participate in workshops and events:** Be an active participant in our workshops and events. These sessions serve as valuable opportunities to learn, collaborate, and stay updated on the latest developments in the Polkadot ecosystem. Through participation, you not only enhance your knowledge but also contribute to the collaborative spirit of OpenGuild. Share your experiences, ask questions, and forge connections with like-minded individuals.

- **Propose project ideas:** Your creativity and innovation are welcomed at OpenGuild. Propose project ideas that align with the goals of our community. Whether it's a new application, a tool, or a solution addressing a specific challenge in the Polkadot ecosystem, your ideas can spark exciting collaborations.

- **Contribute to our developer tools:** Get involved in the ongoing development and improvement of tools that aid developers in their projects. Whether it's through code contributions, bug reports, or feature suggestions, your involvement in enhancing these tools strengthens the foundation for innovation within OpenGuild and the broader Polkadot community.
