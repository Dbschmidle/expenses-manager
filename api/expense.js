import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, PutCommand, DynamoDBDocumentClient, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

import crypto from "crypto";

const client = new DynamoDBClient( {region: "us-east-2"});
const docClient = DynamoDBDocumentClient.from(client);

export const fetchExpenses = async () => {
    const command = new ScanCommand({
        ExpressionAttributeNames: { "#name" : "name" },
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
            paid,
        },
    });

    const response = await docClient.send(command);
    
    return response;
};

export const updateExpenses = async ({id, name, paid}) => {
    const command = new UpdateCommand({
        TableName: "Expenses",
        Key: {
            id,
        },
        ExpressionAttributeNames: {
            "#name": "name",
        },
        UpdateExpression: "set #name = :n, paid = :p",
        ExpressionAttributeValues: {
            ":n": name,
            ":p": paid,
        },
        ReturnValues: "ALL_NEW",
    });

    const response = await docClient.send(command);
    
    return response;
};

export const deleteExpenses = async (id) => {
    const command = new DeleteCommand({
        TableName: "Expenses",
        Key: {
            id,
        },
    });

    const response = await docClient.send(command);
    
    return response;
};