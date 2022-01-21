import GrailBuilder from "./GrailBuilder";
import Collection from "./Collection";
import { Route, Switch } from "react-router";
import ViewToken from "./ViewToken";
import Reconfigurator from "./Reconfigurator";
import GrailBuilderV2 from "./GrailBuilderV2";

export default function ConnectedContent() {
  return (
    <Switch>
      <Route path="/build-a-grail">
        <GrailBuilder />
      </Route>
      <Route path="/build-a-grail-v2">
        <GrailBuilderV2 />
      </Route>

      <Route path="/view/:tokenId">
        <ViewToken />
      </Route>
      <Route path="/reconfigurator/:tokenId1/:tokenId2">
        <Reconfigurator />
      </Route>
      <Route path="/reconfigurator/:tokenId1">
        <Reconfigurator />
      </Route>

      <Route path="/collection/:address">
        <Collection />
      </Route>
      <Route path="/collection">
        <Collection />
      </Route>
      <Route path="/">
        <Collection />
      </Route>
    </Switch>
  );
}
