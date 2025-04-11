import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Role1 } from './oidc-roles/role-1';
import { Role2 } from './oidc-roles/role-2';
import { BaseOidcRoleProps } from './oidc-roles/constructs/base';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BaseOidcRoleProps) {
    super(scope, id, props);

    new Role1(this, "my-custom-role-1", props);
    new Role2(this, "my-custom-role-2", props);
  }
}
