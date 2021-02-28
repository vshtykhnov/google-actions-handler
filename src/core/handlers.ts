import { Injectable } from '@nestjs/common';
import { GoogleActionsResponse } from '..';
import { GoogleActionsFulfillmentResponse } from '../interfaces/google-actions-fulfillment-response.interface';

@Injectable()
export class HandlerContainer {
	private container: Map<string, { provider: any; methodName: string }> = new Map();

	constructor() {}

	public register(intent: string, provider: any, methodName: string): void {
		if (this.container.has(intent)) {
			throw new Error(`Cannot have duplicate handlers for intent [${intent}]`);
		}

		this.container.set(intent, { provider, methodName });
	}

	public async findAndCallHandlers(googleActionsResponse: GoogleActionsResponse, intent: string): Promise<GoogleActionsFulfillmentResponse> {
		if (!this.container.has(intent)) {
			throw new Error(
				`Unknown handler for ${intent ? '[intent: ' + intent + ']' : ''}`
			);
		}
		const { provider, methodName } = this.container.get(intent);
		return await provider[methodName](googleActionsResponse);
	}
}
