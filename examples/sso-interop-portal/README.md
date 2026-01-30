# SSO Interop Portal

This example shows how to implement:

- L1 <-> L2 interop to deposit and withdraw ETH into Aave
- creating ZKsync SSO passkey-based accounts tied to a single domain
- sending basic ETH transfers using a passkey for authentication
- sending bundled transactions via the ZKsync SSO bundler
- (Optional) L2 <-> L2 interop for sending ERC20 tokens and arbitrary messages
  between chains

## How it works

There are three folders included in this project:

1. `frontend`: contains a React frontend for the portal.
1. `backend`: responsible for finalizing Aave deposit and withdrawal
   transactions on the L1, tracking the status of those transactions, deploying
   SSO accounts, and sending testnet funds to the user's account.
1. `token-contract`: contains a Hardhat project with a smart contract for a test
   USD token. This is only used if running the project with local L2 <-> L2
   interop.

More details can be found in the respective folder's `README.md` files.

## Running locally

### Basic setup (without L2 <-> L2 interop)

(TODO)

### Running with L2 <-> L2 interop

(TODO)

## Known Issues

The demo will be updated with new methods from the `zksync-sso` and `zksync-js`
SDKs once they have been fully updated to provide support for interop and SSO
account interactions. Until then, some of the code will be more verbose while
helper methods for interop and SSO are under development.
