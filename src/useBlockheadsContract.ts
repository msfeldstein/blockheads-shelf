import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { useEthers } from "@usedapp/core";

import { useMemo } from "react";
import { address as contractAddress, ABI } from "./ContractV2";

export default function useBlockheadsContract() {
  const { library } = useEthers()
  return useMemo(() => {
    if (!library) return null
    const provider = new Web3Provider(library.provider);
    return new Contract(contractAddress!, ABI, provider);
  }, [library]);
}
