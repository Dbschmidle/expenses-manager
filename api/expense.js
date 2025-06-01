import { ListTablesCommand, DynamoDBClient, DeleteTableCommand } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, PutCommand, DynamoDBDocumentClient, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

import crypto from "crypto";

const client = new DynamoDBClient( {region: "us-east-1"});
const docClient = DynamoDBDocumentClient.from(client);

export const fetchExpenses = async () => {
    const command = new ScanCommand({
        ExpressionAttributeNames: { "#name" : "name"},
        ProjectionExpression: "id, #name, paid",
        TableName: "Expenses",
    });

    const response = await docClient.send(command);

    return response;
};

export const createExpenses = async ({name, paid}) => {
    const uuid = crypto.randomUUID();
    const command = new PutCommand({
        TableName: "Expenses",
        Item: {
            id: uuid,
            name,
            paid
        }
    })

    const response = await docClient.send(command);
    
    return response;
};

export const updateExpenses = async ({id, name, completed}) => {
    const command = new UpdateCommand({
        TableName: "Expenses",
        Key: {
            id
        },
        ExpressionAttributeNames: {
            "#name": "name"
        },
        UpdateExpression: "set #name = :n, completed = :c",
        ExpressionAttributeValues: {
            ":n": name,
            ":c": completed
        },
        ReturnValues: "ALL_NEW"
    })

    const response = await docClient.send(command);
    
    return response;
};

export const deleteExpenses = async (id) => {
    const command = new DeleteCommand({
        TableName: "Expense",
        Key: {
            id
        }
    });

    const response = await docClient.send(command);
    
    return response;
};