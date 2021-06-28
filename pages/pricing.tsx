import Layout from '../components/Layout';
import PaymentPricing from '../components/sections/PaymentPricing';

export const Pricing = () => {
	return (
		<Layout
			headerClassName="bg-green-500 text-gray-800"
			linkClassName="text-gray-100"
		>
			<PaymentPricing />
		</Layout>
	);
};

export default Pricing;
