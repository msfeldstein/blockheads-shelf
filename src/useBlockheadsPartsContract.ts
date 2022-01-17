import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { useMemo } from "react";
import { address as contractAddress, ABI } from "./ContractParts";

export default function useBlockheadsPartsContract() {
  const { library } = useEthers()
  return useMemo(() => {
    if (!library) return null
    const provider = new ethers.providers.Web3Provider(library.provider);
    return new ethers.Contract(contractAddress!, ABI, provider);
  }, [library]);
}
