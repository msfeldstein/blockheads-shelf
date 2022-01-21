import { useMemo, useState } from "react";
import { LoadingState } from "./useBlockheadsList";
import { IndividualPart } from "./types";
import './GrailBuilder.css';
import placeholderImage from './grail-placeholder.png';
import Connect from "./Connect";
import { useContractFunction, useEthers } from "@usedapp/core";
import useBlockheadsPartsList from "./useBlockheadsPartsList";
import GrailBuilderPartTileV2 from "./GrailBuilderPartTileV2";
import { partsFields } from "./useBlockheadsParts";
import useBlockheadsPartsContract from "./useBlockheadsPartsContract";

interface GrailState {
    background: IndividualPart | null;
    body: IndividualPart | null;
    arms: IndividualPart | null;
    head: IndividualPart | null;
    face: IndividualPart | null;
    headwear: IndividualPart | null;
}

function GrailPreview({ svgData }: { svgData: string }) {
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

export default function GrailBuilderV2() {
    let { account } = useEthers();
    const [grailState, setGrailState] = useState<GrailState>({
        background: null,
        body: null,
        arms: null,
        head: null,
        face: null,
        headwear: null
    });
    console.log({ grailState })
    // Fallback to partsbin.eth's account so people without blockheads can play
    const { loadingState, tokens } = useBlockheadsPartsList(account!);

    const [sendingBuild, setSendingBuild] = useState(false);
    const partsContract = useBlockheadsPartsContract()
    // @ts-ignore
    const { send } = useContractFunction(partsContract, "buildBlockhead");

    const grailPreviewSvg = useMemo(() => {
        return partsFields.map(field => {
            const token = grailState[field];
            return token?.rawSVG
        }).join('');
    }, [grailState]);

    if (!account) {
        return <Connect />
    }

    if (loadingState !== LoadingState.LOADED) {
        return <div>loading...</div>
    }

    function isSelected(token: IndividualPart) {
        // @ts-ignore
        return !!Object.keys(grailState).find(key => grailState[key] === token)
    }

    async function sendBuild() {
        const partsList = [
            grailState.background?.tokenId,
            grailState.body?.tokenId,
            grailState.arms?.tokenId,
            grailState.head?.tokenId,
            grailState.face?.tokenId,
            grailState.headwear?.tokenId
        ]
        setSendingBuild(true)
        await send(partsList)
        setSendingBuild(false)
    }

    return (
        <div className="grail-builder">
            <div className="grail-builder__preview">
                <div className="grail-builder__preview-container">
                    <GrailPreview svgData={grailPreviewSvg} />
                </div>
                <button disabled={sendingBuild} onClick={sendBuild}>{sendingBuild ? "Building..." : "Build"}</button>
            </div>


            <div className="grail-builder__parts">
                {tokens.map(token => (
                    <div key={token.tokenId} className="grail-builder__token">
                        <GrailBuilderPartTileV2
                            key={`${token.tokenId}-${token.name}`}
                            isSelected={isSelected(token)}
                            onClick={(i) => {
                                console.log(i)

                                setGrailState({ ...grailState, [token.layer.toLowerCase()]: token })
                            }}
                            token={token}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
