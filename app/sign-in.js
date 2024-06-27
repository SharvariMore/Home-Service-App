import { Descope } from '@descope/nextjs-sdk';
// you can choose flow to run from the following without `flowId` instead
// import { SignInFlow, SignUpFlow, SignUpOrInFlow } from '@descope/nextjs-sdk'

const Page = () => {
	return (
		<Descope
			flowId="sign-up-or-in"
			onSuccess={(e) => console.log('Logged in!')}
			onError={(e) => console.log('Could not logged in!')}
			redirectAfterSuccess="/"
			// redirectAfterError="/error-page"
		/>
	);
};