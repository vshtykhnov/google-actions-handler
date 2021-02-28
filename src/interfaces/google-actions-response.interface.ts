export interface GoogleActionsResponse {
	device: {
		capabilities: string[]
	},
	handler: {
		name: string
	},
	home: {
		params: Object
	},
	intent: { 
		name: string, 
		params: Object,
		query: string
	},
	scene: {
		name: string,
		slotFillingStatus: string,
		slots: Object,
	},
	session: {
		id: string,
		params: Object,
		typeOverrides: [],
		languageCode: string
	},
	user: {
		locale: string, 
		params: Object, 
		accountLinkingStatus: string,
		verificationStatus: string,
		packageEntitlements: [] 
	},
}
