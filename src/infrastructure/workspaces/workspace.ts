
import { observable } from "@aurelia/runtime";
import { Router } from "aurelia";
// import { clickSidebar } from "../../components/sidebar";

export class Workspace implements IWorkSpace {
  section: string;
  viewModel: string;
  displayName: string;
  parentParams;
  id: string;
  icon: string;
  @observable isActive: boolean;
  href: string;
  key: string;
  didNotSaveWarning: (() => boolean | null) | undefined;
  saveModel: (() => Promise<void>) | undefined;
  draftItem: boolean | undefined;
  isHistorical: boolean | undefined;
  needsWarning: boolean;
  saveSuccessful: boolean;
  metaData: any;
  scrollPosition: number | undefined;

  constructor(section: string, viewmodel: string, id: string, metaData: string, params: any) {
    this.section = section;
    this.viewModel = viewmodel;
    this.displayName = viewmodel;
    this.id = id;
    this.isActive = true;
    this.href = '#/shell/' + section + '/' + viewmodel + '/' + id;
    this.key = 'KEY-' + section + '-' + viewmodel + '-' + id;
    this.icon = "fas fa-square"; // Needs a blank icon to make tab sizes uniform if icon is blank; I expect for every page to overwrite the icon
    this.parentParams = params;
    if (metaData) {
      this.metaData = JSON.parse(metaData);
    }
    this.needsWarning = false;
    this.saveSuccessful = false;
  }

  overrideActiveNav(router: Router, params: any) {
    this.parentParams = params;
    // clickSidebar(router, params);
  }

  public isActiveChanged(newValue: boolean, oldValue:boolean) {
    if (!newValue)
      this.scrollPosition = window.pageYOffset;
  }
}

interface IWorkSpace {
  didNotSaveWarning?: any;
  saveModel?: () => void;
  draftItem?: boolean;
}
