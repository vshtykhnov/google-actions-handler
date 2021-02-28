export interface GoogleActionsFulfillmentResponse {
	session: {
		id: string,
		params: Object
	},
	prompt: {
		override: boolean,
		content?: {
			card: {
				title: string,
				subtitle: string,
			    text: string,
			    image: {
				alt: string,
				height: number,
				url: string,
				width: number
			  }
			}
		  },
		firstSimple: {
			speech: string,
			text: string
		  }
		},
		scene?: {
			name: string,
			slots: Object
			next: {
				name: string
			}
		},
		user: {
			locale: string,
			params: {
			  verificationStatus: string,
			  key: string
			}
		  },
		  home: {
			params: {
			  key: string
			}
		  }
	}
