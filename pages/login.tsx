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
			<div className="container mx-auto">
				<p className="animate-pulse">Logging in (please wait!!)</p>
				{router.query.code ? null : (
					<Link href="/api/login">
						<a>Not getting redirected? Click here</a>
					</Link>
				)}
			</div>
		</Layout>
	);
};

export default Login;
