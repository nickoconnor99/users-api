import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class DynamoDBStack extends cdk.Stack {
  public readonly usersTable: cdk.aws_dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.usersTable = new cdk.aws_dynamodb.Table(this, 'UsersTable', {
      tableName: `${this.stackName}-users-table`,
      partitionKey: { name: 'id', type: cdk.aws_dynamodb.AttributeType.STRING },
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
}
}