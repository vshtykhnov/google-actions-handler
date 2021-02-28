import { GoogleActionsResponse } from '../interfaces/google-actions-response.interface';
import { Body, Controller, HttpStatus, RequestMethod, Res } from '@nestjs/common';
import {  } from '../interfaces/google-actions-response.interface';
import { GoogleActionsProvider } from './google-action.provider';
import { METHOD_METADATA, PATH_METADATA } from '../constant';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';

@Controller()
export class GoogleActionsController {
	constructor(private readonly googleActionsProvider: GoogleActionsProvider) {}

	public static forRoot(webHookConfig: WebHookConfig) {
		Reflect.defineMetadata(PATH_METADATA, webHookConfig.basePath, GoogleActionsController);
		Reflect.defineMetadata(
			PATH_METADATA,
			webHookConfig.postPath,
			Object.getOwnPropertyDescriptor(GoogleActionsController.prototype, 'googleActionsWebHook').value,
		);
		Reflect.defineMetadata(
			METHOD_METADATA,
			RequestMethod.POST,
			Object.getOwnPropertyDescriptor(GoogleActionsController.prototype, 'googleActionsWebHook').value,
		);
		return GoogleActionsController;
	}

	async googleActionsWebHook(@Body() googleActionsResponse: GoogleActionsResponse, @Res() res) {
		const fulfillment = await this.googleActionsProvider.handleIntentOrAction(googleActionsResponse);
		return res.status(HttpStatus.OK).send(fulfillment);
	}
}
