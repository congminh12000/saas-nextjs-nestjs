import clsx from "clsx";
import { Container } from "../../components/Container";
import { useT } from "../../i18n";
import { tableOfContents } from "../../lib/blog/pt";
import type { Author, Post, PostSummary } from "../../lib/blog/types";
import { PostBody } from "./PostBody";
import {
    AuthorCard,
    Breadcrumb,
    CaseStudyFactsCard,
    MobileToc,
    PostFooter,
    PostTitle,
    ShareLinks,
    TableOfContents,
} from "./PostParts";
import { BlogPicture } from "./shared";

export interface PostViewProps {
    post: Post;
    author: Author;
    url: string;
    previous: PostSummary | null;
    next: PostSummary | null;
    related: PostSummary[];
}

const readingColumn = "mx-auto w-full max-w-[68ch]";

function EndMatter({ author, url, post }: PostViewProps) {
    return (
        <>
            <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-security-border pt-8">
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="font-mono text-xs text-security-muted">#{tag}</span>
                    ))}
                </div>
                <ShareLinks url={url} title={post.title} />
            </div>
            <div className="mt-8">
                <AuthorCard author={author} />
            </div>
        </>
    );
}

/** Previous/next and related posts, always at full container width. */
function MoreReading({ previous, next, related }: PostViewProps) {
    return (
        <div className="border-t border-security-border/60">
            <PostFooter previous={previous} next={next} related={related} />
        </div>
    );
}

/** 1. Standard: title, wide cover, body with a sticky table of contents. */
function StandardLayout(props: PostViewProps) {
    const { post } = props;
    const toc = tableOfContents(post.body);
    return (
        <Container className="pt-12 pb-24 md:pt-16">
            <Breadcrumb post={post} />
            <PostTitle post={post} className="mt-8 max-w-4xl" />
            <div className="relative mt-12 aspect-video overflow-hidden rounded-2xl border border-security-border">
                <BlogPicture image={post.cover} sizes="(min-width: 1280px) 1216px, 100vw" isPriority />
            </div>
            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
                <article className="lg:col-span-8">
                    <MobileToc items={toc} />
                    <PostBody blocks={post.body} breakout="none" />
                    <EndMatter {...props} />
                </article>
                <aside className="hidden lg:col-span-4 lg:block">
                    <div className="sticky top-8 space-y-8 pl-8">
                        <TableOfContents items={toc} />
                        <ShareLinks url={props.url} title={post.title} />
                    </div>
                </aside>
            </div>
            <MoreReading {...props} />
        </Container>
    );
}

/** 2. Feature: full-bleed cover with the title over it, centered column. */
function FeatureLayout(props: PostViewProps) {
    const { post } = props;
    return (
        <>
            <div className="relative flex min-h-[78vh] items-end overflow-hidden border-b border-security-border">
                <BlogPicture image={post.cover} sizes="100vw" isPriority />
                <div className="absolute inset-0 bg-gradient-to-t from-security-black via-security-black/75 to-security-black/10" />
                <Container className="relative w-full pb-14 pt-32">
                    <Breadcrumb post={post} />
                    <PostTitle
                        post={post}
                        className="mt-8 max-w-4xl"
                        titleClassName="text-4xl md:text-6xl lg:text-7xl"
                    />
                </Container>
            </div>
            <Container className="pt-16 pb-24">
                <article className={readingColumn}>
                    <PostBody blocks={post.body} breakout="center" />
                    <EndMatter {...props} />
                </article>
                <MoreReading {...props} />
            </Container>
        </>
    );
}

