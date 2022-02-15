import Aurelia, { LoggerConfiguration, ConsoleSink, LogLevel, RouterConfiguration, StyleConfiguration } from "aurelia";
import * as GlobalResources from "./infrastructure/index";
import { App } from "./app";
//import Bootstrapper from "./bootstrapper";


const au = new Aurelia();

au.register(
  LoggerConfiguration.create({
    level: LogLevel.debug,
    sinks: [ConsoleSink],
  }),
  RouterConfiguration.customize({
    useUrlFragmentHash: true,
  }),
  // StyleConfiguration.shadowDOM({
  //   sharedStyles: [main],
  // }),
  GlobalResources
);

//Bootstrapper

au
  .app(App)
  .start();
