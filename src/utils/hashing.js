import {createHmac} from "crypto";

const hmacProcess = (value,key)=>{
    const result = createHmac('sha256',key).update(value).digest('hex')
    return result;

}

export {hmacProcess};