import { useEthers } from "@usedapp/core";
import { useMemo } from "react";
import { address as contractAddress, ABI } from "./ContractParts";
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from "@ethersproject/providers";

export default function useBlockheadsPartsContract() {
  const { library } = useEthers()
  return useMemo(() => {
    if (!library) return null
    const provider = new Web3Provider(library.provider);
    return new Contract(contractAddress!, ABI, provider);
  }, [library]);
}
