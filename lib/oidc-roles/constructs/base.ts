import * as iam from "aws-cdk-lib/aws-iam";
import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs";

export interface BaseOidcRoleProps extends cdk.StackProps {
  oidcProvider: iam.OpenIdConnectProvider;
  roleName?: string | undefined
}

export class OidcRoleBase extends Construct {
  public role: iam.Role;
  private readonly id: string
  private readonly props: BaseOidcRoleProps;

  constructor(scope: Construct, id: string, props: BaseOidcRoleProps) {
    super(scope, id);
    this.id = id
    this.props = props;
  }

  new(repo: string) {
    //
    // Possible verification of default branch here?
    //

    this.role = new iam.Role(this, this.id, {
      roleName: this.props.roleName,
      assumedBy: new iam.OpenIdConnectPrincipal(this.props.oidcProvider, {
        StringLike: {
          "token.actions.githubusercontent.com:sub": `repo:qred/${repo}:*`,
        },
      }),
    });

    this.addCustomPermissions({
        actions: ["s3:ListBucket", "s3:GetBucketLocation"],
        resources: [
          `arn:aws:s3:::qred-${this.props.env?.account}-${this.props.env?.region}-artifacts`,
          `arn:aws:s3:::qred-${this.props.env?.account}-eu-central-1-artifacts`,
        ],
        effect: iam.Effect.ALLOW,
      })
  }

  addAPIGWPermissions() {
    this.role.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "apigateway:DELETE",
          "apigateway:GET",
          "apigateway:PATCH",
          "apigateway:POST",
          "apigateway:PUT",
          "apigateway:Tag*",
          "apigateway:UpdateRestApiPolicy",
        ],
        resources: ["*"],
        effect: iam.Effect.ALLOW,
      })
    );
  }

  addCustomPermissions(statement: iam.PolicyStatementProps) {
    this.role.addToPolicy(new iam.PolicyStatement(statement));
  }
}
