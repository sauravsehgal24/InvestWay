import * as path from "path";
import * as dotenv from "dotenv";

console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
const configMapperFunction = () => {
    const NODE_ENV = process.env.NODE_ENV;
    if (!NODE_ENV || NODE_ENV === "local" || NODE_ENV === "development" || NODE_ENV=="")
        dotenv.config({ path: path.join(__dirname, "../../../.env") });
    else if (NODE_ENV === "production")
        dotenv.config({ path: path.join(__dirname, "../../../.env.prod") });
    let CONFIG = {};
    Object.keys(process.env).map((key) => {
        CONFIG[key] = process.env[key];
    });
    return CONFIG;
};

const CONFIG = configMapperFunction();

export default CONFIG;
