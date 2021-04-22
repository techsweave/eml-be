import { APIGatewayProxyResult } from "aws-lambda";

export default class Response<T> {
    _statusCode: number;
    _data?: T[] = new Array(); // This is an array, in order to use scan and get whit the same response class
    _error?: string;

    constructor(statusCode: number, data?: T, error?: string) {
        this._statusCode = statusCode;
        this._data.push(data);
        this._error = error;
    }

    /*
     * This function is intended to convert a Object of Response<T> to an APIGatewayProxyResult
     * in order to return the correct type in a Lamda function header
    */
    ToPIGatewayProxyResult(): APIGatewayProxyResult {
        let response: APIGatewayProxyResult;

        if (this._data.length == 1) {
            response = {
                statusCode: this._statusCode,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: this._data[0],
                    error: this._error,
                    count: 1
                })
            };
        }
        else {
            response = {
                statusCode: this._statusCode,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: this._data,
                    error: this._error,
                    count: this._data?.length
                })
            };
        }
        return response;
    }
}