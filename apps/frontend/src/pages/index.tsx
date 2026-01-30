import { Hero } from "../marketing-pages/index-home/Hero";
import Layout from "../components/Layout";
import { getMarketingServerSideProps } from "../marketing-pages/getUserAndProps";
import type { components } from "../shared/types/api-specs";

type UserDto = components["schemas"]["UserDto"];

export const getServerSideProps = getMarketingServerSideProps;

export default function Home({ user }: { user: UserDto }) {
    return (
        <Layout
            seoDescription="Minh Phan dev tools save you time so you can focus on building your product and helping your customers."
            seoTitle={`Phan Công Minh (Full-stack Developer)`}
            //canonicalUrl="https://usemiller.dev/"
            headerTitle="Minh Phan"
            themeColor="violet"
        >
            <Hero user={user} />
        </Layout>
    );
}
