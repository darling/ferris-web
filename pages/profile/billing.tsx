import Layout from '../../components/Layout';
import { PaymentMethods } from '../../components/stripe/PaymentMethods';

const Billing = () => {
	return (
		<Layout>
			<div className="md:w-1/3 mx-auto">
				<h1 className="text-4xl font-bold tracking-wide my-3">
					Edit Payment Details
				</h1>
				<PaymentMethods />
			</div>
		</Layout>
	);
};

export default Billing;
