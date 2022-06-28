import { init } from '../keycloak';

export default class UserService {

    static async createUser(){

    }

    static async userInfo(token:string){
        try{
            const { kcClient } = await init();
            const userInfo =await kcClient.userinfo(token);

           if(userInfo)
                return {status:true, data: userInfo}
            return {status: false, data: []}
            
        }catch(e){
            return {status: false,data:[], message: JSON.stringify(e)}
        }
    }

}

