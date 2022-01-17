export const address =
  window.location.hostname === "shelf.blockheads.family"
    ? "fff"
    : "0x68766A7307AE44976feC07a036829D6813367A6b";

export const ABI = [
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function separate(uint256 tokenId) external",
];
