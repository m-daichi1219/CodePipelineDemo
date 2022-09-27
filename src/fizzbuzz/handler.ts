import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { FizzBuzzController } from "./controller";
import { FizzBuzzService } from "./service";
import { FizzBuzzRequestBody } from "./types";

const fizzBuzzService = new FizzBuzzService();
const fizzBuzzController = new FizzBuzzController(fizzBuzzService);

export const handler = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
    const { body } = event;
    if (body == null) throw new Error(`bad request body. request: ${body}`);
    const json: FizzBuzzRequestBody = JSON.parse(body);
    const response = await fizzBuzzController.Singular(json.number);

    callback(null, {
        statusCode: 200,
        body: response
    });
}