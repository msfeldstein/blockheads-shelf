export const address =
  window.location.hostname === "shelf.blockheads.family"
    ? "xxx"
    : "0x3e5C403C35F677C30C2289aAf83dD44a1f84cDCC";

export const ABI = [
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function layerSVG(uint256 tokenId) public view returns (string memory)",
  "function buildBlockhead(uint256[6] calldata partTokens) public",
];
