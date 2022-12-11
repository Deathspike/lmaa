import * as app from '.';

export type Job = {runAsync(add: JobAdd): Promise<void>};
export type JobAdd = (job: app.Job) => void;
