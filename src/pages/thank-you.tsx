import {getLayout} from '@/components/layouts/Default';
import {type NextPageWithLayout} from '@/components/layouts/types';
import ThankYouTemplate from '@/components/templates/ty';

const ThankYou: NextPageWithLayout = () => <ThankYouTemplate />;

ThankYou.getLayout = getLayout;
export default ThankYou;
