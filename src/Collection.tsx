import * as ethers from "ethers";
import { useEffect, useState } from "react";
import { Blockhead } from "./types";
import { address as contractAddress, ABI } from "./ContractInfo";
import CollectionTile from "./CollectionTile";
import "./Collection.css";
import { useEthers } from "@usedapp/core";
import Connect from "./Connect";
import { useParams } from "react-router";
import useBlockheadsList from "./useBlockheadsList";
enum LoadingState {
  FETCHING_BALANCE,
  GETTING_TOKEN_IDS,
  DETACHING_PARTS,
  LOADED,
}

export default function Collection() {
  let { address } = useParams<{ address?: string }>();
  let { account } = useEthers();
  if (address) {
    account = address
  }
  //   account = "0x4e392d913A69f74359504A39ED41E5d5FEb53d43"
  const { loadingState, tokens, usingFallback } = useBlockheadsList(undefined, "0xf1218d1b103be9a3f375c50a2eddd224966d242a");
  const demoMode = usingFallback ? <div className="grail-builder__demo-mode">Demo Mode: Using partsbin.eth's parts to play.  <a href="https://mint.blockheads.family">Mint</a> or buy on <a href="https://opensea.io/collection/blockheads-family">OpenSea</a> to play with your own.</div> : null
  console.log(tokens)
  const loadingMessage =
    loadingState === LoadingState.LOADED ? null : <h3>Loading</h3>;

  if (!account) {
    return <Connect />
  }
  return (
    <div>
      <h1 className="collectionLabel">Collection</h1>
      {demoMode}
      {loadingMessage}
      <div className="tiles">
        {tokens.map((token) => (
          <CollectionTile prefix="/view/" key={token.tokenId} token={token} />
        ))}
      </div>
    </div>
  );
}
