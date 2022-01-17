import { useMemo, useState } from "react";
import useBlockheadsList, { LoadingState } from "./useBlockheadsList";
import useBlockheadsParts, { partsFields } from "./useBlockheadsParts";
import './PartsBuilder.css';
import placeholderImage from './grail-placeholder.png';
import PartsBuilderTile from "./PartsBuilderTile";
import Connect from "./Connect";
import { useEthers } from "@usedapp/core";
import useBlockheadsPartsList from "./useBlockheadsPartsList";

interface GrailState {
  background: number | null;
  body: number | null;
  arms: number | null;
  head: number | null;
  face: number | null;
  headwear: number | null;
}

function PartsPreview({ svgData }: { svgData: string }) {
  return (
    <div
      className="grail-builder__placeholder-image"
      style={{ backgroundImage: `url(${placeholderImage})` }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 25 25"
        dangerouslySetInnerHTML={{ __html: svgData }}
      />
    </div>
  );
}

export default function PartsBuilder() {
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
  const { loadingState, tokens } = useBlockheadsPartsList(account!);

  const PartsPreviewSvg = useMemo(() => {
    return partsFields.map(field => {
      const activeTokenIdForPart = grailState[field];
      return ''// partsMap[activeTokenIdForPart ?? -1]?.[field].svg ?? '';
    }).join('');
  }, [grailState]);

  if (!account) {
    return <Connect />
  }
  console.log({loadingState})
  if (loadingState !== LoadingState.LOADED) {
    return <div>loading...</div>
  }

  return (
    <div className="grail-builder">
      <div className="grail-builder__preview">
        <div className="grail-builder__preview-container">
          <PartsPreview svgData={PartsPreviewSvg} />
        </div>
      </div>


      <div className="grail-builder__tokens">
        
      </div>
    </div>
  );
}
