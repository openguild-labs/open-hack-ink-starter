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

- **Activity 1:** [Introduction to ink! and Setting up local development environment](#session-1)
- **Activity 2:** [Writing your first ink! smart contract](#session-2)
- **Activity 3:** [Deploying your smart contract to the Rococo network](#session-3)
- **Activity 4:** [Building a simple UI to interact with your smart contract](#session-4)

## 👉 Activity 1: Introduction to ink! and Polkadot {#session-1}

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

## 👉 Activity 2: Writing your first ink! smart contract {#session-2}

## 👉 Activity 3: Deploying your smart contract to the Rococo network {#session-3}

## 👉 Activity 4: Building a simple UI to interact with your smart contract {#session-4}

## Conclusion

---

# 🙌 How to contribute to the community?

To submit a proposal, ideas, or any questions, please submit them here: [OpenGuild Discussion 💬](https://github.com/orgs/openguild-labs/discussions)
View tickets and activities that you can contribute: [Community Activities 🖐️](https://github.com/orgs/openguild-labs/discussions/categories/activities)

- **Help to grow the community:** Community growth is a collective effort. By actively engaging with and inviting fellow enthusiasts to join our community, you play a crucial role in expanding our network. Encourage discussions, share valuable insights, and foster a welcoming environment for newcomers.

- **Participate in workshops and events:** Be an active participant in our workshops and events. These sessions serve as valuable opportunities to learn, collaborate, and stay updated on the latest developments in the Polkadot ecosystem. Through participation, you not only enhance your knowledge but also contribute to the collaborative spirit of OpenGuild. Share your experiences, ask questions, and forge connections with like-minded individuals.

- **Propose project ideas:** Your creativity and innovation are welcomed at OpenGuild. Propose project ideas that align with the goals of our community. Whether it's a new application, a tool, or a solution addressing a specific challenge in the Polkadot ecosystem, your ideas can spark exciting collaborations.

- **Contribute to our developer tools:** Get involved in the ongoing development and improvement of tools that aid developers in their projects. Whether it's through code contributions, bug reports, or feature suggestions, your involvement in enhancing these tools strengthens the foundation for innovation within OpenGuild and the broader Polkadot community.
