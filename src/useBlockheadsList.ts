import { useEffect, useState } from "react";
import { Blockhead } from "./types";
import { useEthers } from "@usedapp/core";
import useBlockheadsContract from "./useBlockheadsContract";
import { fetchBlockhead } from "./BlockheadsUtil";

export enum LoadingState {
  FETCHING_BALANCE,
  GETTING_TOKEN_IDS,
  DETACHING_PARTS,
  LOADED,
}

export default function useBlockheadsList(address?: string, fallbackAddress?: string) {
  let { account } = useEthers();
  const contract = useBlockheadsContract();

  const targetAccount = address || account || fallbackAddress;

  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.FETCHING_BALANCE
  );
  const [tokens, setTokens] = useState<Blockhead[]>([]);
  const [usingFallback, setUsingFallback] = useState<boolean>(false)

  useEffect(() => {
    async function effect() {
      if (!contract) return
      let usingAccount = targetAccount

      let balance = await contract.balanceOf(usingAccount);
      if (balance.eq(0) && fallbackAddress) {
        setUsingFallback(true)
        usingAccount = fallbackAddress
        balance = await contract.balanceOf(usingAccount)
      }
      setLoadingState(LoadingState.GETTING_TOKEN_IDS);

      const promises = [];

      for (var i = 0; i < balance.toNumber(); i++) {
        const id = await contract.tokenOfOwnerByIndex(usingAccount, i);
        promises.push(fetchBlockhead(id.toNumber(), contract));
      }

      const blockheads = await Promise.all(promises);
      setTokens(blockheads);
      setLoadingState(LoadingState.LOADED);
    }
    effect();
  }, [contract, targetAccount, fallbackAddress, setUsingFallback]);

  return {
    account,
    loadingState,
    tokens,
    usingFallback
  }
}
