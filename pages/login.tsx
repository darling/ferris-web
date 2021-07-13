import { useRouter } from 'next/router';
import axios from 'axios';
import app from '../utils/auth/firebase';
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/auth';
import Layout from '../components/Layout';
import Link from 'next/link';

const Login = () => {
	const router = useRouter();
	const user = useAuth();

	useEffect(() => {
		if (router.query.code === undefined || user) return;
		axios
			.post('/api/login', {
				code: router.query.code,
			})
			.then((res) => {
				app.auth()
					.signInWithCustomToken(res.data)
					.then((user) => {
						console.log('new User', user);
					});
			})
			.catch((e) => {
				console.error(e);
				alert(`Wasn't able to process that: ${e}`);
				router.push('/');
			});
	}, [router.query.code, user]);

	if (user) {
		router.push('/control');
		return <Layout>Finished Logging in... redirecting now</Layout>;
	}

	return (
		<Layout>
			<div className="bg-green-500">
				<div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
						<span className="block animate-pulse">Logging in</span>
					</h2>
					<p className="mt-4 text-lg leading-6 text-green-200">
						Please wait! If you're here too long, that might be a
						problem! Contact{' '}
						<span className="text-green-50">@Safe</span> and see
						what's up!
					</p>
					<Link href="/api/login">
						<a
							hidden={!!!router.query.code}
							className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 sm:w-auto"
						>
							Not getting redirected? Click here
						</a>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
