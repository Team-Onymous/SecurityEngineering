#!/bin/bash

# Download this from github and set execution rights:
# wget https://raw.githubusercontent.com/Team-Onymous/SecurityEngineering/develop/project_blockchain/node_setup.sh
# sudo chmod 755 node_setup.sh
# Then run: sudo ./node_setup.sh

# Update & upgrade
sudo apt update
sudo apt upgrade -y

# install ethereum
sudo apt install software-properties-common -y
yes "" | sudo add-apt-repository ppa:ethereum/ethereum
sudo apt update
sudo apt install ethereum -y

# make directory for the blockchain data and download the genesisblock file into it
mkdir blockchain_data
cd blockchain_data
wget https://raw.githubusercontent.com/Team-Onymous/SecurityEngineering/develop/project_blockchain/genesisblock.json
cd ..

# make a new account to act as a coinbase account 
geth --datadir ./blockchain_data account new
sudo chmod 777 /blockchain_data/keystore
sudo chmod 777 /blockchain_data

# initialize the genesisblock
geth --datadir ./blockchain_data init ./blockchain_data/genesisblock.json

# start the geth instance with Javascript console
geth --datadir ./blockchain_data --networkid 1337 --nodiscover console 2>logfile.log
