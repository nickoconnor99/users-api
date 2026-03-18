#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { UsersApiStack } from '../lib/usersApi-stack';
import { DynamoDBStack } from '../lib/dynamodb-stack';
const app = new cdk.App();

const dynamodbStack = new DynamoDBStack(app, 'DynamoDBStack');
const usersApiStack = new UsersApiStack(app, 'UsersApiStack', {dynamodbStack});
usersApiStack.addDependency(dynamodbStack);