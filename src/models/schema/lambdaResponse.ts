import { APIGatewayProxyResult } from "aws-lambda";
import { AWSError } from 'aws-sdk';
import { errorNameToHttpStatusCode } from '@shared/index';

export default class Response<T> {
    private _statusCode: number;
    private _data?: T[] = new Array(); // This is an array, in order to use scan and get whit the same response class
    private _error?: AWSError;

    constructor(data?: T, error?: AWSError) {
        this._statusCode = 200;

        if (error == null) {
            this._data.push(data);
        }
        this._error = error;
    }

    addData(data: T): void {
        if (this._error == null) throw new Error('Cannot add data if an error occurred');
        this._data.push(data);
    }

    /*
     * This function is intended to convert a Object of Response<T> to an APIGatewayProxyResult
     * in order to return the correct type in a Lamda function header
    */
    async toAPIGatewayProxyResult(): Promise<APIGatewayProxyResult> {
        if (this._error != null) {
            this._data = undefined;

            // resolve the http status code
            this._statusCode = this._error?.statusCode;
            if (this._statusCode == null) {
                this._statusCode = await errorNameToHttpStatusCode(this._error);
            }
        }

        let response: APIGatewayProxyResult = {
            statusCode: this._statusCode,
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        };


        if (this._data?.length == 1) {
            response.body = JSON.stringify({
                data: this._data[0],
                error: this._error?.message,
                count: 1
            });
        }
        else {
            response.body = JSON.stringify({
                data: this._data,
                error: this._error?.message,
                count: this._data?.length
            });
        }
        return Promise.resolve(response);
    }
}