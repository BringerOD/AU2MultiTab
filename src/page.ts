import { Params, RouteNode, bindable,   IRouteViewModel } from "aurelia";
import {  ViewLocatorService } from "./infrastructure";

export class Page implements IRouteViewModel {
  @bindable() view: any | undefined = undefined;

  constructor(private viewLocator: ViewLocatorService  ) {
      
  }

  async load(params: Params, next: RouteNode, current: RouteNode) {
    
    console.log(params);
    var route = this.viewLocator.getView(params.module!, params.page!)
        
    this.view = await route?.view;
    
    console.log(this.view);
  }
}
