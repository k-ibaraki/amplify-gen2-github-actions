import * as cdk from 'aws-cdk-lib';
import * as apprunner from '@aws-cdk/aws-apprunner-alpha';
import * as assets from 'aws-cdk-lib/aws-ecr-assets';

import { defineBackend } from '@aws-amplify/backend';

const backend = defineBackend({});

// Create Stack for App Runner
const apiStack = backend.createStack('AppRunnerApiStack');

// DockerイメージをビルドしてECRにプッシュ
const asset = new assets.DockerImageAsset(apiStack, 'AppRunnerApiImage', {
  directory: './amplify/api',
  file: 'Dockerfile',
  platform: assets.Platform.LINUX_AMD64
});

// App Runner Serviceの作成
const appRunnerService = new apprunner.Service(apiStack, 'AppRunnerApiService', {
  source: apprunner.Source.fromAsset({
    imageConfiguration: { port: 3000 },
    asset: asset,
  }),
});

// App Runner ServiceのURLを出力
backend.addOutput({
  custom: {
    appRunnerAPI: {
      url: 'https://' + appRunnerService.serviceUrl,
    },
  },
});
