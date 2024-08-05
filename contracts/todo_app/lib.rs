//! # Todo App
//! This is a simple todo app smart contract that allows users to add and toggle todos.

#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod todo_app {
    use ink::prelude::string::String;
    use ink::storage::Mapping;

    /// Defines the storage of your contract.
    /// Add new fields to the below struct in order
    /// to add new static storage fields to your contract.
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

    impl TodoApp {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                todos: Mapping::default(),
                counter: Mapping::default(),
            }
        }

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

        #[ink(message)]
        pub fn toggle_todo(&mut self, id: u64) -> bool {
            let caller = self.env().caller();
            let todo = self.todos.get((caller, id)).unwrap();
            let mut todo = todo.clone();
            todo.completed = !todo.completed;
            self.todos.insert((caller, id), &todo);
            todo.completed
        }

        #[ink(message)]
        pub fn get_todo(&self, id: u64) -> Option<Todo> {
            let caller = self.env().caller();
            Some(self.todos.get((caller, id)).unwrap())
        }
    }

    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    /// module and test functions are marked with a `#[test]` attribute.
    /// The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// We test if the default constructor does its job.
        #[ink::test]
        fn init_works() {
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

            // Set the contract as callee and Alice as caller.
            let contract = ink::env::account_id::<ink::env::DefaultEnvironment>();
            ink::env::test::set_callee::<ink::env::DefaultEnvironment>(contract);
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.alice);

            let todo_app = TodoApp::default();
            assert_eq!(todo_app.counter.get(&accounts.alice).unwrap_or_default(), 0);
        }

        #[ink::test]
        fn add_todo_works() {
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

            // Set the contract as callee and Alice as caller.
            let contract = ink::env::account_id::<ink::env::DefaultEnvironment>();
            ink::env::test::set_callee::<ink::env::DefaultEnvironment>(contract);
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.alice);

            let mut todo_app = TodoApp::default();

            todo_app.add_todo("Go shoping with crush".to_string());

            assert_eq!(todo_app.counter.get(&accounts.alice).unwrap_or_default(), 1);

            let todo = todo_app.todos.get(&(accounts.alice, 0)).unwrap();

            assert_eq!(todo.id, 0);
            assert_eq!(todo.content, "Go shoping with crush".to_string());
            assert_eq!(todo.completed, false);
        }

        #[ink::test]
        fn toggle_todo_works() {
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

            // Set the contract as callee and Alice as caller.
            let contract = ink::env::account_id::<ink::env::DefaultEnvironment>();
            ink::env::test::set_callee::<ink::env::DefaultEnvironment>(contract);
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.alice);

            let mut todo_app = TodoApp::default();

            todo_app.add_todo("Go shoping with crush".to_string());

            let todo = todo_app.todos.get(&(accounts.alice, 0)).unwrap();

            assert_eq!(todo.completed, false);

            todo_app.toggle_todo(0);

            let todo = todo_app.todos.get(&(accounts.alice, 0)).unwrap();

            assert_eq!(todo.completed, true);
        }

        #[ink::test]
        fn get_todo_works() {
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

            // Set the contract as callee and Alice as caller.
            let contract = ink::env::account_id::<ink::env::DefaultEnvironment>();
            ink::env::test::set_callee::<ink::env::DefaultEnvironment>(contract);
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.alice);

            let mut todo_app = TodoApp::default();

            todo_app.add_todo("Go shoping with crush".to_string());

            let todo = todo_app.get_todo(0).unwrap();

            assert_eq!(todo.id, 0);
            assert_eq!(todo.content, "Go shoping with crush".to_string());
            assert_eq!(todo.completed, false);
        }
    }
}
