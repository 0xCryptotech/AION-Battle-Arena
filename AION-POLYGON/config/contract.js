// Smart Contract Configuration
// Update CONTRACT_ADDRESS setelah deploy ke Polygon

export const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Update after deployment

// Contract ABI - akan di-update setelah compile
export const CONTRACT_ABI = [
    // Market Functions
    {
        "inputs": [
            {"internalType": "string", "name": "_title", "type": "string"},
            {"internalType": "string", "name": "_description", "type": "string"},
            {"internalType": "uint256", "name": "_eventDate", "type": "uint256"}
        ],
        "name": "createMarket",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "_marketId", "type": "uint256"},
            {"internalType": "uint256", "name": "_amount", "type": "uint256"},
            {"internalType": "bool", "name": "_prediction", "type": "bool"}
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // Battle Functions
    {
        "inputs": [
            {"internalType": "string", "name": "direction", "type": "string"},
            {"internalType": "uint256", "name": "stakeAmount", "type": "uint256"}
        ],
        "name": "createBattle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "id", "type": "uint256"},
            {"internalType": "string", "name": "direction", "type": "string"}
        ],
        "name": "joinBattle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}],
        "name": "getBattle",
        "outputs": [
            {"internalType": "address", "name": "player1", "type": "address"},
            {"internalType": "address", "name": "player2", "type": "address"},
            {"internalType": "string", "name": "dir1", "type": "string"},
            {"internalType": "string", "name": "dir2", "type": "string"},
            {"internalType": "uint256", "name": "stakeAmount", "type": "uint256"},
            {"internalType": "bool", "name": "complete", "type": "bool"},
            {"internalType": "address", "name": "winner", "type": "address"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    // Token Functions
    {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "battleCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "marketCounter",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    // Events
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"},
            {"indexed": false, "internalType": "address", "name": "player1", "type": "address"},
            {"indexed": false, "internalType": "string", "name": "direction", "type": "string"},
            {"indexed": false, "internalType": "uint256", "name": "stakeAmount", "type": "uint256"}
        ],
        "name": "BattleCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "uint256", "name": "id", "type": "uint256"},
            {"indexed": false, "internalType": "address", "name": "player2", "type": "address"},
            {"indexed": false, "internalType": "string", "name": "direction", "type": "string"}
        ],
        "name": "BattleJoined",
        "type": "event"
    }
];

// Helper function to check if contract is deployed
export function isContractDeployed() {
    return CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000';
}
