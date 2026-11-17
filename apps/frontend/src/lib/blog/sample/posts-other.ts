import coverAi from "../../../images/blog/cover-ai-workflow.jpg";
import coverRemote from "../../../images/blog/cover-remote-work.jpg";
import coverDarkUi from "../../../images/blog/cover-dark-ui.jpg";
import coverProposal from "../../../images/blog/cover-proposal.jpg";
import { body, callout, code, h2, h3, ol, p, pullQuote, quote, ul } from "../pt";
import { definePost } from "./define";

export const aiPost = definePost({
    id: "ai-workflow",
    layout: "feature",
    category: "ai",
    tags: ["AI", "Workflow", "Productivity"],
    publishedAt: "2026-11-17",
    cover: coverAi,
    content: {
        vi: {
            slug: "dung-ai-de-lam-viec-nhanh-hon-ma-khong-mat-kiem-soat",
            title: "Dùng AI để làm việc nhanh hơn mà không mất kiểm soát",
            excerpt:
                "AI viết code nhanh, nhưng người chịu trách nhiệm vẫn là mình. Đây là cách mình chia việc giữa người và máy.",
            coverAlt: "Mạng lưới các nút kết nối với một nút trung tâm sáng màu xanh",
            body: body(
                p(
                    "Phần lớn thời gian tiết kiệm được nhờ AI không đến từ việc viết code, mà từ những việc xung quanh: đọc code lạ, viết test, soạn tài liệu và kiểm tra lại chính mình.",
                ),
                pullQuote(
                    "AI giỏi làm nhanh. Việc của mình là quyết định nên làm gì và kiểm tra nó đã làm đúng chưa.",
                ),
                h2("Việc giao cho AI"),
                ...ul(
                    "Đọc và tóm tắt một codebase mới trước khi sửa.",
                    "Viết bản nháp test cho logic đã rõ ràng.",
                    "Đổi tên, tách file, sửa lỗi lint hàng loạt.",
                    "Viết tài liệu từ code đã có, như file hướng dẫn cho agent.",
                ),
                h2("Việc giữ lại cho mình"),
                ...ul(
                    "Quyết định kiến trúc và đánh đổi.",
                    "Đọc lại từng thay đổi trước khi commit.",
                    "Mọi thứ liên quan tới tiền, dữ liệu khách hàng và bảo mật.",
                ),
                h2("Một vòng làm việc"),
                ...ol(
                    "Viết yêu cầu ngắn, rõ, có tiêu chí hoàn thành.",
                    "Để AI đề xuất kế hoạch trước, duyệt kế hoạch rồi mới cho làm.",
                    "Chạy thử, chụp màn hình, đọc diff.",
                    "Ghi lại quy ước vào file hướng dẫn để lần sau không phải nói lại.",
                ),
                callout(
                    "tip",
                    "File hướng dẫn cho agent (AGENTS.md) là khoản đầu tư rẻ nhất: viết một lần, mọi phiên làm việc sau đều làm đúng phong cách của dự án.",
                ),
            ),
        },
        en: {
            slug: "using-ai-to-work-faster-without-losing-control",
            title: "Using AI to work faster without losing control",
            excerpt:
                "AI writes code fast, but I am still the one accountable. Here is how I split the work between me and the machine.",
            coverAlt: "A network of connected nodes around one bright green node",
            body: body(
                p(
                    "Most of the time AI saves me is not in writing code but in everything around it: reading unfamiliar code, drafting tests, writing docs and double-checking my own work.",
                ),
                pullQuote(
                    "AI is good at doing things fast. My job is deciding what to do and checking that it was done right.",
                ),
                h2("What I hand to AI"),
                ...ul(
                    "Reading and summarizing a new codebase before changing it.",
                    "Drafting tests for logic that is already clear.",
                    "Renames, file splits and bulk lint fixes.",
                    "Docs from existing code, like an agent guideline file.",
                ),
                h2("What I keep"),
                ...ul(
                    "Architecture decisions and trade-offs.",
                    "Reading every change before it is committed.",
                    "Anything touching money, customer data or security.",
                ),
                h2("One working loop"),
                ...ol(
                    "Write a short, clear request with a definition of done.",
                    "Have AI propose a plan first; approve it before any change.",
                    "Run it, take screenshots, read the diff.",
                    "Record conventions in a guideline file so you never repeat them.",
                ),
                callout(
                    "tip",
                    "An agent guideline file (AGENTS.md) is the cheapest investment: write it once and every later session follows the project's style.",
                ),
            ),
        },
    },
});

