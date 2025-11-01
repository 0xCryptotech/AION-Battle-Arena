# Implementation Plan - Gelombang 4: Wallet & Blockchain Integration

## Task List

- [x] 1. Setup Wallet Infrastructure
  - Create wallet state management system
  - Initialize ethers.js integration
  - Setup global wallet variables
  - _Requirements: 1.1, 6.1, 6.2_

- [x] 1.1 Create wallet state object and initialization
  - Define walletState object with all required properties
  - Create initializeWallet() function
  - Create getWalletState() function
  - _Requirements: 1.1, 6.1_

- [x] 1.2 Setup ethers.js provider and signer
  - Initialize ethers provider from window.ethereum
  - Create signer object for transaction signing
  - Add error handling for missing provider
  - _Requirements: 6.1, 6.2_

- [x] 2. Implement MetaMask Connection
  - Create MetaMask detection logic
  - Implement connection request flow
  - Handle connection approval/rejection
  - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 2.1 Create connectMetaMask() function
  - Check if MetaMask is installed (window.ethereum)
  - Request account access using eth_requestAccounts
  - Store wallet address and provider
  - Update UI to show connected state
  - _Requirements: 1.2, 1.4, 1.5_

- [x] 2.2 Handle MetaMask not installed
  - Detect when MetaMask is not available
  - Show error message with install link
  - Provide link to metamask.io
  - _Requirements: 1.3, 7.1_

- [x] 2.3 Handle connection rejection
  - Catch user rejection error (code 4001)
  - Display user-friendly error message
  - Keep Connect Wallet button visible
  - _Requirements: 1.6, 7.1_

- [-] 3. Implement Network Detection and Switching
  - Detect current blockchain network
  - Validate if network is Polygon
  - Implement network switching functionality
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 3.1 Create checkNetwork() function
  - Get current chainId from provider
  - Compare with Polygon chainIds (137 for mainnet, 80002 for Amoy)
  - Return boolean isCorrectNetwork
  - _Requirements: 2.1_

- [x] 3.2 Implement network warning UI
  - Create network warning banner component
  - Show/hide based on network check
  - Add "Switch to Polygon" button
  - _Requirements: 2.2_

- [x] 3.3 Create switchToPolygon() function
  - Request wallet to switch network using wallet_switchEthereumChain
  - Handle successful switch
  - Handle network not configured error (4902)
  - _Requirements: 2.3_

- [x] 3.4 Create addPolygonNetwork() function
  - Prepare Polygon network parameters (RPC, chainId, etc.)
  - Request wallet to add network using wallet_addEthereumChain
  - Handle success and error cases
  - _Requirements: 2.4_

- [x] 3.5 Implement network change listener
  - Listen to chainChanged event from ethereum provider
  - Update UI when network changes
  - Re-check network validity
  - _Requirements: 2.6_

- [ ] 4. Implement Balance Display
  - Fetch MATIC balance
  - Fetch AION token balance
  - Display balances in UI
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 4.1 Create getMaticBalance() function
  - Use provider.getBalance(address)
  - Format balance from wei to ether
  - Handle errors gracefully
  - _Requirements: 3.1, 3.4_

- [x] 4.2 Create getAionBalance() function
  - Create AION token contract instance
  - Call balanceOf(address) function
  - Format balance with correct decimals
  - Handle errors gracefully
  - _Requirements: 3.2, 3.4_

- [x] 4.3 Create updateBalances() function
  - Call both getMaticBalance and getAionBalance
  - Update walletState.balances object
  - Update UI elements with new balances
  - _Requirements: 3.3_

- [x] 4.4 Implement balance refresh mechanism
  - Add refresh button or auto-refresh timer
  - Debounce refresh requests (max once per 10 seconds)
  - Show loading state during refresh
  - _Requirements: 3.5_

- [ ] 5. Create Wallet UI Components
  - Build connect wallet modal
  - Update header with wallet display
  - Add wallet dropdown menu
  - _Requirements: 1.1, 1.5, 4.1_

- [x] 5.1 Create wallet connection modal
  - Design modal HTML structure
  - Add MetaMask button with icon
  - Add WalletConnect button (placeholder for future)
  - Add modal open/close functions
  - _Requirements: 1.1_

- [x] 5.2 Update header with wallet display
  - Modify existing Connect Wallet button
  - Add wallet address display (shortened format)
  - Add wallet dropdown toggle
  - Style connected state
  - _Requirements: 1.5_

