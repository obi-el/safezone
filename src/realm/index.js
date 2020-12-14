import UserLocationSchema from './UserLocationSchema';
import Realm from 'realm';

export default new Realm({schema: [UserLocationSchema]});
