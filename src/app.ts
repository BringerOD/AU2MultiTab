
import { IRouteViewModel, Routeable,route } from "aurelia";

@route({
    routes: [
      { id: 'home', path: '', component: import('./page'), title: 'Home' },
    //   { path: 'login', component: import('./auth'), title: 'Sign in' },
    //   { path: 'register', component: import('./auth'), title: 'Sign up' },
    //   { path: 'settings', component: import('./settings'), title: 'Settings' },
      { id: 'page', path: ':module/:page', component:  () => import('./page'), title: 'Loading' },
    //   { id: 'editor', path: 'editor/:slug?', component: import('./editor'), title: 'Editor' },
    //   { id: 'article', path: 'article/:slug', component: import('./article'), title: 'Article' },
    ]
  })
export class App implements IRouteViewModel {

    
    //   { route: ["shell/:section/:viewmodel/:id/:version?", ""], name: "shell", moduleId: PLATFORM.moduleName("shell", "shell"), nav: false, title: "Workspaces", auth: false },
    //   { route: ["shell/:section/pages/:viewmodel/:viewmodel/:id/:version?", ""], name: "shell", moduleId: PLATFORM.moduleName("shell", "shell"), nav: false, title: "Workspaces", auth: false },

    constructor(){

      //  document.body.className = "loading";
    }
    toggle(){

    //    document.body.className = "loading";
    }
}


export class MyApp implements IRouteViewModel {
  
}