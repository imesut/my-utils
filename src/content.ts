// export type ContentItem = {
//     icon: string;
//     title: string;
//     description: string;
//     url: string;
// }

export let content = {
    other: [
        {
            icon: "🏠",
            iconType: "emoji",
            title: "Home",
            description: "",
            url: "/",
        },
    ],
    apps: [
        {
            icon: "swiper.jpeg",
            iconType: "image",
            title: "Swiper (External)",
            description: "Swipe your images in your gallery; left to delete, right to keep it. Supports ss, albums and videos too.",
            url: "https://mesut.me/apps/swiper/",
        },
        {
            icon: "glasstimer.jpeg",
            iconType: "image",
            title: "Glass Timer (Appstore)",
            description: "A simple sandglass timer, visible, accessible, fun to use.",
            url: "https://apps.apple.com/tr/app/glass-timer/id6477349833/",
        },
    ],
    scripts: [

        {
            icon: "🔡",
            iconType: "emoji",
            title: "QR Code Generator",
            description: "Generate QR codes instantly, while typing.",
            url: "/qr"
        },
        {
            icon: "📚",
            iconType: "emoji",
            title: "Xcstrings to Table",
            description: "A web app to parse Xcode's new string catalog formatted .xcstrings files, as a table.",
            url: "/xcstrings-to-table"
        },
    ],

}

export let flattenedContentList = [...content.other, ...content.apps, ...content.scripts];