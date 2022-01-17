import CollectionTile from "./CollectionTile";
import "./Collection.css";
import { useEthers } from "@usedapp/core";
import Connect from "./Connect";
import { useParams } from "react-router";
import useBlockheadsList from "./useBlockheadsList";
import useBlockheadsPartsList from "./useBlockheadsPartsList";
import CollectionPartsTile from "./CollectionPartsTile";
enum LoadingState {
  FETCHING_BALANCE,
  GETTING_TOKEN_IDS,
  DETACHING_PARTS,
  LOADED,
}

export default function CollectionPartsList() {
  let { address } = useParams<{ address?: string }>();
  let { account } = useEthers();
  if (address) {
    account = address
  }
  //   account = "0x4e392d913A69f74359504A39ED41E5d5FEb53d43"
  const { loadingState, tokens} = useBlockheadsPartsList(account!);
  console.log(tokens)
  const loadingMessage =
    loadingState === LoadingState.LOADED ? null : <h3>Loading</h3>;
  return (
    <div>
      <h1 className="collectionLabel">Unused Parts</h1>
      {loadingMessage}
      <div className="tiles">
        {tokens.map((token) => (
          <CollectionPartsTile prefix="/view/" key={token.tokenId} token={token} />
        ))}
      </div>
      <h1 className = "collectionLabel">Unused Parts</h1>
    </div>
  );
}
