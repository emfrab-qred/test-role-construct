#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { TestStack } from '../lib/test-stack';
import { OidcGithub } from '../lib/oidc-github';

const app = new cdk.App();

const env = {
  account: "619095443283",
  region: "eu-west-1",
};

const oidcProviderGithub = new OidcGithub(app, "test-provider-github", {
  stackName: "test-provider-github",
  description: "Github OIDC provider",
  env: env,
});

new TestStack(app, "test-role", {
  repo: "my-repo",
  oidcProvider: oidcProviderGithub.oidcProvider,
  env
});

cdk.Tags.of(app).add("Team", "ee-platform");
