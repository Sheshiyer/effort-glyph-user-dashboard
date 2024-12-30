// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract EffortGlyphTest is ERC721, ERC721URIStorage, Ownable, ERC2771Context {
    uint256 private _nextTokenId;

    mapping(uint256 => string) public achievementTypes;
    mapping(string => uint256) public requiredHours;

    event AchievementMinted(
        address indexed recipient,
        uint256 tokenId,
        string achievementType,
        string uri
    );
    
    event RequiredHoursUpdated(
        string achievementType,
        uint256 requiredHours
    );

    constructor(address trustedForwarder) 
        ERC721("EffortGlyphTest", "EGLYPHTEST") 
        Ownable(msg.sender)
        ERC2771Context(trustedForwarder)
    {}

    function setRequiredHours(string memory achievementType, uint256 _requiredHours) public onlyOwner {
        requiredHours[achievementType] = _requiredHours;
        emit RequiredHoursUpdated(achievementType, _requiredHours);
    }

    function mintAchievement(
        address recipient,
        string memory achievementType,
        string memory uri
    ) public onlyOwner returns (uint256) {
        require(bytes(achievementType).length > 0, "Achievement type cannot be empty");
        require(bytes(uri).length > 0, "URI cannot be empty");

        _nextTokenId++;
        uint256 newTokenId = _nextTokenId;

        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, uri);
        achievementTypes[newTokenId] = achievementType;

        emit AchievementMinted(recipient, newTokenId, achievementType, uri);

        return newTokenId;
    }

    function getAchievementType(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return achievementTypes[tokenId];
    }

    function getRequiredHours(string memory achievementType) public view returns (uint256) {
        return requiredHours[achievementType];
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Override _msgSender to enable gasless transactions
    function _msgSender() internal view override(Context, ERC2771Context) returns (address) {
        return ERC2771Context._msgSender();
    }

    // Override _msgData to enable gasless transactions
    function _msgData() internal view override(Context, ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }
}
