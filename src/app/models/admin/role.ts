import { Operatable } from '../operatable';

export interface Role extends Operatable {
  name: string;
  dbs: any;
  _userCount?: number;
}
