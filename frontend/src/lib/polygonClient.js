import { ethers } from 'ethers';
import AionContractABI from '../abi/AionContract.json';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || '';

export const getContract = (signerOrProvider) => {
  if (!CONTRACT_ADDRESS) {
    console.warn('Contract address not set in environment variables');
    return null;
  }
  
  return new ethers.Contract(
    CONTRACT_ADDRESS,
    AionContractABI.abi,
    signerOrProvider
  );
};

export const createBattle = async (provider, direction, stakeAmount) => {
  try {
    const signer = provider.getSigner();
    const contract = getContract(signer);
    
    if (!contract) throw new Error('Contract not initialized');
    
    const tx = await contract.createBattle(
      direction,
      ethers.utils.parseEther(stakeAmount.toString())
    );
    
    const receipt = await tx.wait();
    
    // Get battle ID from event
    const event = receipt.events?.find(e => e.event === 'BattleCreated');
    const battleId = event?.args?.id?.toString();
    
    return { success: true, battleId, txHash: receipt.transactionHash };
  } catch (error) {
    console.error('Error creating battle:', error);
    return { success: false, error: error.message };
  }
};

export const joinBattle = async (provider, battleId, direction) => {
  try {
    const signer = provider.getSigner();
    const contract = getContract(signer);
    
    if (!contract) throw new Error('Contract not initialized');
    
    const tx = await contract.joinBattle(battleId, direction);
    const receipt = await tx.wait();
    
    return { success: true, txHash: receipt.transactionHash };
  } catch (error) {
    console.error('Error joining battle:', error);
    return { success: false, error: error.message };
  }
};

export const getBattle = async (provider, battleId) => {
  try {
    const contract = getContract(provider);
    
    if (!contract) throw new Error('Contract not initialized');
    
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
};

export const getBattleCount = async (provider) => {
  try {
    const contract = getContract(provider);
    
    if (!contract) throw new Error('Contract not initialized');
    
    const count = await contract.battleCount();
    return count.toNumber();
  } catch (error) {
    console.error('Error getting battle count:', error);
    return 0;
  }
};

export const getAionBalance = async (provider, address) => {
  try {
    const contract = getContract(provider);
    
    if (!contract) throw new Error('Contract not initialized');
    
    const balance = await contract.balanceOf(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error('Error getting AION balance:', error);
    return '0';
  }
};

export const createMarket = async (provider, title, description, eventDate) => {
  try {
    const signer = provider.getSigner();
    const contract = getContract(signer);
    
    if (!contract) throw new Error('Contract not initialized');
    
    const tx = await contract.createMarket(title, description, eventDate);
    const receipt = await tx.wait();
    
    const event = receipt.events?.find(e => e.event === 'MarketCreated');
    const marketId = event?.args?.marketId?.toString();
    
    return { success: true, marketId, txHash: receipt.transactionHash };
  } catch (error) {
    console.error('Error creating market:', error);
    return { success: false, error: error.message };
  }
};

export const stakeOnMarket = async (provider, marketId, amount, prediction) => {
  try {
    const signer = provider.getSigner();
    const contract = getContract(signer);
    
    if (!contract) throw new Error('Contract not initialized');
    
    const tx = await contract.stake(
      marketId,
      ethers.utils.parseEther(amount.toString()),
      prediction
    );
    const receipt = await tx.wait();
    
    return { success: true, txHash: receipt.transactionHash };
  } catch (error) {
    console.error('Error staking on market:', error);
    return { success: false, error: error.message };
  }
};

export const getMarket = async (provider, marketId) => {
  try {
    const contract = getContract(provider);
    
    if (!contract) throw new Error('Contract not initialized');
    
    const market = await contract.getMarket(marketId);
    
    return {
      id: market.id.toString(),
      title: market.title,
      description: market.description,
      eventDate: market.eventDate.toNumber(),
      resolved: market.resolved,
      outcome: market.outcome,
      totalStakeYes: ethers.utils.formatEther(market.totalStakeYes),
      totalStakeNo: ethers.utils.formatEther(market.totalStakeNo),
      creator: market.creator,
      createdAt: market.createdAt.toNumber()
    };
  } catch (error) {
    console.error('Error getting market:', error);
    return null;
  }
};
