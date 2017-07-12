import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { remote } from "electron";
import * as MouseTrap from "mousetrap";

import { log } from "app/utils";
import { AppModule } from "./app.module";
import { handleCoreError } from "./error-handler";
import { GenieModule } from "./genie.module";

// Setup extension methods
import "chart.js";
import "hammerjs";
import "./utils/extensions";

import "codemirror/addon/hint/show-hint.css";
import "codemirror/lib/codemirror.css";
import "font-awesome/css/font-awesome.min.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "./environment";
import "./styles/main.scss";

(remote.getCurrentWindow() as any).splashScreen.updateMessage("Initializing app");
// const isMainWindow = (remote.getCurrentWindow() as any).foo !== 1;

const platform = platformBrowserDynamic();
// const moduleToLoad = isMainWindow ? AppModule : GenieModule;
// console.log("Loading module: ", moduleToLoad);

platform.bootstrapModule(AppModule)
    .catch (error => {
        log.error("Bootstrapping failed :: ", error);
        handleCoreError(error);
    });

MouseTrap.bind("ctrl+shift+i", () => {
    if (remote.getCurrentWindow().webContents.isDevToolsOpened()) {
        remote.getCurrentWindow().webContents.closeDevTools();
    } else {
        remote.getCurrentWindow().webContents.openDevTools();
    }
});
