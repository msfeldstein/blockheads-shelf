import { useEffect, useState } from "react";
import { IndividualPart } from "./types";
import { useEthers } from "@usedapp/core";
import { fetchTokenWithSVG } from "./BlockheadsUtil";
import useBlockheadsPartsContract from "./useBlockheadsPartsContract";

export enum LoadingState {
  FETCHING_BALANCE,
  GETTING_TOKEN_IDS,
  DETACHING_PARTS,
  LOADED,
}

export default function useBlockheadsPartsList(address?: string) {
  let { account } = useEthers();
  const contract = useBlockheadsPartsContract();

  const targetAccount = address || account;

  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.FETCHING_BALANCE
  );
  const [tokens, setTokens] = useState<IndividualPart[]>([]);

  useEffect(() => {
    async function effect() {
      if (!targetAccount || !contract) return
      let usingAccount = targetAccount

      let balance = await contract.balanceOf(usingAccount);
      setLoadingState(LoadingState.GETTING_TOKEN_IDS);

      const promises = [];

      for (var i = balance.toNumber() - 1; i >= 0; i--) {
        const id = await contract.tokenOfOwnerByIndex(usingAccount, i);
        promises.push(fetchTokenWithSVG(id.toNumber(), contract));
      }

      const parts = await Promise.all(promises);

      setTokens(parts.map(part => {
        console.log(part.image)
        const rawSVG = /<g id='content'>(.*)<\/g>/.exec(part.image)![1]
        return { ...part, rawSVG: rawSVG, layer: part.attributes.Layer }
      }))

      setLoadingState(LoadingState.LOADED);
    }
    effect();
  }, [contract, targetAccount]);
  return {
    account,
    loadingState,
    tokens,
  }
}
