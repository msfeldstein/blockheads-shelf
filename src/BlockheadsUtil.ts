import { ethers } from "ethers";
import { Parts } from "./types";

function hexToUTF8(hex: string) {
  if (hex.length === 0) return "";
  return decodeURIComponent("%" + hex.match(/.{1,2}/g)!.join("%"));
}

function dataBlockToSVG(dataBlockStr: string) {
  return hexToUTF8(dataBlockStr.substr(2))
}

export async function fetchTokenWithSVG(tokenId: number, contract: ethers.Contract) {
  const tokenURI = await contract.tokenURI(tokenId);
  const json = JSON.parse(
    Buffer.from(tokenURI.split(",")[1], "base64").toString()
  );
  const image = Buffer.from(json.image.split(",")[1], "base64").toString();
  return {
    tokenId,
    tokenURI,
    image,
    name: json.name,
    attributes: json.attributes.reduce((prev: any, curr: any) => {
      prev[curr.trait_type] = curr.value;
      return prev;
    }, {})
  }
}

export async function fetchParts(
  tokenId: number,
  contract: ethers.Contract
): Promise<Parts> {
  const [
    bgData,
    bodyData,
    armsData,
    headData,
    faceData,
    headwearData,
    bgLabel,
    bodyLabel,
    armsLabel,
    headLabel,
    faceLabel,
    headwearLabel,
  ] = await Promise.all([
    contract.getBackgroundData(tokenId),
    contract.getBodyData(tokenId),
    contract.getArmsData(tokenId),
    contract.getHeadData(tokenId),
    contract.getFaceData(tokenId),
    contract.getHeadwearData(tokenId),

    contract.getBackgroundLabel(tokenId),
    contract.getBodyLabel(tokenId),
    contract.getArmsLabel(tokenId),
    contract.getHeadLabel(tokenId),
    contract.getFaceLabel(tokenId),
    contract.getHeadwearLabel(tokenId),
  ]);

  return {
    background: {
      svg: dataBlockToSVG(bgData),
      label: bgLabel,
    },
    body: {
      svg: dataBlockToSVG(bodyData),
      label: bodyLabel,
    },
    arms: {
      svg: dataBlockToSVG(armsData),
      label: armsLabel,
    },
    head: {
      svg: dataBlockToSVG(headData),
      label: headLabel,
    },
    face: {
      svg: dataBlockToSVG(faceData),
      label: faceLabel,
    },
    headwear: {
      svg: dataBlockToSVG(headwearData),
      label: headwearLabel,
    },
  };
}
