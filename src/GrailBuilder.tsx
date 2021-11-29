import { useMemo, useState } from "react";
import useBlockheadsList, { LoadingState } from "./useBlockheadsList";
import useBlockheadsParts, { partsFields } from "./useBlockheadsParts";
import './GrailBuilder.css';
import placeholderImage from './grail-placeholder.png';
import GrailBuilderPartTile from "./GrailBuilderPartTile";
import Connect from "./Connect";
import { useEthers } from "@usedapp/core";

interface GrailState {
  background: number | null;
  body: number | null;
  arms: number | null;
  head: number | null;
  face: number | null;
  headwear: number | null;
}

function GrailPreview({ svgData }: { svgData: string }) {
  return (
    <div
      style={{
        width: 500,
        height: 500,
        backgroundImage: `url(${placeholderImage})`,
        backgroundSize: 'cover',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="500"
        height="500"
        viewBox="0 0 25 25"
        dangerouslySetInnerHTML={{ __html: svgData }}
      />
    </div>
  );
}

export default function GrailBuilder() {
  let { account } = useEthers();
  const [grailState, setGrailState] = useState<GrailState>({
    background: null,
    body: null,
    arms: null,
    head: null,
    face: null,
    headwear: null,
  });
  // Fallback to partsbin.eth's account so people without blockheads can play
  const { loadingState, tokens, usingFallback } = useBlockheadsList(undefined, "0xf1218d1b103be9a3f375c50a2eddd224966d242a");
  const partsMap = useBlockheadsParts(tokens);

  const grailPreviewSvg = useMemo(() => {
    return partsFields.map(field => {
      const activeTokenIdForPart = grailState[field];
      return partsMap[activeTokenIdForPart ?? -1]?.[field].svg ?? '';
    }).join('');
  }, [grailState, partsMap]);

  if (!account) {
    return <Connect />
  }
  console.log({loadingState})
  if (loadingState !== LoadingState.LOADED) {
    return <div>loading...</div>
  }

  const demoMode = usingFallback ? <div className="grail-builder__demo-mode">Demo Mode: Using partsbin.eth's parts to play.  <a href="https://mint.blockheads.family">Mint</a> or buy on <a href="https://opensea.io/collection/blockheads-family">OpenSea</a> to play with your own.</div> : null

  return (
    <div className="grail-builder">
      <div className="grail-builder__preview">
        <div className="grail-builder__preview-container">
          <GrailPreview svgData={grailPreviewSvg} />
        </div>
      </div>


      <div className="grail-builder__tokens">
        {demoMode}
        {tokens.map(token => (
          <div key={token.tokenId} className="grail-builder__token">
            {!partsMap[token.tokenId]
              ? <h3>Loading parts for Blockhead #{token.tokenId}...</h3>
              : <h3>#{token.tokenId}</h3>
            }

            {partsMap[token.tokenId] && (
              <div className="grail-builder__parts">
                {partsFields.map(part => (
                  <GrailBuilderPartTile
                    key={`${token.tokenId}-${part}`}
                    isSelected={grailState[part] === token.tokenId}
                    label={partsMap[token.tokenId][part].label ?? ''}
                    onClick={() => setGrailState({ ...grailState, [part]: token.tokenId })}
                    svgData={partsMap[token.tokenId][part].svg ?? ''}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
