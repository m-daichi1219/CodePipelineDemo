import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { ApiKeySourceType, Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
export class DemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // API Gateway
    const apiGateway = new RestApi(this, 'DemoGateway', {
      apiKeySourceType: ApiKeySourceType.HEADER,
      restApiName: 'DemoRestAPI',
      cloudWatchRole: false,
      description: 'Demo API Gateway',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: ['GET'],
        allowHeaders: ['x-api-key', 'content-type'],
      }
    })

    const apiKey = apiGateway.addApiKey('ApiKey', {
      apiKeyName: 'DemoAPIKey'
    })

    const usagePlan = apiGateway.addUsagePlan('UsagePlan', {
      name: 'DemoUsagePlan'
    })

    usagePlan.addApiKey(apiKey);
    usagePlan.addApiStage({
      stage: apiGateway.deploymentStage
    })

    // Lambda
    const demoLambda = new NodejsFunction(this, 'demo lambda', {
      runtime: Runtime.NODEJS_16_X,
      entry: './src/fizzbuzz/handler.ts',
      handler: 'handler',
      functionName: 'FizzBuzzDemoLambda',
      timeout: Duration.seconds(5),
      description: 'FizzBuzz Demo',
      bundling: {
        sourceMap: false,
        externalModules: [
          'aws-lambda',
          'aws-sdk',
        ]
      }
    })

    const integration = new LambdaIntegration(demoLambda);
    apiGateway.root.addResource('fizzbuzz').addMethod('POST', integration, { apiKeyRequired: true })
  }
}
