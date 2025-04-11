import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { BaseOidcRoleProps, OidcRoleBase } from "./constructs/base";

export class Role2 extends OidcRoleBase {
  public readonly role: iam.Role;

  constructor(scope: Construct, id: string, props: BaseOidcRoleProps) {
    super(scope, id, props);

    this.addCustomPermissions({
        actions: [
          "ec2:*",
        ],
        resources: ["*"],
        effect: iam.Effect.ALLOW,
    })
  }
}
