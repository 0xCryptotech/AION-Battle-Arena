# Requirements Document - Gelombang 4: Wallet & Blockchain Integration

## Introduction

This document outlines the requirements for implementing wallet connection and blockchain integration for the AION Prediction Market application. The system will enable users to connect their Web3 wallets (MetaMask, WalletConnect) to interact with the Polygon blockchain, view their token balances, and prepare for on-chain transactions.

## Glossary

- **Web3 Wallet**: A cryptocurrency wallet that allows users to interact with blockchain applications (e.g., MetaMask, WalletConnect)
- **Polygon Network**: A Layer 2 scaling solution for Ethereum that provides faster and cheaper transactions
- **AION Token**: The native token used in the AION Prediction Market for placing bets and rewards
- **Wallet Address**: A unique identifier (hexadecimal string) representing a user's blockchain account
- **Network Switching**: The ability to change between different blockchain networks (e.g., Polygon Mainnet, Mumbai Testnet)
- **Gas Fee**: The transaction fee required to execute operations on the blockchain
- **Web3 Provider**: A JavaScript object that provides access to blockchain functionality

## Requirements

### Requirement 1: Wallet Connection

**User Story:** As a user, I want to connect my Web3 wallet to the application, so that I can interact with blockchain features and place bets.

#### Acceptance Criteria

1. WHEN the user clicks the "Connect Wallet" button, THE System SHALL display a modal with wallet connection options (MetaMask, WalletConnect)
2. WHEN the user selects MetaMask AND MetaMask is installed, THE System SHALL initiate the MetaMask connection request
3. WHEN the user selects MetaMask AND MetaMask is not installed, THE System SHALL display a message with a link to install MetaMask
4. WHEN the user approves the connection in their wallet, THE System SHALL store the wallet address and update the UI to show "Connected"
5. WHEN the wallet connection is successful, THE System SHALL display the shortened wallet address (first 6 and last 4 characters) in the header
6. WHEN the user rejects the connection request, THE System SHALL display an error message and keep the "Connect Wallet" button visible

### Requirement 2: Network Detection and Switching

**User Story:** As a user, I want the application to detect my current network and prompt me to switch to Polygon, so that I can use the correct blockchain for transactions.

#### Acceptance Criteria

1. WHEN the wallet is connected, THE System SHALL detect the current blockchain network
2. WHEN the connected network is not Polygon (Chain ID 137 for mainnet or 80001 for Mumbai testnet), THE System SHALL display a warning message
3. WHEN the user clicks "Switch to Polygon" button, THE System SHALL request the wallet to switch to the Polygon network
4. IF the Polygon network is not configured in the wallet, THE System SHALL request to add the Polygon network with correct RPC URL, Chain ID, and currency symbol
5. WHEN the network switch is successful, THE System SHALL update the UI to remove the warning message
6. WHEN the network changes while the application is active, THE System SHALL detect the change and update the UI accordingly

### Requirement 3: Balance Display

**User Story:** As a user, I want to see my AION token balance and native MATIC balance, so that I know how much I can bet and whether I have enough for gas fees.

#### Acceptance Criteria

1. WHEN the wallet is connected AND on the correct network, THE System SHALL fetch the user's MATIC balance
2. WHEN the wallet is connected AND on the correct network, THE System SHALL fetch the user's AION token balance
3. WHEN balances are fetched successfully, THE System SHALL display both balances in the user profile section with appropriate formatting (e.g., "1,234.56 AION")
4. WHEN balance fetching fails, THE System SHALL display "0.00" and log the error for debugging
5. WHEN a transaction is completed, THE System SHALL refresh the balance display within 5 seconds

### Requirement 4: Wallet Disconnection

**User Story:** As a user, I want to disconnect my wallet from the application, so that I can protect my privacy and switch to a different wallet.

#### Acceptance Criteria

1. WHEN the wallet is connected, THE System SHALL display a "Disconnect" option in the wallet dropdown menu
2. WHEN the user clicks "Disconnect", THE System SHALL clear the stored wallet address from the application state
3. WHEN the wallet is disconnected, THE System SHALL update the UI to show the "Connect Wallet" button again
4. WHEN the wallet is disconnected, THE System SHALL clear all user-specific data from the UI (balance, address, etc.)

### Requirement 5: Wallet State Management

**User Story:** As a user, I want my wallet connection to be cleared when I refresh the page, so that I have full control over when my wallet is connected.

#### Acceptance Criteria

1. WHEN the user refreshes the page, THE System SHALL clear any previous wallet connection state
2. WHEN the page loads, THE System SHALL always show the "Connect Wallet" button (not connected by default)
3. WHEN the user manually disconnects, THE System SHALL clear all wallet data from the application state
4. WHEN the user closes the browser tab, THE System SHALL not persist any wallet connection information

### Requirement 6: Transaction Preparation

**User Story:** As a developer, I want to set up the infrastructure for blockchain transactions, so that we can implement betting functionality in the next phase.

#### Acceptance Criteria

1. THE System SHALL initialize ethers.js library with the Web3 provider from the connected wallet
2. THE System SHALL create a signer object that can be used to sign transactions
3. THE System SHALL implement a function to estimate gas fees for transactions
4. THE System SHALL implement error handling for common transaction errors (insufficient funds, user rejection, network errors)
5. THE System SHALL provide a utility function to format transaction hashes for display

### Requirement 7: Error Handling and User Feedback

**User Story:** As a user, I want to receive clear error messages when something goes wrong with my wallet connection, so that I can understand and resolve the issue.

#### Acceptance Criteria

1. WHEN a wallet connection error occurs, THE System SHALL display a user-friendly error message in a toast notification
2. WHEN the user has insufficient MATIC for gas fees, THE System SHALL display a warning message with instructions to get MATIC
3. WHEN the wallet is locked, THE System SHALL prompt the user to unlock their wallet
4. WHEN a network error occurs, THE System SHALL display a message suggesting to check internet connection
5. WHEN any blockchain operation is in progress, THE System SHALL display a loading indicator

### Requirement 8: Security and Best Practices

**User Story:** As a developer, I want to implement security best practices for wallet integration, so that user funds and data are protected.

#### Acceptance Criteria

1. THE System SHALL never request or store private keys or seed phrases
2. THE System SHALL only request necessary permissions from the wallet (account access)
3. THE System SHALL validate all wallet addresses before using them in transactions
4. THE System SHALL implement rate limiting for balance refresh requests to avoid excessive RPC calls
5. THE System SHALL use HTTPS for all RPC connections to blockchain nodes