export const remotePost = definePost({
    id: "remote-work",
    layout: "split",
    category: "career",
    tags: ["Remote", "Habits", "Career"],
    publishedAt: "2026-10-20",
    cover: coverRemote,
    content: {
        vi: {
            slug: "lam-viec-remote-5-thoi-quen-giu-nhip",
            title: "Làm việc remote: 5 thói quen giữ nhịp",
            excerpt:
                "Remote không khó vì thiếu kỷ luật, mà vì thiếu tín hiệu. Năm thói quen giúp mình và team luôn biết việc đang ở đâu.",
            coverAlt: "Mặt đồng hồ với kim giờ trắng và kim phút màu vàng",
            body: body(
                p(
                    "Khi làm cùng văn phòng, người khác thấy bạn đang bận gì. Khi làm remote, nếu bạn không nói thì không ai biết. Vì vậy thói quen quan trọng nhất là **làm cho công việc nhìn thấy được**.",
                ),
                h2("1. Viết cập nhật trước khi được hỏi"),
                p(
                    "Cuối ngày, ba dòng: đã xong gì, đang làm gì, đang vướng gì. Ngắn đến mức không có lý do để bỏ qua.",
                ),
                h2("2. Chọn giờ làm chung"),
                p(
                    "Làm việc với team khác múi giờ, thống nhất vài giờ online cùng nhau cho những việc cần trao đổi nhanh.",
                ),
                h2("3. Viết thay vì gọi"),
                p(
                    "Một tin nhắn viết rõ thường tốt hơn một cuộc gọi 30 phút, và để lại dấu vết cho người đến sau.",
                ),
                h2("4. Demo sớm"),
                p(
                    "Gửi link preview hoặc ảnh chụp màn hình từ khi việc mới xong một nửa. Sửa hướng sớm rẻ hơn sửa lúc cuối.",
                ),
                h2("5. Có giờ dừng"),
                quote("Remote dễ làm thành làm cả ngày. Giờ dừng cố định giúp ngày mai vẫn còn sức."),
            ),
        },
        en: {
            slug: "remote-work-5-habits-that-keep-the-rhythm",
            title: "Remote work: 5 habits that keep the rhythm",
            excerpt:
                "Remote is not hard because of discipline, it is hard because of missing signals. Five habits that keep everyone aware of where work stands.",
            coverAlt: "A clock face with a white hour hand and a yellow minute hand",
            body: body(
                p(
                    "In an office, people see what you are busy with. Remote, nobody knows unless you say it. So the most important habit is **making work visible**.",
                ),
                h2("1. Post updates before anyone asks"),
                p(
                    "End of day, three lines: done, in progress, blocked. Short enough that there is no reason to skip it.",
                ),
                h2("2. Agree on overlap hours"),
                p(
                    "With teams in other time zones, agree on a few shared online hours for the things that need quick back-and-forth.",
                ),
                h2("3. Write instead of calling"),
                p(
                    "A clearly written message often beats a 30-minute call, and leaves a trail for whoever comes next.",
                ),
                h2("4. Demo early"),
                p(
                    "Share a preview link or a screenshot when the work is half done. Changing direction early is cheaper than at the end.",
                ),
                h2("5. Keep a stop time"),
                quote("Remote easily turns into all day. A fixed stop time keeps energy for tomorrow."),
            ),
        },
    },
});

export const darkUiPost = definePost({
    id: "dark-ui",
    layout: "feature",
    category: "design",
    tags: ["UI", "Dark mode", "Accessibility"],
    publishedAt: "2026-10-12",
    cover: coverDarkUi,
    content: {
        vi: {
            slug: "thiet-ke-dark-ui-de-doc-va-dat-chuan-tuong-phan",
            title: "Thiết kế dark UI dễ đọc và đạt chuẩn tương phản",
            excerpt:
                "Giao diện tối đẹp trên ảnh chụp nhưng dễ mỏi mắt khi đọc thật. Vài quy tắc mình dùng cho portfolio này.",
            coverAlt: "Dải mẫu màu từ đen đến xám nhạt và một màu tím nhấn",
            body: body(
                p(
                    "Dark UI không phải là đảo màu giao diện sáng. Nó cần một thang màu riêng, nơi các lớp nền khác nhau rất ít nhưng chữ vẫn đủ tương phản.",
                ),
                h2("Đừng dùng đen tuyệt đối"),
                p(
                    "Nền `#0A0A0B` thay vì `#000`. Card nâng lên một bậc `#141415`, viền `#2A2A2C`. Chênh lệch nhỏ nhưng đủ tạo chiều sâu.",
                ),
                pullQuote("Trong dark UI, độ sâu đến từ các lớp xám, không phải từ bóng đổ."),
                h2("Chữ phụ vẫn phải đạt 4.5:1"),
                p(
                    "Màu chữ phụ ban đầu của site là `#6B6B6F` và trượt bài kiểm tra tương phản. Nâng lên `#8A8A8F` là đủ đạt WCAG AA mà vẫn giữ được cảm giác mờ.",
                ),
                code(
                    "js",
                    `colors: {
    "security-black": "#0A0A0B",
    "security-dark": "#141415",
    "security-border": "#2A2A2C",
    "security-muted": "#8A8A8F", // was #6B6B6F
    "security-light": "#E8E8ED",
}`,
                    "tailwind.config.js",
                ),
                h2("Một màu nhấn duy nhất"),
                p(
                    "Xanh `#00FF88` chỉ dùng cho nút chính, chấm đầu dòng và trạng thái hover. Càng ít chỗ dùng, màu nhấn càng có tác dụng.",
                ),
                h3("Kiểm tra bằng công cụ"),
                callout(
                    "info",
                    "Lighthouse báo lỗi tương phản ngay trong mục Accessibility. Chạy nó sau mỗi lần đổi màu.",
                ),
            ),
        },
        en: {
            slug: "designing-a-readable-dark-ui-that-passes-contrast",
            title: "Designing a readable dark UI that passes contrast",
            excerpt:
                "Dark interfaces look great in screenshots and tire the eyes in real reading. The rules I use for this portfolio.",
            coverAlt: "Color swatches from black to light gray with a purple accent",
            body: body(
                p(
                    "A dark UI is not an inverted light UI. It needs its own scale, where background layers differ very little but text keeps enough contrast.",
                ),
                h2("Avoid pure black"),
                p(
                    "Background `#0A0A0B` instead of `#000`. Cards one step up at `#141415`, borders `#2A2A2C`. Small steps, enough depth.",
                ),
                pullQuote("In a dark UI, depth comes from layers of gray, not from shadows."),
                h2("Secondary text still needs 4.5:1"),
                p(
                    "The site's original muted text was `#6B6B6F` and failed the contrast audit. Raising it to `#8A8A8F` passes WCAG AA and still reads as muted.",
                ),
                code(
                    "js",
                    `colors: {
    "security-black": "#0A0A0B",
    "security-dark": "#141415",
    "security-border": "#2A2A2C",
    "security-muted": "#8A8A8F", // was #6B6B6F
    "security-light": "#E8E8ED",
}`,
                    "tailwind.config.js",
                ),
                h2("One accent color"),
                p(
                    "Green `#00FF88` is reserved for primary buttons, bullets and hover states. The fewer places it appears, the more it means.",
                ),
                h3("Check with tools"),
                callout(
                    "info",
                    "Lighthouse flags contrast problems under Accessibility. Run it after every color change.",
                ),
            ),
        },
    },
});

