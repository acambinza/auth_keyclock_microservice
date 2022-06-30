/** all interface and types of project, put here */

export interface userLoginInterface {
    username: string,
    password: string
}

export interface userRefreshToken {
    refreshToken: string
}

export interface userToken {
    token?: string,
    refreshToken?: string
}

export interface createUser {

}

export interface findUserByEmailOrId {
    params?: string
    token: string | any
}


export declare enum RequiredActionAlias {
    VERIFY_EMAIL = "VERIFY_EMAIL",
    UPDATE_PROFILE = "UPDATE_PROFILE",
    CONFIGURE_TOTP = "CONFIGURE_TOTP",
    UPDATE_PASSWORD = "UPDATE_PASSWORD",
    terms_and_conditions = "terms_and_conditions"
}

export interface UserConsentRepresentation {
    clientId?: string;
    createDate?: string;
    grantedClientScopes?: string[];
    lastUpdatedDate?: number;
}

export interface CredentialRepresentation {
    createdDate?: number;
    credentialData?: string;
    id?: string;
    priority?: number;
    secretData?: string;
    temporary?: boolean;
    type?: string;
    userLabel?: string;
    value?: string;
}

export interface FederatedIdentityRepresentation {
    identityProvider?: string;
    userId?: string;
    userName?: string;
}

export interface UserRepresentation {
    id?: string;
    createdTimestamp?: number;
    username?: string;
    enabled?: boolean;
    totp?: boolean;
    emailVerified?: boolean;
    access?: Record<string, boolean>;
    attributes?: Record<string, any>;
    clientConsents?: UserConsentRepresentation[];
    clientRoles?: Record<string, any>;
    credentials?: CredentialRepresentation[];
    email?: string;
    federatedIdentities?: FederatedIdentityRepresentation[];
    federationLink?: string;
    firstName?: string;
    groups?: string[];
    lastName?: string;
    origin?: string;
    realmRoles?: string[];
    self?: string;
    serviceAccountClientId?: string;
    password?:string
}

export const initialUserCredential = {
    temporary: false,
    value: ''
}

export const initialUserCreate = {
    enabled: true,
    emailVerified: true,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    groups: ['colab'],
    credentials: [{
        temporary: false,
        value: '',
    }],
}

