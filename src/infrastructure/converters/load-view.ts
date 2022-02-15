import { valueConverter } from "aurelia";

@valueConverter("mapViewPathToViewModel")
export class MapViewPathToViewModel {
  toView(workspace: Workspace) {

    console.log(workspace);
    return "";
  }
}
