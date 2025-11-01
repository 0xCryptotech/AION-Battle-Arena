const fs = require('fs');
const path = require('path');

// Script to update frontend with deployed contract address and ABI

async function updateFrontend() {
    try {
        // Read deployment info
        const deploymentPath = path.join(__dirname, '..', 'deployment-info.json');
        if (!fs.existsSync(deploymentPath)) {
            console.error('❌ deployment-info.json not found. Please deploy contract first.');
            process.exit(1);
        }
        
        const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
        const contractAddress = deployment.contractAddress;
        
        console.log('📝 Updating frontend with contract address:', contractAddress);
        
        // Read ABI
        const abiPath = path.join(__dirname, '..', 'artifacts', 'contracts', 'AionContract.sol', 'AionContract.json');
        const contractJson = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
        const abi = contractJson.abi;
        
        // Update static frontend
        const staticJsPath = path.join(__dirname, '..', '..', 'aion-static', 'js', 'polygon-integration.js');
        if (fs.existsSync(staticJsPath)) {
            let content = fs.readFileSync(staticJsPath, 'utf8');
            
            // Update contract address
            content = content.replace(
                /const CONTRACT_ADDRESS = '[^']*';/,
                `const CONTRACT_ADDRESS = '${contractAddress}';`
            );
            
            // Update ABI
            content = content.replace(
                /const CONTRACT_ABI = \[.*?\];/s,
                `const CONTRACT_ABI = ${JSON.stringify(abi, null, 2)};`
            );
            
            fs.writeFileSync(staticJsPath, content);
            console.log('✅ Updated aion-static/js/polygon-integration.js');
        }
        
        // Update React frontend config
        const reactConfigPath = path.join(__dirname, '..', '..', 'frontend', 'src', 'lib', 'polygonClient.js');
        if (fs.existsSync(reactConfigPath)) {
            let content = fs.readFileSync(reactConfigPath, 'utf8');
            
            // Update contract address reference
            content = content.replace(
                /const CONTRACT_ADDRESS = process\.env\.REACT_APP_CONTRACT_ADDRESS \|\| '';/,
                `const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || '${contractAddress}';`
            );
            
            fs.writeFileSync(reactConfigPath, content);
            console.log('✅ Updated frontend/src/lib/polygonClient.js');
        }
        
        // Update .env.local
        const envPath = path.join(__dirname, '..', '..', 'frontend', '.env.local');
        if (fs.existsSync(envPath)) {
            let envContent = fs.readFileSync(envPath, 'utf8');
            envContent = envContent.replace(
                /REACT_APP_CONTRACT_ADDRESS=.*/,
                `REACT_APP_CONTRACT_ADDRESS=${contractAddress}`
            );
            fs.writeFileSync(envPath, envContent);
            console.log('✅ Updated frontend/.env.local');
        }
        
        // Create summary file
        const summary = {
            network: deployment.network,
            contractAddress: contractAddress,
            deployer: deployment.deployer,
            timestamp: deployment.timestamp,
            explorerUrl: `https://amoy.polygonscan.com/address/${contractAddress}`,
            frontendUpdated: true
        };
        
        fs.writeFileSync(
            path.join(__dirname, '..', 'deployment-summary.json'),
            JSON.stringify(summary, null, 2)
        );
        
        console.log('\n🎉 Frontend updated successfully!');
        console.log('\n📋 Deployment Summary:');
        console.log('   Network:', deployment.network);
        console.log('   Contract:', contractAddress);
        console.log('   Explorer:', summary.explorerUrl);
        console.log('\n✅ You can now use the frontend with the deployed contract!');
        
    } catch (error) {
        console.error('❌ Error updating frontend:', error.message);
        process.exit(1);
    }
}

updateFrontend();
