const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

exports.sendSMSMessage = async ({phoneNumber, message}) => {
	if (!phoneNumber && !message) {
		throw new Error("Phone Number & Message Cannot be Null");
	}

	await client.messages
		.create({
			to: '+17785122199',
			from: '+13603287502',
			body: 'Hello World',
		})

	return;
}
