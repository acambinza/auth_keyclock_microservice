import { init } from '../keycloak';

import {
    createUser,
    findUserByEmailOrId,
    UserRepresentation
} from '../all-interface';
import { lstat } from 'fs';

export default class GroupService {

    static async findByNameOrId({ params, token }: any) {

        try {
            const { kcAdminClient } = await init();
            kcAdminClient.setAccessToken(token)

            const listGroups = await kcAdminClient.groups.find()

            const listFilter = listGroups.filter((item) => item.id === params || item.name === params)

            if (listFilter)
                return { status: true, data: listFilter }
            return { status: false, data: [] }

        } catch (e) {
            return { status: false, data: [], message: JSON.stringify(e) }
        }

    }

}

