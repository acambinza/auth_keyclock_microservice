import { init } from '../keycloak';

import {
    createUser,
    findUserByEmailOrId,
    UserRepresentation
} from '../all-interface';
import { lstat } from 'fs';

export default class UserService {

    static async userCreate(data: UserRepresentation, token: string | any) {

        try {
            const { kcAdminClient } = await init();
            kcAdminClient.setAccessToken(token);    
            const rs = await kcAdminClient.users.create(data);
                    
            if (!rs.id)
                return { status: false, data: [] }
            return { status: true, data: [rs.id] }
            

        } catch (e: any) {
            return {
                status: false,
                statusCode: e.response.status,
                message: JSON.stringify(e)
            }
        }
    }


    static async userList(token: string | any) {

        try {
            const { kcAdminClient } = await init();

            kcAdminClient.setAccessToken(token);

            const users = await kcAdminClient.users.find();

            this.userInfo(token)

            if (users)
                return { status: true, data: users }
            return { status: false, data: [] }

        } catch (e) {
            return { status: false, data: [], message: JSON.stringify(e) }
        }
    }


    static async userListByEmailOrId({ params, token }: findUserByEmailOrId) {

        try {
            const { kcAdminClient } = await init();

            kcAdminClient.setAccessToken(token);
            const users = await kcAdminClient.users.find();

            if (!users)
                return { status: false, data: [] }

            const userFilter = users.filter((item) => item.id === params || item.email === params)

            return { status: true, data: userFilter }

        } catch (e) {
            return { status: false, data: [], message: JSON.stringify(e) }
        }
    }

    static async userUpdate(id: string, data: UserRepresentation, token: string | any) {
        try {
            const { kcAdminClient } = await init();

            kcAdminClient.setAccessToken(token);

            const rs = await kcAdminClient.users.update(
                { id: id },
                { ...data }
            );

            if (rs == undefined)
                return { status: false, data: [] }
            return { status: true, data: [rs] }


        } catch (e: any) {
            return {
                status: false,
                statusCode: e.response.status,
                message: JSON.stringify(e)
            }
        }
    }


    static async userInfo(token: string | any) {
        try {
            const { kcAdminClient, kcClient } = await init();
            kcAdminClient.setAccessToken(token);
            const userInfo = await kcClient.userinfo(token);

            const rolesAppMapping = await kcAdminClient.users.listRoleMappings({ id: userInfo.sub })
            const groups = await kcAdminClient.users.listGroups({ id: userInfo.sub })
            const rolesRealmMapping = await kcAdminClient.users.listAvailableRealmRoleMappings({ id: userInfo.sub })

            userInfo.roles = { rolesAppMapping, rolesRealmMapping }
            userInfo.groups = groups

            if (userInfo)
                return { status: true, data: userInfo }
            return { status: false, data: [] }

        } catch (e) {
            return { status: false, data: [], message: JSON.stringify(e) }
        }
    }



    static async usersInfo(token: any, id: any) {

        try {

            const { kcAdminClient, clientId } = await init();
            kcAdminClient.setAccessToken(token);

            const rolesAppMapping = await kcAdminClient.users.listRoleMappings({ id: id })
            const rolesRealmMapping = await kcAdminClient.users.listAvailableRealmRoleMappings({ id: id })
            const groupsUser = await kcAdminClient.users.listGroups({ id: id })

            const userRoles = {
                rolesAppMapping,
                rolesRealms: rolesRealmMapping,

            }
            const groups = groupsUser

            if (userRoles)
                return { status: true, data: { "roles": userRoles, "groups": groups } }
            return { status: false, data: [] }

        } catch (e) {
            return { status: false, data: [], message: JSON.stringify(e) }
        }
    }

    static async userOneGroups({ id, token }: any) {

        try {
            const { kcAdminClient } = await init();
            kcAdminClient.setAccessToken(token)
            const listGroups = await kcAdminClient.users.listGroups({ id: id });

            if (listGroups)
                return { status: true, data: listGroups }
            return { status: false, data: [] }

        } catch (e) {
            return { status: false, data: [], message: JSON.stringify(e) }
        }

    }

}

