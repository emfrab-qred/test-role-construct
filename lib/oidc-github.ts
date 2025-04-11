import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class OidcGithub extends cdk.Stack {
  public readonly oidcProvider: iam.OpenIdConnectProvider;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.oidcProvider = new iam.OpenIdConnectProvider(
      this,
      "GithubOidcProvider",
      {
        url: "https://token.actions.myfakegithub.com",
        clientIds: ["sts.amazonaws.com"],
        thumbprints: ["foofoofoofoofoofoofoofoofoofoofoofoofoof"],
      }
    );
  }
}
