#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod hello_world {
    use ink::prelude::string::String;

    /// Defines the storage of your contract.
    /// Add new fields to the below struct in order
    /// to add new static storage fields to your contract.
    #[ink(storage)]
    pub struct HelloMessage {
        author: AccountId,
        message: String,
        count: u64,
    }

    impl HelloMessage {
        /// Constructor that initializes the `HelloMessage` struct with default values.
        #[ink(constructor)]
        pub fn default() -> Self {
            Self {
                author: Self::env().caller(),
                message: String::from("Hello, World!"),
                count: Default::default(),
            }
        }

        /// A function that returns the current state of your contract.
        #[ink(message)]
        pub fn get(&self) -> (AccountId, String, u64) {
            (self.author, self.message.clone(), self.count)
        }

        /// A function that allows the caller to set a new message.
        #[ink(message)]
        pub fn set(&mut self, new_message: String) {
            self.author = self.env().caller();
            self.message = new_message;
            self.count = self.count.checked_add(1).unwrap();
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn default_works() {
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

            // Set the contract as callee and Alice as caller.
            let contract = ink::env::account_id::<ink::env::DefaultEnvironment>();
            ink::env::test::set_callee::<ink::env::DefaultEnvironment>(contract);
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.alice);
            let hello_message = HelloMessage::default();
            assert_eq!(
                hello_message.get(),
                (accounts.alice, "Hello, World!".to_string(), 0)
            );
        }

        #[ink::test]
        fn it_works() {
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            // Set the contract as callee and Alice as caller.
            let contract = ink::env::account_id::<ink::env::DefaultEnvironment>();
            ink::env::test::set_callee::<ink::env::DefaultEnvironment>(contract);
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.alice);

            let mut hello_message = HelloMessage::default();
            assert_eq!(
                hello_message.get(),
                (accounts.alice, "Hello, World!".to_string(), 0)
            );

            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.bob);

            hello_message.set("Hello, I'm Bob".to_string());
            assert_eq!(
                hello_message.get(),
                (accounts.bob, "Hello, I'm Bob".to_string(), 1)
            );
        }
    }
}