export const proposalPost = definePost({
    id: "proposal",
    layout: "split",
    category: "career",
    tags: ["Freelance", "Proposal", "Clients"],
    publishedAt: "2026-09-24",
    cover: coverProposal,
    content: {
        vi: {
            slug: "viet-proposal-website-de-khach-hang-de-chon",
            title: "Viết proposal website để khách hàng dễ chọn",
            excerpt:
                "Một proposal tốt không liệt kê mọi thứ bạn làm được, mà giúp khách hàng ra quyết định nhanh. Cấu trúc mình hay dùng.",
            coverAlt: "Tài liệu với các dòng chữ và một nút màu xanh",
            body: body(
                p(
                    "Khách hàng đọc proposal để trả lời ba câu: bạn có hiểu họ không, họ nhận được gì, và tốn bao nhiêu. Mọi phần khác chỉ hỗ trợ ba câu này.",
                ),
                h2("Mở đầu bằng việc hiểu dự án"),
                p(
                    "Nhắc lại mục tiêu của khách bằng lời của mình. Nếu họ đọc và gật đầu, phần còn lại dễ hơn nhiều.",
                ),
                h2("Ba gói, một gói đề xuất"),
                p(
                    "Ba mức giá giúp khách so sánh thay vì chỉ trả lời có hoặc không. Đánh dấu rõ gói bạn khuyên chọn và giải thích vì sao.",
                ),
                pullQuote("Đừng bắt khách hàng tự tính. Hãy cho họ một lựa chọn rõ ràng để đồng ý."),
                h2("Nói rõ những gì không bao gồm"),
                ...ul(
                    "Viết nội dung, dịch thuật.",
                    "Số vòng chỉnh sửa vượt mức.",
                    "Chi phí tên miền, hosting và dịch vụ bên thứ ba.",
                ),
                h2("Kết thúc bằng một bước tiếp theo"),
                p(
                    "Một câu duy nhất: khách cần làm gì để bắt đầu. Proposal nhiều lựa chọn cuối trang thường dẫn tới im lặng.",
                ),
            ),
        },
        en: {
            slug: "writing-website-proposals-clients-can-say-yes-to",
            title: "Writing website proposals clients can say yes to",
            excerpt:
                "A good proposal does not list everything you can do; it helps the client decide fast. The structure I keep coming back to.",
            coverAlt: "A document with text lines and a green button",
            body: body(
                p(
                    "Clients read a proposal to answer three questions: do you understand us, what do we get, and what does it cost. Everything else supports those three.",
                ),
                h2("Open with the project, not yourself"),
                p(
                    "Restate the client's goals in your own words. If they read it and nod, the rest gets much easier.",
                ),
                h2("Three packages, one recommended"),
                p(
                    "Three price points let clients compare instead of answering yes or no. Mark the one you recommend and say why.",
                ),
                pullQuote("Do not make the client do the math. Give them one clear option to agree to."),
                h2("Say what is not included"),
                ...ul(
                    "Copywriting and translation.",
                    "Revision rounds beyond the package.",
                    "Domain, hosting and third-party service costs.",
                ),
                h2("End with one next step"),
                p(
                    "One sentence: what the client does to get started. Proposals that end with many options often end in silence.",
                ),
            ),
        },
    },
});
