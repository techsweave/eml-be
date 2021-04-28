import { APIGatewayProxyResult } from "aws-lambda";
import { AWSError } from 'aws-sdk';
import { errorNameToHttpStatusCode } from '@shared/index';
import HttpStatusCodes from "./httpStatusCodes";

export default class Response<T> {

    private _statusCode: number;
    private _data?: T[] = new Array(); // This is an array, in order to use scan and get whit the same response class
    private _error?: AWSError;
    private _lastEvaluatedKey?: Partial<T>;

    static fromMultipleData<U>(data: U[], statusCode: HttpStatusCodes, lastEvaluatedKey: Partial<U>): Response<U> {
        if (statusCode < 200 || statusCode >= 300) {
            throw new Error('If a response has data, the status code must be between 200 and 299');
        }
        let res = new Response<U>();
        res._data = data;
        res._statusCode = statusCode;
        res._lastEvaluatedKey = lastEvaluatedKey;
        return res;
    }

    static fromData<U>(data: U, statusCode: HttpStatusCodes): Response<U> {
        if (statusCode < 200 || statusCode >= 300) {
            throw new Error('If a response has data, the status code must be between 200 and 299');
        }
        let res = new Response<U>();
        res._data[0] = data;
        res._statusCode = statusCode;
        return res;
    }

    static fromError<U>(error: AWSError): Response<U> {
        let res = new Response<U>();
        res._error = error;
        return res;
    }

    hasData(): boolean {
        return this._data?.length != 0;
    }

    addPage(data: T[], lastEvaluatedKey: Partial<T>): void {
        if (this.hasData()) {
            this._data = this._data.concat(data);
            this._lastEvaluatedKey = lastEvaluatedKey;
        }
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
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: null
        };


        if (this._data?.length == 1) {
            response.body = JSON.stringify({
                data: this._data[0],
                error: this._error?.message,
                count: 1,
                lastEvaluatedKey: this._lastEvaluatedKey
            });
        }
        else {
            response.body = JSON.stringify({
                data: this._data,
                error: this._error?.message,
                count: this._data?.length,
                lastEvaluatedKey: this._lastEvaluatedKey
            });
        }
        return Promise.resolve(response);
    }
}