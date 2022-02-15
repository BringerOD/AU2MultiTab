import { Workspace } from './workspace';
import { Router } from 'aurelia';
import * as _ from "lodash";

export class Workspaces {
  workSpaces: Workspace[];
  workSpacesHistory: string[];
  workSpacesTabOrdering: string[];
  currentKey: string | undefined;

  constructor(private router: Router) {
    this.router = router;
    this.workSpaces = [];
    this.workSpacesHistory = [];
    this.workSpacesTabOrdering = [];
  }

  closeWorkspace(workspace:Workspace) {
    workspace.isActive = false;

    // Check if it exists
    const existingWorkspace = _.find(this.workSpaces, function (x: Workspace) { return x.key === workspace.key; });

    if (existingWorkspace) {
      for (let i = this.workSpaces.length - 1; i >= 0; i--) {
        if (this.workSpaces[i].key === existingWorkspace.key) {
          this.workSpaces.splice(i, 1);
        }
      }

      for (let i = this.workSpacesTabOrdering.length - 1; i >= 0; i--) {
        if (this.workSpacesTabOrdering[i] === existingWorkspace.key) {
          this.workSpacesTabOrdering.splice(i, 1);
        }
      }

      _.remove(this.workSpacesHistory, function (n:string) {
        return n === existingWorkspace.key;
      });

      // to last history item.
      const lastkey = this.workSpacesHistory[this.workSpacesHistory.length - 1];

      if (lastkey) {
        const failback = _.find(this.workSpaces, function (x: Workspace) { return x.key === lastkey; });
        if (failback) {
          // const url1 = this.router.createViewportInstructions('shell', { section: failback.section, viewmodel: failback.viewModel, id: failback.id });
          // this.router.navigate(url1);
          return;
        }
      }

      const ticks = ((new Date().getTime() * 10000) + 621355968000000000);
      // const url = this.router.generate('shell', { section: 'home', viewmodel: 'welcome', id: ticks });
      // this.router.navigate(url);
    } else {
      // Failure,  workspace does not exist.
    }
  }

  unshiftWorkspace(section:string, viewmodel:string, id:string, metaData:string, params: any) {
    for (const item of this.workSpaces) {
      item.isActive = false;
    }

    // create a new one
    const tempWorkspace = new Workspace(section, viewmodel, id, metaData, params);
    this.unshiftWorkspaceObject(tempWorkspace);
  }

  unshiftWorkspaceObject(workspace: Workspace) {
    const existingWorkspace = _.find(this.workSpaces, function (x: Workspace) { return x.key === workspace.key; });

    if (existingWorkspace) {
      existingWorkspace.isActive = true;
    } else {
      this.workSpaces.push(workspace);
      this.workSpacesTabOrdering.unshift(workspace.key);
      this.workSpacesHistory.push(workspace.key);
    }

    if (existingWorkspace === undefined ? true : existingWorkspace.parentParams === undefined) {
      // clickSidebar(this.router);
    } else {
      // clickSidebar(this.router, existingWorkspace.parentParams);
    }
  }

  addWorkspace(section:string, viewmodel:string, id:string, metaData:string, params: any) {
    // Inactivate all workspaces
    for (const item of this.workSpaces) {
      item.isActive = false;
    }

    // create a new one
    const tempWorkspace = new Workspace(section, viewmodel, id, metaData, params);
    this.addWorkspaceObject(tempWorkspace);
  }

  addWorkspaceObject(workspace: Workspace) {
    // Check it it already exists
    const existingWorkspace = _.find(this.workSpaces, function (x: Workspace) { return x.key === workspace.key; });

    if (existingWorkspace) {
      existingWorkspace.isActive = true;
    } else {
      this.workSpaces.push(workspace);
      this.workSpacesTabOrdering.push(workspace.key);
      this.workSpacesHistory.push(workspace.key);
    }

    if (existingWorkspace === undefined ? true : existingWorkspace.parentParams === undefined) {
      // clickSidebar(this.router);
    } else {
      // clickSidebar(this.router, existingWorkspace.parentParams);
    }
  }

  addWorkspaceInIndex(section:string, viewmodel:string, id:string, metaData:string, index:number, params: any) {
    // Inactive all workspaces
    for (const item of this.workSpaces) {
      item.isActive = false;
    }

    // create a new one
    const tempWorkspace = new Workspace(section, viewmodel, id, metaData, params);
    this.addWorkspaceObjectInIndex(tempWorkspace, index);
  }

  addWorkspaceObjectInIndex(workspace: Workspace, index:number) {
    // Check it it already exists
    const existingWorkspace = _.find(this.workSpaces, function (x: Workspace) { return x.key === workspace.key; });

    if (existingWorkspace) {
      existingWorkspace.isActive = true;
    } else {
      this.workSpaces.splice(index, 0, workspace);
      // this.workSpaces.push(workspace);
      this.workSpacesTabOrdering.splice(index, 0, workspace.key);
      this.workSpacesHistory.push(workspace.key);
    }

    if (existingWorkspace === undefined ? true : existingWorkspace.parentParams === undefined) {
      // clickSidebar(this.router);
    } else {
      // clickSidebar(this.router, existingWorkspace.parentParams);
    }
  }

  public findDelimiterWorkSpace(): number {
    for (let i = 0; i < this.workSpaces.length; i++) {
      if (this.workSpaces[i].metaData.IsDelimiter) {
        return i;
      }
    }
    return -1;
  }

  public findWorkspace(key: string): Workspace | undefined {
    return this.workSpaces.find(x => x.key === key);
  }

  public moveWorkspaceToEnd(key: string): void {
    if (!this.findWorkspace(key)) return;

    for (let i = this.workSpacesTabOrdering.length - 1; i >= 0; i--) {
      if (this.workSpacesTabOrdering[i] === key) {
        this.workSpacesTabOrdering.splice(i, 1);
      }
    }

    this.workSpacesTabOrdering.push(key);
  }
}
