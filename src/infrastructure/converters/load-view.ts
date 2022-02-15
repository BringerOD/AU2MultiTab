import { valueConverter } from "aurelia";
import { Workspace } from "..";

@valueConverter("mapViewPathToViewModel")
export class MapViewPathToViewModel {
  toView(workspace: Workspace) {

    console.log(workspace);
    return "";
  }
}
