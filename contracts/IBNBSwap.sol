pragma solidity ^0.5.16;

interface IBNBSwap {
    /**
     * @dev Returns the name.
     */
    function name() external view returns(string memory);

    /**
     * @dev Returns the rate.
     */
    function rate() external view returns(uint256);

    /**
     * @dev Emitted when `value` tokens are moved from one BNB Swap to `account`.
     * @param account Buyer's address.
     * @param token Token's address.
     * @param amount Tokens amount.
     * @param rate Current tokens rate.
     */
    event TokensPurchased(address indexed account, address indexed token, uint256 amount, uint256 rate);

    /**
     * @dev Emitted when `value` tokens are moved from one BNB Swap to `account`.
     * @param account Buyer's address.
     * @param token Token's address.
     * @param amount Tokens amount.
     * @param rate Current tokens rate.
     */
    event TokensSold(address indexed account, address indexed token, uint256 amount, uint256 rate);
}