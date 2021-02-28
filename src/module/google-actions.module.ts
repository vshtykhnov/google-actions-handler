import 'reflect-metadata';
import { GOOGLE_ACTION, GOOGLE_ACTION_INTENT } from '../constant';
import { GoogleActionsController } from './google-actions.controller';
import { GoogleActionsProvider } from './google-action.provider';
import { DiscoveryModule, DiscoveryService } from '@nestjs-plus/discovery';
import {
	DynamicModule,
	MiddlewareConsumer,
	Module,
	NestModule,
	OnModuleInit,
} from '@nestjs/common';
import { HandlerContainer } from '../core';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';
import { GoogleActionsAuthorizationMiddleware } from '..';

@Module({
	imports: [DiscoveryModule],
	providers: [GoogleActionsProvider, HandlerContainer],
	controllers: [GoogleActionsController],
})
export class GoogleActionsModule implements NestModule, OnModuleInit {
	public static forRoot(webHookConfig?: WebHookConfig): DynamicModule {
		webHookConfig = {
			basePath: 'web-hooks',
			postPath: 'google-actions',
			...webHookConfig,
		};

		return {
			module: GoogleActionsModule,
			providers: [GoogleActionsProvider, HandlerContainer],
			controllers: [GoogleActionsController.forRoot(webHookConfig)],
		};
	}

	constructor(
		private readonly discoveryService: DiscoveryService,
		private readonly handlerContainer: HandlerContainer,
	) {}

	public async onModuleInit(): Promise<void> {
		const providersMethodAndMetaForIntent = await this.discoveryService.providerMethodsWithMetaAtKey<
			string
		>(GOOGLE_ACTION_INTENT);
		const providersMethodAndMetaForAction = await this.discoveryService.providerMethodsWithMetaAtKey<
			string
		>(GOOGLE_ACTION);

		const providersMethodAndMeta = [
			...providersMethodAndMetaForIntent,
			...providersMethodAndMetaForAction,
		];

		for (const providerMethodAndMeta of providersMethodAndMeta) {
			this.handlerContainer.register(
				providerMethodAndMeta.meta,
				providerMethodAndMeta.discoveredMethod.parentClass.instance,
				providerMethodAndMeta.discoveredMethod.methodName,
			);
		}
	}

	public configure(consumer: MiddlewareConsumer) {
		return consumer.apply(GoogleActionsAuthorizationMiddleware).forRoutes(GoogleActionsController);
	}
}
