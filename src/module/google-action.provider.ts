import { Injectable } from '@nestjs/common';
import { GoogleActionsResponse } from '..';
import { GoogleActionsFulfillmentResponse } from '../interfaces/google-actions-fulfillment-response.interface';
import { HandlerContainer } from '../core';

@Injectable()
export class GoogleActionsProvider {
	constructor(private readonly handlerContainer: HandlerContainer) {}

	public async handleIntentOrAction(
		response: GoogleActionsResponse,
	): Promise<GoogleActionsFulfillmentResponse> {
		const intent = response.handler.name;
		
		return this.handlerContainer.findAndCallHandlers(response, intent);
	}
}
