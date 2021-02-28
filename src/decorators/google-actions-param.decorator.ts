import 'reflect-metadata';
import { GOOGLE_ACTION_PARAMS } from '../constant';

export const GoogleActionsParam = (property?: string) => {
	return (target, key, index) => {
		const metadataValue = Reflect.getMetadata(GOOGLE_ACTION_PARAMS, target) || [];
		metadataValue.push({ key, property, index });
		Reflect.defineMetadata(GOOGLE_ACTION_PARAMS, metadataValue, target);
		return target;
	};
};
