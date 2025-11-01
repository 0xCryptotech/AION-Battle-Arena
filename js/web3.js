// Web3 Integration for Polygon
import { DEFAULT_NETWORK } from '../config/network.js';
import { CONTRACT_ADDRESS, CONTRACT_ABI, isContractDeployed } from '../config/contract.js';

let provider = null;
let signer = null;
let contract = null;
let userAddress = null;

// Initialize Web3 Provider
export async function initWeb3() {
    if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed!');
    }
    
    provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
}

// Get Signer
export async function getSigner() {
    if (!provider) {
        await initWeb3();
    }
    
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    
    return signer;
}

// Get Contract Instance
export async function getContract() {
    if (!isContractDeployed()) {
        throw new Error('Contract not deployed yet. Please deploy first.');
    }
    
    if (!signer) {
        await getSigner();
    }
    
    if (!contract) {
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }
    
    return contract;
}

// Connect Wallet
export async function connectWallet() {
    try {
        const signer = await getSigner();
        const address = await signer.getAddress();
        
        // Check if on correct network
        const network = await provider.getNetwork();
        if (network.chainId !== DEFAULT_NETWORK.chainIdDecimal) {
            await switchNetwork();
        }
        
        return {
            success: true,
            address: address,
            shortAddress: `${address.slice(0, 6)}...${address.slice(-4)}`
        };
    } catch (error) {
        console.error('Error connecting wallet:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Switch to Polygon Network
export async function switchNetwork() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: DEFAULT_NETWORK.chainId }],
        });
    } catch (switchError) {
        // Network not added, add it
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [DEFAULT_NETWORK],
                });
            } catch (addError) {
                throw new Error('Failed to add network');
            }
        } else {
            throw switchError;
        }
    }
}

// Get User Balance
export async function getBalance(address) {
    if (!provider) {
        await initWeb3();
    }
    
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
}

// Get AION Token Balance
export async function getAionBalance(address) {
    try {
        const contract = await getContract();
        const balance = await contract.balanceOf(address);
        return ethers.utils.formatEther(balance);
    } catch (error) {
        console.error('Error getting AION balance:', error);
        return '0';
    }
}

// Create Battle
export async function createBattle(direction, stakeAmount) {
    try {
        const contract = await getContract();
        const amount = ethers.utils.parseEther(stakeAmount.toString());
        
        const tx = await contract.createBattle(direction, amount);
        const receipt = await tx.wait();
        
        // Get battle ID from event
        const event = receipt.events?.find(e => e.event === 'BattleCreated');
        const battleId = event?.args?.id?.toString();
        
        return {
            success: true,
            battleId: battleId,
            txHash: receipt.transactionHash
        };
    } catch (error) {
        console.error('Error creating battle:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Join Battle
export async function joinBattle(battleId, direction) {
    try {
        const contract = await getContract();
        
        const tx = await contract.joinBattle(battleId, direction);
        const receipt = await tx.wait();
        
        return {
            success: true,
            txHash: receipt.transactionHash
        };
    } catch (error) {
        console.error('Error joining battle:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Get Battle Info
export async function getBattle(battleId) {
    try {
        const contract = await getContract();
        const battle = await contract.getBattle(battleId);
        
        return {
            player1: battle.player1,
            player2: battle.player2,
            player1Direction: battle.dir1,
            player2Direction: battle.dir2,
            stakeAmount: ethers.utils.formatEther(battle.stakeAmount),
            isComplete: battle.complete,
            winner: battle.winner
        };
    } catch (error) {
        console.error('Error getting battle:', error);
        return null;
    }
}

// Get Battle Count
export async function getBattleCount() {
    try {
        const contract = await getContract();
        const count = await contract.battleCount();
        return count.toNumber();
    } catch (error) {
        console.error('Error getting battle count:', error);
        return 0;
    }
}

// Create Market
export async function createMarket(title, description, eventDate) {
    try {
        const contract = await getContract();
        
        const tx = await contract.createMarket(title, description, eventDate);
        const receipt = await tx.wait();
        
        const event = receipt.events?.find(e => e.event === 'MarketCreated');
        const marketId = event?.args?.marketId?.toString();
        
        return {
            success: true,
            marketId: marketId,
            txHash: receipt.transactionHash
        };
    } catch (error) {
        console.error('Error creating market:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Stake on Market
export async function stakeOnMarket(marketId, amount, prediction) {
    try {
        const contract = await getContract();
        const stakeAmount = ethers.utils.parseEther(amount.toString());
        
        const tx = await contract.stake(marketId, stakeAmount, prediction);
        const receipt = await tx.wait();
        
        return {
            success: true,
            txHash: receipt.transactionHash
        };
    } catch (error) {
        console.error('Error staking on market:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Get Current User Address
export function getCurrentAddress() {
    return userAddress;
}

// Check if Wallet Connected
export function isWalletConnected() {
    return userAddress !== null;
}

// Format Address
export function formatAddress(address) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Format Token Amount
export function formatTokenAmount(amount, decimals = 2) {
    return parseFloat(amount).toFixed(decimals);
}
