import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Blockhead, Parts } from "./types";
import useBlockheadsContract from "./useBlockheadsContract";
import { fetchTokenWithSVG, fetchParts } from "./BlockheadsUtil";
import PartsDisplay from "./PartsDisplay";
import "./ViewToken.css";
import { Link } from "react-router-dom";
import downloadSVG from "./downloadSVG";
import { useContractFunction } from "@usedapp/core";
import { useHistory } from "react-router-dom";

export default function ViewToken() {
  let { tokenId } = useParams<{ tokenId?: string }>();
  const [token, setToken] = useState<Blockhead | undefined>();
  const [parts, setParts] = useState<Parts | undefined>();
  const contract = useBlockheadsContract();
  const svgContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<
    HTMLInputElement
  >;
  const { send } = useContractFunction(contract!, "separate");
  const [sendingSeparate, setSendingSeparate] = useState(false);
  const history = useHistory()
  useEffect(() => {
    let id = tokenId as string;
    async function effect() {
      if (!contract) return;
      const blockhead = await fetchTokenWithSVG(parseInt(id), contract)
      setToken(blockhead);
      const parts = await fetchParts(parseInt(id), contract);
      setParts(parts);
    }
    effect();
  }, [contract, tokenId]);

  if (!token) {
    return <div>Loading...</div>;
  }

  const name = token.name?.includes("#")
    ? token.name.split(" ")[1]
    : token.name;
  const download = () => {
    const svg = svgContainerRef.current.childNodes[0] as SVGGraphicsElement;
    downloadSVG(svg)
  };

  const separate = async () => {
    if (sendingSeparate) return
    setSendingSeparate(true)
    await send(token.tokenId)
    history.push("/collection")
  }

  return (
    <div className="view-token">
      <div className="token-info-container">
        <h1 className="blockhead-id">{name}</h1>
        <h2>{token.attributes!.Profession}</h2>
        <div
          ref={svgContainerRef}
          className="image"
          dangerouslySetInnerHTML={{ __html: token.image! }}
        ></div>
        <div className="sub-buttons">
          <div className="reconfigurator-button">
            <Link to={`/reconfigurator/${tokenId}`}>Reconfigurate</Link>
          </div>
          |
          <div className="download-button" onClick={download}>
            Download
          </div>
          |
          <div className="separate-button" onClick={separate}>
            {sendingSeparate ? "Separating..." : "Separate"}
          </div>
        </div>
      </div>
      <div className="parts-container">
        {parts && <PartsDisplay parts={parts} />}
      </div>
    </div>
  );
}
