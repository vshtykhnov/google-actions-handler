import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class GoogleActionsAuthorizationMiddleware implements NestMiddleware {
	use(req, res, next) {
		// TODO auth
		return next();
	}
}
