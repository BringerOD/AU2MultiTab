
// import { inject, Router, singleton } from 'aurelia';
// import * as _ from 'lodash';
// import { Workspaces } from './infrastructure';
// import { Workspace } from './infrastructure/workspaces/workspace';

// @inject()
// @singleton()
// export class Shell {

//   debug: boolean = false;
//   router: Router;
//   header: string;
//   workspaces: Workspace;
//   keyOfTabClicked: string;
//   sortableOptions: SortableOptions = {
//     handle: 'a.d-flex.align-items-center',
//   };
//   private workspaceTabs: Element | undefined;
//   private scroll: Element | undefined;
//   private isWorkspaceScrolling: boolean;
//   private scrolDirection: number | undefined;
//   private scrollingInterval: NodeJS.Timeout | undefined;
  

//   private cardBoxStyles: any;

//   constructor(router: Router) {
    
//     this.router = router;
//     this.header = 'Welcome!';
//     this.workspaces = new Workspaces(this.router);
//     this.keyOfTabClicked = "";
//     this.isWorkspaceScrolling = false;
//     this.cardBoxStyles = {
//       'padding': '20px',
//       // 'border': '1px solid rgba(54, 64, 74, .08)',
//       '-webkit-border-radius': '5px',
//       'border-radius': '5px',
//       '-moz-border-radius': '5px',
//       'background-clip': 'padding-box',
//       'margin-top': '27px',
//       'background-color': '#f7f7f7',
//     };
//   }

//   // TODO: do we need this function?
//   // private checkPrevWorkspace(prevWorkspaceObj: any): boolean {
//   //   const prevWorkspace: Workspace[] = prevWorkspaceObj.workspaces;
//   //   const prevTabOrder: string[] = prevWorkspaceObj.tabOrder;
//   //   const prevHistory: string[] = prevWorkspaceObj.history;

//   //   // check if previous workspace/tab order/history exist
//   //   if (!prevWorkspace || !prevTabOrder || !prevHistory) {
//   //     return false;
//   //   }

//   //   // check that they're all the same length
//   //   if (prevWorkspace.length !== prevTabOrder.length ||
//   //     prevWorkspace.length !== prevHistory.length ||
//   //     prevTabOrder.length !== prevHistory.length) {
//   //     return false;
//   //   }

//   //   // check if the key is the same in the three objects
//   //   for (let i = 0; i < prevTabOrder.length; i++) {
//   //     if (prevWorkspace.findIndex(x => x.key === prevTabOrder[i]) === -1 ||
//   //       prevHistory.findIndex(x => x === prevTabOrder[i]) === -1) {
//   //       return false;
//   //     }
//   //   }

//   //   return true;
//   // }

//   userDragEnded(event: CustomEvent) {
//     const temp: string = this.workspaces.workSpacesTabOrdering[event.detail.oldIndex];
//     this.workspaces.workSpacesTabOrdering.splice(event.detail.oldIndex, 1);
//     this.workspaces.workSpacesTabOrdering.splice(event.detail.newIndex, 0, temp);

//     // const temp2: Workspace = this.workspaces.workSpaces[event.detail.oldIndex];
//     // this.workspaces.workSpaces.splice(event.detail.oldIndex, 1);
//     // this.workspaces.workSpaces.splice(event.detail.newIndex, 0, temp2);
//   }

//   private activate(params) {
//     if (!params.section.length) {
//       const url = this.router.generate('shell', { section: 'home', viewmodel: 'welcome', id: 'default' });
//       this.router.navigate(url, undefined);
//     } else {
//       this.addWorkspace(params);
//       this.saveWorkspaces();
//     }
//   }

//   public saveWorkspaces() {
//     // this.workspace has event aggregator + router which have circular dependencies in them, so we gotta do it this way
//     localStorage.setItem("workspaces", JSON.stringify({ workspaces: this.workspaces.workSpaces, history: this.workspaces.workSpacesHistory, tabOrder: this.workspaces.workSpacesTabOrdering }));
//   }

