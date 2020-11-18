import Layout from '../components/Layout';
import { useAuth } from '../contexts/auth';
import app from '../utils/auth/firebase';

function signOut() {
	app.auth().signOut();
}

const Profile = () => {
	const user = useAuth();

	// if (user === null) {
	// 	return <Layout>You are not signed in</Layout>;                   DICK
	// }

	return (
		<Layout
			title={`${user?.displayName || 'User Profile Page'} | Ferris Bot`}
		>
			<div className="mr-3 px-3 py-2 relative flex justify-end h-auto w-auto bg-gray-900">
				<button
					onClick={signOut}
					className="px-2 py-1 rounded shadow-md hover:bg-green-100 hover:text-black bg-red-700 transition-all duration-150"
				>
					Sign Out
				</button>
			</div>
		</Layout>
	);
};

export default Profile;
