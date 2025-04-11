import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { BaseOidcRoleProps, OidcRoleBase } from "./constructs/base";

export class MyRole extends OidcRoleBase {
  public readonly role: iam.Role;

  constructor(scope: Construct, id: string, props: BaseOidcRoleProps) {
    super(scope, id, props);

    this.role.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "ecs:CreateTaskSet",
          "ecs:DeleteTaskSet",
          "ecs:DescribeServices",
          "ecs:UpdateService*",
          "elasticloadbalancing:DescribeListeners",
          "elasticloadbalancing:DescribeRules",
          "elasticloadbalancing:DescribeTargetGroups",
          "elasticloadbalancing:ModifyListener",
          "elasticloadbalancing:ModifyRule",
        ],
        resources: ["*"],
        effect: iam.Effect.ALLOW,
      })
    );
  }
}
