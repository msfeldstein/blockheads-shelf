import { Link } from "react-router-dom";
import { Blockhead } from "./types";

export default function CollectionPartsTile({ token, prefix }: { token: Blockhead, prefix: string }) {
  const tokenURI = token.tokenURI;
  const json = JSON.parse(
    Buffer.from(tokenURI.split(",")[1], "base64").toString()
  );
  const image = Buffer.from(json.image.split(",")[1], "base64").toString();
  const layer = json.attributes.find(
    (attr: any) => attr.trait_type === "Layer"
  ).value;
  const name = json.attributes.find(
    (attr: any) => attr.trait_type === "Piece"
  ).value;
  return (
    <Link to={'/build-a-grail'}>
      <div className="collection-tile">
        <div dangerouslySetInnerHTML={{ __html: image }}></div>
        <div className="name">{name}</div>
        <div className="profession">{layer}</div>
      </div>
    </Link>
  );
}