//   public removeWorkspaceInLocalStorage() {
//     localStorage.removeItem("workspaces");
//   }

//   private setScrollDirection(direction: boolean) {
//     this.scrolDirection = direction ? 1 : -1; // false for left and true for right
//   }

//   private scrolling() {
//     this.isWorkspaceScrolling = true;

//     const scrollX = this.scroll.scrollLeft + 300 * this.scrolDirection;
//     this.scroll.scrollTo({ left: scrollX, behavior: 'smooth' });
//   }

//   private shellTabMouseDown() {
//     this.scrollingInterval = setInterval(() => this.scrolling(), 200);
//   }

//   private shellTabMouseUp() {
//     clearInterval(this.scrollingInterval);

//     this.scroll.scrollBy(150 * this.scrolDirection, 0);
//     this.isWorkspaceScrolling = false;
//   }

//   private stopScrolling() {
//     clearInterval(this.scrollingInterval);
//     this.isWorkspaceScrolling = false;
//   }

//   private scrollingByWheel(e) {
//     if (e.deltaY > 0) this.scroll.scrollLeft += 200;
//     else this.scroll.scrollLeft -= 200;
//   }

//   private activateScrollWheel(e: MouseEvent) {
//     this.workspaceTabs.addEventListener('wheel', (x) => this.scrollingByWheel(x), { passive: true });
//     this.disableScroll();
//   }

//   public enableScroll(): void {
//     document.removeEventListener('wheel', this.preventDefault, false);
//   }

//   public disableScroll(): void {
//     document.addEventListener('wheel', this.preventDefault, {
//       passive: false,
//     });
//   }

//   public preventDefault(e: any) {
//     e = e || window.event
//     if (e.preventDefault) {
//       e.preventDefault()
//     }
//     e.returnValue = false
//   }

//   private closeThisTab(): void {
//     for (const key of this.workspaces.workSpaces) {
//       if (this.keyOfTabClicked === key.key) {
//         this.closeWorkspace(key);
//       }
//     }
//   }

//   private closeAllRightTabs(): void {
//     for (let i = this.workspaces.workSpacesTabOrdering.length - 1; i > 0; i--) {
//       this.keyOfTabClicked === this.workspaces.workSpacesTabOrdering[i] ? i = -1 : this.closeWorkspace(this.workspaces.workSpaces.find(x => x.key === this.workspaces.workSpacesTabOrdering[i]));
//     }

//     // for (let i = this.workspaces.workSpaces.length - 1; i > 0; i--) {
//     //   this.keyOfTabClicked === this.workspaces.workSpaces[i].key ? i = -1 : this.closeWorkspace(this.workspaces.workSpaces[i]);
//     // }
//   }

//   private closeAllButThisTab(): void {
//     for (let i = 0; i < this.workspaces.workSpaces.length; i++) {
//       if (!(this.keyOfTabClicked === this.workspaces.workSpaces[i].key)) {
//         this.closeWorkspace(this.workspaces.workSpaces[i]);
//         i--;
//       }
//     }
//   }

//   cancelWarning(workspace: Workspace) {
//     workspace.needsWarning = false;
//   }


//   private closeAllTabs(): void {
//     for (let i = this.workspaces.workSpaces.length - 1; i >= 0; i--) {
//       this.closeWorkspace(this.workspaces.workSpaces[i]);
//     }
//   }

//   closeWorkspace(workspace: Workspace) {

//     if (!_.isNil(workspace?.didNotSaveWarning) && workspace.didNotSaveWarning() && !workspace.needsWarning) {
//       workspace.needsWarning = true;
//       return;
//     }

//     this.workspaces.closeWorkspace(workspace);
//     this.saveWorkspaces();
//   }

//   private handleClickEvents(event: MouseEvent, key): void {
//     // this.attachRightClickMenu(event, key);
//     this.closeOnMiddleClick(event, this.workspaces.findWorkspace(key));
//     // if (this.workspaces.findWorkspace(this.workspaces.currentKey))
//     //   this.workspaces.findWorkspace(this.workspaces.currentKey).scrollPosition = _.clone(window.pageYOffset);
//     this.workspaces.currentKey = key;
//     // document.body.scrollTop = 0; // For Safari
//     // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
//   }

