import { useStorageSync } from '@uni-helper/uni-use';

/** Token */
export const accessToken = useStorageSync<string>('access_token', '');
