import { ConditionExpression } from '@aws/dynamodb-expressions';

// For more documentation, see:
// https://www.npmjs.com/package/@aws/dynamodb-expressions
const objectToConditionExpression = async (data: any): Promise<ConditionExpression> => {
    let s: ConditionExpression;
    const childTasks: Promise<ConditionExpression>[] = [];

    if (data == null)
        return null;

    switch (data.type) {
    case 'Equals':
        s = {
            type: 'Equals',
            object: data.object,
            subject: data.subject
        };
        break;
    case 'NotEquals':
        s = {
            type: 'NotEquals',
            object: data.object,
            subject: data.subject
        };
        break;
    case 'LessThan':
        s = {
            type: 'LessThan',
            object: data.object,
            subject: data.subject
        };
        break;
    case 'LessThanOrEqualTo':
        s = {
            type: 'LessThanOrEqualTo',
            object: data.object,
            subject: data.subject
        };
        break;
    case 'GreaterThan':
        s = {
            type: 'GreaterThan',
            object: data.object,
            subject: data.subject
        };
        break;
    case 'GreaterThanOrEqualTo':
        s = {
            type: 'GreaterThanOrEqualTo',
            object: data.object,
            subject: data.subject
        };
        break;
    case 'Between':
        s = {
            type: 'Between',
            lowerBound: data.lowerBound,
            upperBound: data.upperBound,
            subject: data.subject
        };
        break;
    case 'Membership':
        s = {
            type: 'Membership',
            subject: data.subject,
            values: data.values
        };
        break;
    case 'Not':
        s = {
            type: 'Not',
            condition: await objectToConditionExpression(data.condition)
        };
        break;
    case 'And':
        for (let i = 0; i < data.conditions.length; i++) {
            childTasks.push(objectToConditionExpression(data.conditions[i]));
        }
        s = {
            type: 'And',
            conditions: await Promise.all(childTasks) // Parallel Async!
        };
        break;
    case 'Or':
        for (let i = 0; i < data.conditions.length; i++) {
            childTasks.push(objectToConditionExpression(data.conditions[i]));
        }
        s = {
            type: 'Or',
            conditions: await Promise.all(childTasks) // Parallel Async!
        };
        break;


    default:
        throw new Error('Syntax Error!');
        break;
    }
    return s;
};

export default objectToConditionExpression;