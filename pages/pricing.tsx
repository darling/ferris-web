import Layout from '../components/Layout';
import { PaymentComparison } from '../components/sections/PaymentComparison';
import { PaymentPricing } from '../components/sections/PaymentPricing';

export const Pricing = () => {
	return (
		<Layout>
			<PaymentPricing />
			<PaymentComparison />
		</Layout>
	);
};

export default Pricing;
