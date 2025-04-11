import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyRole } from './oidc-roles/my-role';
import { BaseOidcRoleProps } from './oidc-roles/constructs/base';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BaseOidcRoleProps) {
    super(scope, id, props);

    const myRole = new MyRole(this, "my-custom-role", props);
  }
}