- [x] 5.3 Create wallet dropdown menu
  - Show MATIC balance
  - Show AION balance
  - Add Disconnect button
  - Add dropdown show/hide logic
  - _Requirements: 4.1_

- [ ] 6. Implement Wallet Disconnection
  - Create disconnect function
  - Clear wallet state
  - Update UI to disconnected state
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 6.1 Create disconnectWallet() function
  - Clear walletState object
  - Reset all wallet-related variables
  - Close wallet dropdown
  - _Requirements: 4.2, 4.3_

- [x] 6.2 Update UI after disconnection
  - Hide wallet address display
  - Show Connect Wallet button
  - Clear balance displays
  - Hide network warning if visible
  - _Requirements: 4.3, 4.4_

- [x] 7. Implement Error Handling
  - Create error handling utilities
  - Add toast notifications for errors
  - Handle common wallet errors
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 7.1 Create handleWalletError() function
  - Map error codes to user-friendly messages
  - Show toast notification with error
  - Log errors for debugging
  - _Requirements: 7.1_

- [x] 7.2 Implement specific error handlers
  - Handle insufficient funds error
  - Handle wallet locked error
  - Handle network errors
  - _Requirements: 7.2, 7.3, 7.4_

- [x] 7.3 Add loading indicators
  - Show loading during connection
  - Show loading during network switch
  - Show loading during balance fetch
  - _Requirements: 7.5_

- [x] 8. Add Event Listeners and State Management
  - Listen for account changes
  - Listen for network changes
  - Listen for wallet disconnect
  - _Requirements: 2.6, 5.1, 5.2, 5.3, 5.4_

- [x] 8.1 Implement accountsChanged listener
  - Listen to accountsChanged event
  - Update wallet address if changed
  - Disconnect if no accounts
  - Refresh balances
  - _Requirements: 5.1, 5.2_

- [x] 8.2 Implement chainChanged listener
  - Listen to chainChanged event
  - Check if new network is correct
  - Update network warning
  - Refresh balances
  - _Requirements: 2.6, 5.3_

- [x] 8.3 Implement disconnect listener
  - Listen to disconnect event
  - Clear wallet state
  - Update UI to disconnected
  - _Requirements: 5.4_

- [x] 8.4 Ensure no state persistence
  - Verify no localStorage usage for wallet state
  - Clear all wallet data on page refresh
  - Test that page refresh requires reconnection
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 9. Create Utility Functions
  - Format wallet addresses
  - Format token balances
  - Validate addresses
  - _Requirements: 6.5, 8.3_

- [x] 9.1 Create formatAddress() function
  - Take full address as input
  - Return shortened format (0x1234...5678)
  - Handle invalid addresses
  - _Requirements: 6.5_

- [x] 9.2 Create formatBalance() function
  - Take balance and decimals as input
  - Format with appropriate decimal places
  - Add thousand separators
  - _Requirements: 3.3_

- [x] 9.3 Create validateAddress() function
  - Use ethers.utils.isAddress()
  - Return boolean
  - _Requirements: 8.3_

- [ ] 10. Testing and Validation
  - Test MetaMask connection flow
  - Test network switching
  - Test balance display
  - Test error scenarios
  - _Requirements: All_

- [ ]* 10.1 Manual testing checklist
  - Test connect with MetaMask on Polygon Mainnet
  - Test connect with MetaMask on wrong network
  - Test network switching to Polygon
  - Test disconnect wallet
  - Test page refresh (should not auto-reconnect)
  - Test without MetaMask installed
  - Test connection rejection
  - Test balance display accuracy
  - _Requirements: All_

- [ ]* 10.2 Browser compatibility testing
  - Test on Chrome with MetaMask
  - Test on Firefox with MetaMask
  - Test on Brave with built-in wallet
  - Test on mobile browsers
  - _Requirements: All_

- [x] 11. Documentation and Code Comments
  - Add JSDoc comments to functions
  - Document wallet state structure
  - Add inline comments for complex logic
  - _Requirements: All_

- [x] 11.1 Add function documentation
  - Document all public functions with JSDoc
  - Include parameter types and return types
  - Add usage examples
  - _Requirements: All_

- [x] 11.2 Add code comments
  - Comment complex logic sections
  - Explain error handling strategies
  - Document event listener purposes
  - _Requirements: All_
