// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract safeAlert is ERC721URIStorage {
address admin;
mapping(uint256=>bool)ValidationState;

event approvedToken(uint256 tokenId);
  constructor()ERC721("SAFEQUERY","SQR")public{
    admin = msg.sender;
  }
  function mint(uint256 tokenId,string memory tokenURI)public{
_mint(msg.sender,tokenId);
_setTokenURI(tokenId,tokenURI);

  }
  function validate(uint256 tokenId)public{
    require(msg.sender == admin);
    ValidationState[tokenId] = true;
  }
function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override{}
}
