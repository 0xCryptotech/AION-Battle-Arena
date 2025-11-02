const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("AionContract", function () {
  // Fixture to deploy contract
  async function deployAionContractFixture() {
    const [owner, player1, player2, player3] = await ethers.getSigners();

    const AionContract = await ethers.getContractFactory("AionContract");
    const aionContract = await AionContract.deploy();

    return { aionContract, owner, player1, player2, player3 };
  }

  describe("Deployment", function () {
    it("Should deploy with correct name and symbol", async function () {
      const { aionContract } = await loadFixture(deployAionContractFixture);

      expect(await aionContract.name()).to.equal("AION Token");
      expect(await aionContract.symbol()).to.equal("AION");
    });

    it("Should mint initial supply to owner", async function () {
      const { aionContract, owner } = await loadFixture(deployAionContractFixture);

      const ownerBalance = await aionContract.balanceOf(owner.address);
      const totalSupply = await aionContract.totalSupply();

      expect(ownerBalance).to.equal(totalSupply);
      expect(ownerBalance).to.equal(ethers.parseEther("1000000"));
    });

    it("Should set the right owner", async function () {
      const { aionContract, owner } = await loadFixture(deployAionContractFixture);

      expect(await aionContract.owner()).to.equal(owner.address);
    });
  });

  describe("Battle Creation", function () {
    it("Should create a battle successfully", async function () {
      const { aionContract, owner, player1 } = await loadFixture(deployAionContractFixture);

      // Transfer tokens to player1
      const stakeAmount = ethers.parseEther("100");
      await aionContract.transfer(player1.address, stakeAmount);

      // Create battle
      await expect(
        aionContract.connect(player1).createBattle("BULL", stakeAmount)
      ).to.emit(aionContract, "BattleCreated");

      // Check battle details
      const battle = await aionContract.getBattle(1);
      expect(battle.player1).to.equal(player1.address);
      expect(battle.dir1).to.equal("BULL");
      expect(battle.stakeAmount).to.equal(stakeAmount);
      expect(battle.complete).to.equal(false);
    });

    it("Should fail to create battle with insufficient balance", async function () {
      const { aionContract, player1 } = await loadFixture(deployAionContractFixture);

      const stakeAmount = ethers.parseEther("100");

      await expect(
        aionContract.connect(player1).createBattle("BULL", stakeAmount)
      ).to.be.revertedWith("Insufficient balance");
    });

    it("Should fail to create battle with zero stake", async function () {
      const { aionContract, player1 } = await loadFixture(deployAionContractFixture);

      await expect(
        aionContract.connect(player1).createBattle("BULL", 0)
      ).to.be.revertedWith("Stake amount must be greater than 0");
    });
  });

  describe("Battle Joining", function () {
    it("Should join a battle successfully", async function () {
      const { aionContract, owner, player1, player2 } = await loadFixture(deployAionContractFixture);

      const stakeAmount = ethers.parseEther("100");
      
      // Transfer tokens
      await aionContract.transfer(player1.address, stakeAmount);
      await aionContract.transfer(player2.address, stakeAmount);

      // Create battle
      await aionContract.connect(player1).createBattle("BULL", stakeAmount);

      // Join battle
      await expect(
        aionContract.connect(player2).joinBattle(1, "BEAR")
      ).to.emit(aionContract, "BattleJoined");

      // Check battle details
      const battle = await aionContract.getBattle(1);
      expect(battle.player2).to.equal(player2.address);
      expect(battle.dir2).to.equal("BEAR");
    });

    it("Should fail to join own battle", async function () {
      const { aionContract, player1 } = await loadFixture(deployAionContractFixture);

      const stakeAmount = ethers.parseEther("100");
      await aionContract.transfer(player1.address, stakeAmount * 2n);

      await aionContract.connect(player1).createBattle("BULL", stakeAmount);

      await expect(
        aionContract.connect(player1).joinBattle(1, "BEAR")
      ).to.be.revertedWith("Cannot join your own battle");
    });

    it("Should fail to join non-existent battle", async function () {
      const { aionContract, player2 } = await loadFixture(deployAionContractFixture);

      const stakeAmount = ethers.parseEther("100");
      await aionContract.transfer(player2.address, stakeAmount);

      await expect(
        aionContract.connect(player2).joinBattle(999, "BEAR")
      ).to.be.revertedWith("Battle not found");
    });
  });

  describe("Battle Completion", function () {
    it("Should complete battle and distribute rewards", async function () {
      const { aionContract, owner, player1, player2 } = await loadFixture(deployAionContractFixture);

      const stakeAmount = ethers.parseEther("100");
      
      // Transfer tokens
      await aionContract.transfer(player1.address, stakeAmount);
      await aionContract.transfer(player2.address, stakeAmount);

      // Create and join battle
      await aionContract.connect(player1).createBattle("BULL", stakeAmount);
      await aionContract.connect(player2).joinBattle(1, "BEAR");

      // Get initial balance
      const initialBalance = await aionContract.balanceOf(player1.address);

      // Complete battle with player1 as winner
      await expect(
        aionContract.connect(owner).completeBattle(1, player1.address)
      ).to.emit(aionContract, "BattleCompleted");

      // Check winner received rewards (minus 2% platform fee)
      const finalBalance = await aionContract.balanceOf(player1.address);
      const totalPrize = stakeAmount * 2n;
      const platformFee = (totalPrize * 2n) / 100n;
      const expectedReward = totalPrize - platformFee;

      expect(finalBalance - initialBalance).to.equal(expectedReward);
    });

    it("Should fail to complete battle twice", async function () {
      const { aionContract, owner, player1, player2 } = await loadFixture(deployAionContractFixture);

      const stakeAmount = ethers.parseEther("100");
      
      await aionContract.transfer(player1.address, stakeAmount);
      await aionContract.transfer(player2.address, stakeAmount);

      await aionContract.connect(player1).createBattle("BULL", stakeAmount);
      await aionContract.connect(player2).joinBattle(1, "BEAR");

      await aionContract.connect(owner).completeBattle(1, player1.address);

      await expect(
        aionContract.connect(owner).completeBattle(1, player1.address)
      ).to.be.revertedWith("Already completed");
    });

    it("Should only allow owner to complete battle", async function () {
      const { aionContract, player1, player2, player3 } = await loadFixture(deployAionContractFixture);

      const stakeAmount = ethers.parseEther("100");
      
      await aionContract.transfer(player1.address, stakeAmount);
      await aionContract.transfer(player2.address, stakeAmount);

      await aionContract.connect(player1).createBattle("BULL", stakeAmount);
      await aionContract.connect(player2).joinBattle(1, "BEAR");

      await expect(
        aionContract.connect(player3).completeBattle(1, player1.address)
      ).to.be.revertedWithCustomError(aionContract, "OwnableUnauthorizedAccount");
    });
  });

  describe("Battle Cancellation", function () {
    it("Should cancel battle and refund stake", async function () {
      const { aionContract, player1 } = await loadFixture(deployAionContractFixture);

      const stakeAmount = ethers.parseEther("100");
      await aionContract.transfer(player1.address, stakeAmount);

      const initialBalance = await aionContract.balanceOf(player1.address);

      await aionContract.connect(player1).createBattle("BULL", stakeAmount);
      await aionContract.connect(player1).cancelBattle(1);

      const finalBalance = await aionContract.balanceOf(player1.address);
      expect(finalBalance).to.equal(initialBalance);
    });

    it("Should fail to cancel battle after someone joined", async function () {
      const { aionContract, player1, player2 } = await loadFixture(deployAionContractFixture);

      const stakeAmount = ethers.parseEther("100");
      await aionContract.transfer(player1.address, stakeAmount);
      await aionContract.transfer(player2.address, stakeAmount);

      await aionContract.connect(player1).createBattle("BULL", stakeAmount);
      await aionContract.connect(player2).joinBattle(1, "BEAR");

      await expect(
        aionContract.connect(player1).cancelBattle(1)
      ).to.be.revertedWith("Battle already joined");
    });

    it("Should fail to cancel someone else's battle", async function () {
      const { aionContract, player1, player2 } = await loadFixture(deployAionContractFixture);

      const stakeAmount = ethers.parseEther("100");
      await aionContract.transfer(player1.address, stakeAmount);

      await aionContract.connect(player1).createBattle("BULL", stakeAmount);

      await expect(
        aionContract.connect(player2).cancelBattle(1)
      ).to.be.revertedWith("Not battle creator");
    });
  });

  describe("Token Operations", function () {
    it("Should transfer tokens between accounts", async function () {
      const { aionContract, owner, player1 } = await loadFixture(deployAionContractFixture);

      const amount = ethers.parseEther("1000");
      await aionContract.transfer(player1.address, amount);

      expect(await aionContract.balanceOf(player1.address)).to.equal(amount);
    });

    it("Should allow owner to mint new tokens", async function () {
      const { aionContract, owner, player1 } = await loadFixture(deployAionContractFixture);

      const initialSupply = await aionContract.totalSupply();
      const mintAmount = ethers.parseEther("10000");

      await aionContract.mint(player1.address, mintAmount);

      expect(await aionContract.totalSupply()).to.equal(initialSupply + mintAmount);
      expect(await aionContract.balanceOf(player1.address)).to.equal(mintAmount);
    });

    it("Should fail when non-owner tries to mint", async function () {
      const { aionContract, player1 } = await loadFixture(deployAionContractFixture);

      const mintAmount = ethers.parseEther("10000");

      await expect(
        aionContract.connect(player1).mint(player1.address, mintAmount)
      ).to.be.revertedWithCustomError(aionContract, "OwnableUnauthorizedAccount");
    });
  });

  describe("Platform Fee", function () {
    it("Should calculate correct platform fee (2%)", async function () {
      const { aionContract, owner, player1, player2 } = await loadFixture(deployAionContractFixture);

      const stakeAmount = ethers.parseEther("100");
      
      await aionContract.transfer(player1.address, stakeAmount);
      await aionContract.transfer(player2.address, stakeAmount);

      const contractInitialBalance = await aionContract.balanceOf(await aionContract.getAddress());

      await aionContract.connect(player1).createBattle("BULL", stakeAmount);
      await aionContract.connect(player2).joinBattle(1, "BEAR");
      await aionContract.connect(owner).completeBattle(1, player1.address);

      const contractFinalBalance = await aionContract.balanceOf(await aionContract.getAddress());
      
      // Platform should keep 2% of total prize (200 AION)
      const totalPrize = stakeAmount * 2n;
      const expectedFee = (totalPrize * 2n) / 100n; // 4 AION

      expect(contractFinalBalance - contractInitialBalance).to.equal(expectedFee);
    });
  });
});
