import { Hero } from "../marketing-pages/index-home/Hero";
import Layout from "../components/Layout";
import type { components } from "../shared/types/api-specs";

type UserDto = components["schemas"]["UserDto"];

// The homepage has no per-user content, so render it once at build time and
// serve it from the CDN instead of server-rendering on every request.
export function getStaticProps() {
    return { props: { user: null } };
}

export default function Home({ user }: { user: UserDto }) {
    return (
        <Layout
            seoDescription="Phan Công Minh - Full-stack Developer với hơn 5 năm kinh nghiệm phát triển ứng dụng web bằng Next.js, NestJS, TypeScript. Xem kỹ năng và các dự án thực tế đã làm."
            seoTitle="Phan Công Minh (Full-stack Developer)"
            headerTitle="Minh Phan"
            themeColor="violet"
        >
            <Hero user={user} />
        </Layout>
    );
}
