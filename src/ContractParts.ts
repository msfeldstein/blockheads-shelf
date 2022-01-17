export const address =
  window.location.hostname === "shelf.blockheads.family"
    ? "xxx"
    : "0x20085A5fe42Ec0e3Ed4643D178D9CC2DF1f73030";

export const ABI = [
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function layerSVG(uint256 tokenId) public view returns (string memory)",
];
