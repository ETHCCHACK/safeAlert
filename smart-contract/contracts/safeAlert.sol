// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract safeAlert is ERC721URIStorage {
    address admin;

    uint256 counter = 0;
    mapping(uint256 => bool) ValidationState;
    mapping(uint256 => address) TokenValidators;
    event approvedToken(uint256 tokenId, address user,uint8 qualityReview);

    constructor() public ERC721("SAFEQUERY", "SQR") {
        admin = msg.sender;
    }

    function mint(string memory tokenURI,address receiver) public {
        _mint(msg.sender, counter);
        TokenValidators[counter]=receiver;
        _setTokenURI(counter, tokenURI);
        counter++;
    }

    function validate(uint256  tokenId,uint8  bountyType)public{
            require(msg.sender == admin || msg.sender == TokenValidators[tokenId]);
            ValidationState[tokenId] = true;
             emit approvedToken(tokenId, ownerOf(tokenId),bountyType);
    }

    function validateBatch(uint256[] calldata tokenIds,uint8[] calldata bountyType) public {
        require(msg.sender == admin );
        for (uint16 a; a < tokenIds.length - 1; a++) {
            ValidationState[tokenIds[a]] = true;
            emit approvedToken(tokenIds[a], ownerOf(tokenIds[a]),bountyType[a]);
        }
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {}
}
