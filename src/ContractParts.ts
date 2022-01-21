export const address =
  window.location.hostname === "shelf.blockheads.family"
    ? "xxx"
    : "0x218aA5791C81c5e4efE4d095C530359cF190d0AB";

export const ABI = [
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function layerSVG(uint256 tokenId) public view returns (string memory)",
  "function buildBlockhead(uint256[6] calldata partTokens) public",
];
