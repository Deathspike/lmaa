import * as app from '.';

export type Job = {runAsync(add: JobAdd): Promise<void>};
export type JobAdd = (value: Iterable<app.Job> | app.Job) => void;
