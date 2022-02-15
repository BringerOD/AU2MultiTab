import { IModule } from "@aurelia/kernel";

export class ViewLocatorService {
  routes: RoutableView[] = [];

  constructor() {
      
    this.routes?.push(new RoutableView(import("./../../modules/layout/pages/testpage"), "layout", "testpage"));
    this.routes?.push(new RoutableView(import("./../../modules/layout/pages/testpage2"), "layout", "testpage2"));
  }

  getView(module: string, page: string): RoutableView | undefined {
    return this.routes.find(
      (x) => x.module?.toLowerCase() == module.toLowerCase() && x.page.toLowerCase() === page.toLowerCase()
    );
  }
}

export class RoutableView {
  view: any;
  module: string;
  page: string;
  
  constructor(view: any, module: string, page: string) {
    this.view = view;
    this.module = module;
    this.page = page;
  }
}