//   private attachRightClickMenu(event: MouseEvent, key: string) {
//     if (event.button === 2) {
//       this.keyOfTabClicked = key;

//       event.preventDefault();
//       event.stopPropagation();
//       $("#cntnr").css("left", event.pageX);
//       $("#cntnr").css("top", event.pageY);
//       $("#cntnr").fadeIn(200,
//         function () {
//           $(document).on("click", function () {
//             $("#cntnr").hide();
//             // $(document).off("click");
//           });
//         });
//     }
//   }

//   private closeOnMiddleClick(event: MouseEvent, workspace): void {
//     if (event.button === 1) {
//       event.preventDefault();
//       event.stopPropagation();
//       this.closeWorkspace(workspace);
//     }
//   }

//   private cancelDefaultContextMenu(event: MouseEvent) {
//     return false;
//   }

//   private addWorkspace(params): void {

//     let metaData;
//     if (params.metaData) {
//       metaData = JSON.parse(params.metaData);
//     }

//     // if it's an active call tab, just add it to the very front
//     if (metaData && metaData.IsActiveCall) {
//       // if there is no delimiter (no other active calls/chats), make this tab the delimiter
//       if (this.workspaces.findDelimiterWorkSpace() !== -1) {
//         metaData.IsDelimiter = true;
//         params.metaData = JSON.stringify(metaData);
//       }
//       this.workspaces.unshiftWorkspace(params.section, params.viewmodel, params.id, params.metaData, params);
//     }
//     // if the tab is an active chat, there are different options
//     else if (metaData && metaData.IsActiveChat) {
//       // if the user refreshes this.workspaces.WorkSpaces.length === 0
//       if (this.workspaces.workSpaces.length > 0) {
//         const tempWorkspace = this.workspaces.findWorkspace(this.workspaces.workSpacesTabOrdering[0]);

//         // if the left most tab is an active call, place the chat to the right of it
//         // NTS: Change agentChat to leadView later
//         if (tempWorkspace.viewModel === "agentChat" && tempWorkspace.metaData.IsActiveCall) {
//           this.setPreviousDelimiterToFalse();

//           metaData.IsDelimiter = true;
//           params.metaData = JSON.stringify(metaData);

//           this.workspaces.addWorkspaceInIndex(params.section, params.viewmodel, params.id, params.metaData, 1, params);
//         }
//         // if the left most tab is an active chat, add to the left of it
//         else if (tempWorkspace.viewModel === "agentChat" && tempWorkspace.metaData.IsActiveChat) {
//           this.workspaces.unshiftWorkspace(params.section, params.viewmodel, params.id, params.metaData, params);
//         }
//         // else just add left of existing tabs
//         else {
//           metaData.IsDelimiter = true;
//           params.metaData = JSON.stringify(metaData);
//           this.workspaces.unshiftWorkspace(params.section, params.viewmodel, params.id, params.metaData, params);
//         }
//       }
//       // else just add the workspace at this point | might do something with local storage to rebuild tabs
//       else {
//         this.workspaces.addWorkspace(params.section, params.viewmodel, params.id, params.metaData, params);
//       }
//     }
//     // if tab is just a "normal" tab
//     else {
//       this.workspaces.addWorkspaceInIndex(params.section, params.viewmodel, params.id, params.metaData, this.workspaces.workSpaces.findIndex(el => el.isActive) + 1, params);
//     }
//   }

//   // find the previous delimiter (if there is one) and set it to false
//   private setPreviousDelimiterToFalse(): void {
//     const index = this.workspaces.findDelimiterWorkSpace();
//     if (index !== -1) {
//       this.workspaces.workSpaces[index].metaData.IsDelimiter = false;
//     }
//   }

//   public moveWorkspaceToEnd(key): void {
//     this.workspaces.moveWorkspaceToEnd(key);
//   }
// }
