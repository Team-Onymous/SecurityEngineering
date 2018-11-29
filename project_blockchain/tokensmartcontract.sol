pragma solidity ^0.4.11;

contract onycoin_ico {
    //coins available for sale, onycoin is our coin/token which is used
    uint public max_onycoins = 100000000;
    
    //exchange rate eur to onycoin
    uint public eur_to_onycoins = 1000;
    
    //bought
    uint public total_onycoins_bought = 0;
    
    //mapping from the investor address to its equity in onycoins and eur
    mapping(address => uint) equity_onycoins;
    mapping(address => uint) equity_eur;
    
    //checking if an investor can buy onycoins
    modifier can_buy_onycoins(uint eur_invested){
        require (eur_invested * eur_to_onycoins <= max_onycoins);
        _;
    }    
    
    function equity_in_onycoins(address investor) external constant returns (uint) {
        return equity_onycoins[investor];
    }
    
    function eqity_in_eur(address investor) external constant returns (uint){
        return equity_eur[investor];
    }
    
    function buy_onycoins(address investor, uint eur_invested) external
    can_buy_onycoins(eur_invested) {
        uint onycoins_bought = eur_invested * eur_to_onycoins;
        equity_onycoins[investor] += onycoins_bought;
        equity_eur[investor] = equity_onycoins[investor] / 1000;
        total_onycoins_bought += onycoins_bought;
        
    }
    
    function sell_jstcoins(address investor, uint onycoins_sold) external {
        equity_onycoins[investor] -= onycoins_sold;
        equity_eur[investor] = equity_onycoins[investor] / 1000;
        total_onycoins_bought -= onycoins_sold;
    }
    
}