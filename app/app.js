'use client';
import { useDescope, useSession, useUser } from '@descope/nextjs-sdk/client';
import { useCallback } from 'react';

const App = () => {
	// NOTE - `useDescope`, `useSession`, `useUser` should be used inside `AuthProvider` context,
	// and will throw an exception if this requirement is not met
	const { isAuthenticated, isSessionLoading, sessionToken } = useSession();
	// useUser retrieves the logged in user information
	const { user } = useUser();
	// useDescope retrieves Descope SDK for further operations related to authentication
	// such as logout
	const sdk = useDescope();

	if (isSessionLoading || isUserLoading) {
		return <p>Loading...</p>;
	}

	const handleLogout = useCallback(() => {
		sdk.logout();
	}, [sdk]);

	if (isAuthenticated) {
		return (
			<>
				<p>Hello {user.name}</p>
				<button onClick={handleLogout}>Logout</button>
			</>
		);
	}

	return <p>You are not logged in</p>;
};