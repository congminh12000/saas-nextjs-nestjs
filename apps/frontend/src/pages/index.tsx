import { Hero } from "../marketing-pages/index-home/Hero";
import Layout from "../components/Layout";
import { useT } from "../i18n";
import type { components } from "../shared/types/api-specs";

type UserDto = components["schemas"]["UserDto"];

// The homepage has no per-user content, so render it once at build time and
// serve it from the CDN instead of server-rendering on every request.
export function getStaticProps() {
    return { props: { user: null } };
}

export default function Home({ user }: { user: UserDto }) {
    const { t } = useT();
    return (
        <Layout
            seoDescription={t.meta.homeDescription}
            seoTitle={t.meta.homeTitle}
            headerTitle="Minh Phan"
            themeColor="violet"
        >
            <Hero user={user} />
        </Layout>
    );
}
