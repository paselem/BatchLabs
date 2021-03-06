import { Model, Prop, Record } from "app/core";
import { FailureInfo, FailureInfoAttributes } from "./failure-info";

/**
 * Job terminate reason.
 * Can be either of the value listen below or some string specified by the user.
 */
export type JobTerminateReason = "JMComplete" | "MaxWallClockTimeExpiry"
    | "TerminateJobSchedule" | "AllTasksComplete" | "TaskFailed" | "UserTerminate" | string;

export const JobTerminateReason = {
    JMComplete: "JMComplete" as JobTerminateReason,
    MaxWallClockTimeExpiry: "MaxWallClockTimeExpiry" as JobTerminateReason,
    TerminateJobSchedule: "TerminateJobSchedule" as JobTerminateReason,
    AllTasksComplete: "AllTasksComplete" as JobTerminateReason,
    TaskFailed: "TaskFailed" as JobTerminateReason,
    /**
     * Default user terminated value
     */
    UserTerminate: "UserTerminate" as JobTerminateReason,
};

export interface JobExecutionInformationAttributes {
    startTime: Date;
    endTime: Date;
    poolId: string;
    failureInfo: FailureInfoAttributes;
    terminateReason: JobTerminateReason;
}

/**
 * Contains information about the execution of a job in the Azure
 */
@Model()
export class JobExecutionInformation extends Record<JobExecutionInformationAttributes> {
    @Prop() public startTime: Date;
    @Prop() public endTime: Date;
    @Prop() public poolId: string;
    @Prop() public failureInfo: FailureInfo;
    @Prop() public terminateReason: JobTerminateReason;
}
