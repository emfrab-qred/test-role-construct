import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs';
import { Role1 } from './oidc-roles/role-1';
import { Role2 } from './oidc-roles/role-2';
import { BaseOidcRoleProps } from './oidc-roles/constructs/base';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface OidcGithubRolesProps extends cdk.StackProps {
  oidcProvider: iam.OpenIdConnectProvider;
  codeSignConfigArns: string[];
}

export class TestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: OidcGithubRolesProps) {
    super(scope, id, props);

    new Role1(this, "MyCustomRole1", { oidcProvider: props.oidcProvider, roleName: 'my-role-1' });
    new Role2(this, "MyCustomRole2", { oidcProvider: props.oidcProvider});
  }
}
