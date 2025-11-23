import {getLayout} from '@/components/layouts/Default';
import {type NextPageWithLayout} from '@/components/layouts/types';
import IndexTemplate from '@/components/templates';

const HomePage: NextPageWithLayout = () => <IndexTemplate />;

HomePage.getLayout = getLayout;
export default HomePage;
