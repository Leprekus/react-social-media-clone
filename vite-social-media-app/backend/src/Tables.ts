import { NewAccount, Session } from '../../typings';
import { JSONDB } from './DB';

export const UserTable = new JSONDB<NewAccount>('users')
export const SessionTable = new JSONDB<Session>('tokens')