# Security Engineering Angular dApp

Application created by Onymous. A payment system for events, based on ethereum.

# Required packages

Truffle: `npm install -g truffle`

Angular: `npm install -g @angular/cli` 

Ganache: https://truffleframework.com/ganache

MetaMask: https://metamask.io/

# Installation
go to dApp directory

`cd dApp`

then run 

`npm install`

Start ganache and set it to port 8545 

then:

`truffle compile && truffle migrate`

# Configuring MetaMask

Copy the Mnemonic secret from Ganache, you can find this at the top of the accounts tab. 

"Your mnemonic is a special secret created for you by Ganache. It's used to generate the addresses available during development as well as sign transactions sent from those addresses."

open MetaMask and click "Import using account seed phrase"

Enter the Mnemonic secret from Ganache into "Wallet Seed" and create a new password

After that set the network to localhost 8545 

# Running the app

Make sure Ganache is running!
 
To start the app:

`npm start`

open your browser on http://localhost:4200