/** 3. Split: sticky cover + title on the left, scrolling content on the right. */
function SplitLayout(props: PostViewProps) {
    const { post } = props;
    return (
        <>
        <div className="lg:grid lg:grid-cols-2">
            <div className="relative lg:sticky lg:top-0 lg:h-screen">
                <div className="relative h-full min-h-[70vh] overflow-hidden lg:min-h-0">
                    <BlogPicture image={post.cover} sizes="(min-width: 1024px) 50vw, 100vw" isPriority />
                    <div className="absolute inset-0 bg-gradient-to-t from-security-black via-security-black/80 to-security-black/30 lg:bg-gradient-to-r lg:from-security-black/90 lg:via-security-black/70 lg:to-security-black/40" />
                    <div className="relative flex h-full flex-col justify-end p-6 pt-32 md:p-12 xl:p-16">
                        <Breadcrumb post={post} />
                        <PostTitle post={post} className="mt-8" titleClassName="text-4xl md:text-5xl xl:text-6xl" />
                    </div>
                </div>
            </div>
            <div className="px-4 py-16 sm:px-6 md:px-12 xl:px-16">
                <article className="max-w-[68ch]">
                    <PostBody blocks={post.body} />
                    <EndMatter {...props} />
                </article>
            </div>
        </div>
        <Container className="pb-24">
            <MoreReading {...props} />
        </Container>
        </>
    );
}

/** 4. Case study: project facts sidebar, wide images. */
function CaseStudyLayout(props: PostViewProps) {
    const { post } = props;
    return (
        <Container className="pt-12 pb-24 md:pt-16">
            <Breadcrumb post={post} />
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
                <PostTitle post={post} className="lg:col-span-8" />
                {post.caseStudy?.url && (
                    <p className="font-mono text-xs uppercase tracking-wider text-security-muted lg:col-span-4 lg:text-right">
                        {new URL(post.caseStudy.url).hostname.replace(/^www\./, "")}
                    </p>
                )}
            </div>
            <div className="relative mt-12 aspect-[21/9] overflow-hidden rounded-2xl border border-security-border">
                <BlogPicture image={post.cover} sizes="(min-width: 1280px) 1216px, 100vw" isPriority />
            </div>
            <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
                <aside className="lg:col-span-4">
                    <div className="lg:sticky lg:top-8">
                        {post.caseStudy && <CaseStudyFactsCard facts={post.caseStudy} />}
                    </div>
                </aside>
                <article className="lg:col-span-8 lg:pl-8 xl:pl-16">
                    <PostBody blocks={post.body} breakout="left" />
                    <EndMatter {...props} />
                </article>
            </div>
            <MoreReading {...props} />
        </Container>
    );
}

/** 5. Note: no cover, narrow terminal-style column for short posts. */
function NoteLayout(props: PostViewProps) {
    const { post } = props;
    const { t } = useT();
    return (
        <Container className="pt-12 pb-24 md:pt-16">
            <div className="mx-auto max-w-3xl">
                <div className="overflow-hidden rounded-2xl border border-security-border bg-security-dark shadow-terminal">
                    <div className="flex items-center gap-3 border-b border-security-border bg-security-darker px-5 py-3">
                        <span className="flex gap-1.5" aria-hidden="true">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                        </span>
                        <span className="font-mono text-xs text-security-muted">~/notes/{post.slug}.md</span>
                    </div>
                    <div className="p-6 md:p-10">
                        <span className="font-mono text-sm text-accent">{"// "}{t.blog.note}</span>
                        <PostTitle post={post} className="mt-4" titleClassName="text-3xl md:text-4xl" />
                    </div>
                </div>
                <article className={clsx(readingColumn, "mt-12")}>
                    <PostBody blocks={post.body} breakout="center" />
                    <EndMatter {...props} />
                </article>
            </div>
            <MoreReading {...props} />
        </Container>
    );
}

export function PostView(props: PostViewProps) {
    switch (props.post.layout) {
        case "feature":
            return <FeatureLayout {...props} />;
        case "split":
            return <SplitLayout {...props} />;
        case "case-study":
            return <CaseStudyLayout {...props} />;
        case "note":
            return <NoteLayout {...props} />;
        default:
            return <StandardLayout {...props} />;
    }
}
