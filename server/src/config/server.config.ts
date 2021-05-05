import * as path from "path";
import * as dotenv from "dotenv";

const configMapperFunction = ()=>{
    const NODE_ENV = process.env.NODE_ENV
    if (!NODE_ENV|| NODE_ENV === "local" || NODE_ENV === "development")
        dotenv.config({ path: path.join(__dirname, "../../../.env") });
    else if (NODE_ENV === "production")
        dotenv.config({ path: path.join(__dirname, "../../../.env.prod") });
    let CONFIG={};
    Object.keys(process.env).map(key=>{
        CONFIG[key] = process.env[key]
    })
    return CONFIG
}

const CONFIG = configMapperFunction()

export default CONFIG