import { Response } from 'express';
import { ObjectId, Document } from 'mongoose';

import type { UserT } from './usersT';
import type { TaskT } from './tasksT';

export interface OrganisationT {
  id?: ObjectId;
  orgName: string;
  orgUsers?: UserT[];
  orgTasks?: TaskT[];
}

export type OrganisationResponseT = Response & {
  orgFound: OrganisationT;
};
