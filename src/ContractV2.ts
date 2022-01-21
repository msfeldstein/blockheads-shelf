export const address =
  window.location.hostname === "shelf.blockheads.family"
    ? "fff"
    : "0x469D66577B7291936D3780F34B8fdD1Ecb06c98C";

export const ABI = [
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function separate(uint256 tokenId) external",
];
