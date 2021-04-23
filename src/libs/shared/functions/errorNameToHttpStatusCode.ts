import HttpStatusCodes from "@lamdaModel/httpStatusCodes";
import { AWSError } from "aws-sdk";

/*
 * This function is intended to convert a error type name to the corresponding Http Status Code
*/
const errorNameToHttpStatusCode = async (error: AWSError): Promise<number> => {
    let code: number;
    switch (error.name) {
        case "ItemNotFoundException":
            code = HttpStatusCodes.NOT_FOUND;
            break;

        default:
            code = HttpStatusCodes.INTERNAL_SERVER_ERROR;
            break;
    }
    return Promise.resolve(code);
}

export default errorNameToHttpStatusCode;