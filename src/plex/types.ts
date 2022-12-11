import {DateTime} from 'luxon';

export type StatusValue = {
  id: string;
  lastPlayed: DateTime;
  watched: boolean;
  traceId: string;
};
