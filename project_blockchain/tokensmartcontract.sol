pragma solidity ^0.4.11;

contract jstcoin_ico {
    //coins available for sale
    uint public max_jstcoins = 10000000;
    
    //exchange rate eur to jstc
    uint public eur_to_jstcoins = 1000;
    
    //bought
    uint public total_jstcoins_bought = 0;
    
    //mapping from the investor address to its equity in jstcoins and eur
    mapping(address => uint) equity_jstcoins;
    mapping(address => uint) equity_eur;
    
    //checking if an investor can buy jstcoins
    modifier can_buy_jstcoins(uint eur_invested){
        require (eur_invested * eur_to_jstcoins <= max_jstcoins);
        _;
    }    
    
    function equity_in_jstcoins(address investor) external constant returns (uint) {
        return equity_jstcoins[investor];
    }
    
    function eqity_in_eur(address investor) external constant returns (uint){
        return equity_eur[investor];
    }
    
    function buy_jstcoins(address investor, uint eur_invested) external
    can_buy_jstcoins(eur_invested) {
        uint jstcoins_bought = eur_invested * eur_to_jstcoins;
        equity_jstcoins[investor] += jstcoins_bought;
        equity_eur[investor] = equity_jstcoins[investor] / 1000;
        total_jstcoins_bought += jstcoins_bought;
        
    }
    
    function sell_jstcoins(address investor, uint jstcoins_sold) external {
        equity_jstcoins[investor] -= jstcoins_sold;
        equity_eur[investor] = equity_jstcoins[investor] / 1000;
        total_jstcoins_bought -= jstcoins_sold;
    }
    
}