import * as iam from "aws-cdk-lib/aws-iam";
import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs";

export interface BaseOidcRoleProps extends cdk.StackProps {
  repo: string;
  oidcProvider: iam.OpenIdConnectProvider;
}

export class OidcRoleBase extends Construct {
  public readonly role: iam.Role;

  constructor(scope: Construct, id: string, props: BaseOidcRoleProps) {
    super(scope, id);

    this.role = new iam.Role(this, id, {
      roleName: 'test-role',
      assumedBy: new iam.OpenIdConnectPrincipal(props.oidcProvider, {
        StringLike: {
          "token.actions.githubusercontent.com:sub": `repo:qred/${props.repo}:*`,
        },
      }),
    });

    this.role.addToPolicy(new iam.PolicyStatement({
        actions: [
          's3:ListBucket',
          's3:GetBucketLocation'
        ],
        resources: [
          `arn:aws:s3:::qred-${props.env?.account}-${props.env?.region}-artifacts`,
          `arn:aws:s3:::qred-${props.env?.account}-eu-central-1-artifacts`
        ],
        effect: iam.Effect.ALLOW
      }));
  }
}
