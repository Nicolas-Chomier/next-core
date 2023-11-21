import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'Your username here !',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Your password here !',
				},
			},
			async authorize(credentials, req: any) {
				console.log('credential ok');
				console.log('credentials =', credentials);
				console.log(
					'process.env.NEXT_PUBLIC_URI',
					process.env.NEXT_PUBLIC_URI,
				);
				const dev = process.env.NODE_ENV !== 'production';

				if (dev) {
					console.log('Nous sommes en mode développement');
				} else {
					console.log('Nous sommes en mode production');
				}
				// Préparation de l'URL

				/* const baseUrl = new URL(
					req.headers['x-forwarded-proto'] +
						'://' +
						req.headers['x-forwarded-host'],
				); */
				const baseUrl = new URL(
					req.headers['x-forwarded-proto'] +
						'://' +
						process.env.NEXT_PUBLIC_URI,
				);
				const url = new URL('/api/login', baseUrl);
				console.log('URL=>', url);

				// Add logic here to look up the user from the credentials supplied  # http://localhost:3000/api/login
				try {
					const res = await fetch('http://localhost:3000/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							username: credentials?.username,
							password: credentials?.password,
						}),
					});
					const user = await res.json();
					if (user) {
						console.log('auth route user oK', user);
						// Any object returned will be saved in `user` property of the JWT
						return user;
					} else {
						console.log('Null');
						// If you return null then an error will be displayed advising the user to check their details.
						return null;

						// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
					}
				} catch (error) {
					console.error('Error during fetch: ', error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},

		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
	},
	pages: {
		signIn: '/',
	},
});

export { handler as GET, handler as POST };
