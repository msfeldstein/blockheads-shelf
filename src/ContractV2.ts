export const address =
  window.location.hostname === "shelf.blockheads.family"
    ? "fff"
    : "0x469D66577B7291936D3780F34B8fdD1Ecb06c98C";

export const ABI = [
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function separate(uint256 tokenId) external",
  "function getBackgroundData(uint256 tokenId) public view returns (bytes memory)",
  "function getBodyData(uint256 tokenId) public view returns (bytes memory)",
  "function getArmsData(uint256 tokenId) public view returns (bytes memory)",
  "function getHeadData(uint256 tokenId) public view returns (bytes memory)",
  "function getFaceData(uint256 tokenId) public view returns (bytes memory)",
  "function getHeadwearData(uint256 tokenId) public view returns (bytes memory)",
  "function getBackgroundLabel(uint256 tokenId) public view returns (string memory)",
  "function getBodyLabel(uint256 tokenId) public view returns (string memory)",
  "function getArmsLabel(uint256 tokenId) public view returns (string memory)",
  "function getHeadLabel(uint256 tokenId) public view returns (string memory)",
  "function getFaceLabel(uint256 tokenId) public view returns (string memory)",
  "function getHeadwearLabel(uint256 tokenId) public view returns (string memory)",
  "function swapParts(uint256 token1, uint256 token2, bool background, bool body, bool arms, bool heads, bool faces, bool headwear)",
];
