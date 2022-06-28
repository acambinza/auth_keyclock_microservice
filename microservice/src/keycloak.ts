import KcAdminClient from '@keycloak/keycloak-admin-client';
import { Issuer } from 'openid-client';

const init = async () => {

    const kcAdminClient = new KcAdminClient({
        baseUrl: process.env.KEYCLOAK_BASE_URL,
        realmName: process.env.KEYCLOAK_REALM
    });
    
    const grantType = 'password';
    const clientId = `${process.env.KEYCLOAK_CLIENT_ID}`;
    const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;

    const keycloakIssuer = await Issuer.discover(
        `${process.env.KEYCLOAK_BASE_URL_CLIENT}`
    );

    const kcClient = new keycloakIssuer.Client({
        client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET
    });

    return {
        kcAdminClient, 
        kcClient,
        clientId,
        grantType,
        clientSecret
    }

}

export { init }