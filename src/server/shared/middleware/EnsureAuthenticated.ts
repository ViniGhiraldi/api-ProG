import { verify } from "../services/JWTService";


export const ensureAuthenticated = async (authorization = ''): Promise<void | Error> => {
    if(!authorization) return new Error('não autenticado');

    const [type, token] = authorization.split(' ');

    if(type !== 'Bearer'){
        return new Error('não autenticado');
    }

    const jwtData = verify(token);

    if(typeof jwtData === 'string'){
        if(jwtData === 'INVALID_TOKEN') {
            return new Error('não autenticado');
        }

        return new Error(jwtData)
    }
    
    return;
}