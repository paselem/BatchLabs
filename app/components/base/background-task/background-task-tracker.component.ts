import { Component, Input } from "@angular/core";
import { List } from "immutable";

import { BackgroundTask } from "./background-task.model";
import { BackgroundTaskService } from "./background-task.service";

@Component({
    selector: "bl-background-task-tracker",
    templateUrl: "background-task-tracker.html",
})
export class BackgroundTaskTrackerComponent {

    public currentTask: BackgroundTask;
    public otherTasks: List<BackgroundTask>;

    constructor(public taskManager: BackgroundTaskService) {
        taskManager.runningTasks.subscribe((tasks) => {
            this.currentTask = tasks.first();
            this.otherTasks = tasks.shift();
        });
    }
}

@Component({
    selector: "bl-background-task-tracker-item",
    templateUrl: "background-task-tracker-item.html",
})
export class BackgroundTaskTrackerItemComponent {
    @Input()
    public task: BackgroundTask;
}
