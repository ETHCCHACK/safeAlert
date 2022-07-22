// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract reportProof is ERC721 {
    address admin;
    address klaros;
    mapping(uint256=>bool)isBountyValidated;
    constructor() ERC721("safeAlertProof", "SAP") {
        admin = msg.sender;
    }
    function mintProof(uint256 tokenId)public{
        _mint(msg.sender,tokenId);


    }
    function setBountyAuthaurisation(bool state,uint256 tokenId)public{
        isBountyValidated[tokenId]= state;
    }

   function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
      _transfer(_msgSender(), recipient, amount);
      return true;
}


}
