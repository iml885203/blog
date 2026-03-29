export const languages = {
  'zh-TW': '中文',
  en: 'EN',
} as const;

export const defaultLang = 'zh-TW' as const;

export type Lang = keyof typeof languages;

export const ui = {
  'zh-TW': {
    // Site
    'site.title': 'Logan 的隨手筆記',
    'site.description': 'Logan 的技術部落格，分享軟體工程、智慧家庭與生活觀察。',
    'site.subtitle': '軟體工程 · 智慧家庭 · 生活觀察',

    // Nav
    'nav.articles': '文章',
    'nav.categories': '分類',
    'nav.tags': '標籤',
    'nav.about': '關於',

    // Aria labels
    'aria.search': '搜尋',
    'aria.toggleDarkMode': '切換深色模式',
    'aria.menu': '選單',
    'aria.breadcrumb': '麵包屑',
    'aria.pagination': '分頁',
    'aria.postNav': '前後篇導航',
    'aria.toc': '文章目錄',
    'aria.aboutAuthor': '關於作者',

    // Search
    'search.title': '搜尋',
    'search.description': '搜尋文章',
    'search.placeholder': '搜尋文章...',
    'search.empty': '輸入關鍵字搜尋文章',
    'search.noResults': '找不到相關文章',
    'search.viewAll': '查看全部 {count} 筆結果 →',

    // Home
    'home.title': 'Logan 的隨手筆記',

    // Archives
    'archives.title': '文章',
    'archives.description': '瀏覽所有 {count} 篇文章的完整歸檔。',
    'archives.stats': '共 {posts} 篇文章 · {years} 年',
    'archives.postCount': '{count} 篇',

    // Categories
    'categories.title': '分類',
    'categories.description': '瀏覽所有 {count} 個分類，共 {posts} 篇文章。',
    'categories.stats': '共 {count} 個分類 · {posts} 篇文章',
    'categories.postCount': '{count} 篇',
    'categories.backToAll': '← 所有分類',
    'categories.totalPosts': '共 {count} 篇文章',
    'categories.latest': '最新：{date}',

    // Tags
    'tags.title': '標籤',
    'tags.description': '瀏覽所有 {count} 個標籤，共 {posts} 篇文章。',
    'tags.stats': '共 {count} 個標籤 · {posts} 篇文章',
    'tags.backToAll': '← 所有標籤',
    'tags.totalPosts': '共 {count} 篇文章',

    // About
    'about.title': '關於',
    'about.description': '嗨，我是 Logan — 資深軟體工程師，熱衷寫程式與智慧家庭。',
    'about.subtitle': '資深軟體工程師・🇹🇼',
    'about.sectionAbout': '關於我',
    'about.bio1': '這是 <strong>Logan</strong> 的個人網站，你可以在這找到我的開發心得、學習筆記、智慧家庭文章等。',
    'about.bio2': '我是一位資深軟體工程師，熱衷於寫程式與玩智慧家庭。',
    'about.sectionStats': '部落格數據',
    'about.statPosts': '篇文章',
    'about.statCategories': '個分類',
    'about.statYears': '年寫作',
    'about.sectionRecent': '最新文章',
    'about.viewAll': '查看全部 →',

    // 404
    '404.title': '找不到頁面',
    '404.description': '這個頁面不存在或已被移除。',
    '404.hint': '試試這篇 →',

    // Post
    'post.readingTime': '{min} 分鐘閱讀',
    'post.backHome': '回首頁',
    'post.backToTop': '回到頂部',
    'post.prevPost': '上一篇',
    'post.nextPost': '下一篇',
    'post.toc': '目錄',
    'post.relatedPosts': '相關文章',

    // Share
    'share.label': '分享：',
    'share.share': '分享',
    'share.copyLink': '複製連結',

    // Author card
    'author.bio': '資深軟體工程師，熱衷寫程式與智慧家庭 🏠',
    'author.license': '本文採用 CC BY-NC 4.0 授權',

    // Pagination
    'pagination.status': '第 {current} / {total} 頁，共 {posts} 篇',
    'pagination.page': '第 {page} 頁',

    // Common
    'common.home': '首頁',
    'common.page': '頁',
  },
  en: {
    // Site
    'site.title': "Logan's Notes",
    'site.description': "Logan's tech blog — software engineering, smart home, and life observations.",
    'site.subtitle': 'Software Engineering · Smart Home · Life',

    // Nav
    'nav.articles': 'Articles',
    'nav.categories': 'Categories',
    'nav.tags': 'Tags',
    'nav.about': 'About',

    // Aria labels
    'aria.search': 'Search',
    'aria.toggleDarkMode': 'Toggle dark mode',
    'aria.menu': 'Menu',
    'aria.breadcrumb': 'Breadcrumb',
    'aria.pagination': 'Pagination',
    'aria.postNav': 'Post navigation',
    'aria.toc': 'Table of contents',
    'aria.aboutAuthor': 'About the author',

    // Search
    'search.title': 'Search',
    'search.description': 'Search articles',
    'search.placeholder': 'Search articles...',
    'search.empty': 'Type to search articles',
    'search.noResults': 'No articles found',
    'search.viewAll': 'View all {count} results →',

    // Home
    'home.title': "Logan's Notes",

    // Archives
    'archives.title': 'Articles',
    'archives.description': 'Browse all {count} articles.',
    'archives.stats': '{posts} articles · {years} years',
    'archives.postCount': '{count} posts',

    // Categories
    'categories.title': 'Categories',
    'categories.description': 'Browse all {count} categories with {posts} articles.',
    'categories.stats': '{count} categories · {posts} articles',
    'categories.postCount': '{count} posts',
    'categories.backToAll': '← All Categories',
    'categories.totalPosts': '{count} articles',
    'categories.latest': 'Latest: {date}',

    // Tags
    'tags.title': 'Tags',
    'tags.description': 'Browse all {count} tags with {posts} articles.',
    'tags.stats': '{count} tags · {posts} articles',
    'tags.backToAll': '← All Tags',
    'tags.totalPosts': '{count} articles',

    // About
    'about.title': 'About',
    'about.description': "Hi, I'm Logan — a senior software engineer passionate about coding and smart home.",
    'about.subtitle': 'Senior Software Engineer・🇹🇼',
    'about.sectionAbout': 'About Me',
    'about.bio1':
      "This is <strong>Logan</strong>'s personal website where you can find development notes, learning journals, and smart home articles.",
    'about.bio2': "I'm a senior software engineer, passionate about coding and smart home automation.",
    'about.sectionStats': 'Blog Stats',
    'about.statPosts': 'articles',
    'about.statCategories': 'categories',
    'about.statYears': 'years writing',
    'about.sectionRecent': 'Latest Articles',
    'about.viewAll': 'View all →',

    // 404
    '404.title': 'Page Not Found',
    '404.description': 'This page does not exist or has been removed.',
    '404.hint': 'Try this one →',

    // Post
    'post.readingTime': '{min} min read',
    'post.backHome': 'Home',
    'post.backToTop': 'Back to top',
    'post.prevPost': 'Previous',
    'post.nextPost': 'Next',
    'post.toc': 'Contents',
    'post.relatedPosts': 'Related Articles',

    // Share
    'share.label': 'Share:',
    'share.share': 'Share',
    'share.copyLink': 'Copy link',

    // Author card
    'author.bio': 'Senior software engineer, passionate about coding and smart home 🏠',
    'author.license': 'Licensed under CC BY-NC 4.0',

    // Pagination
    'pagination.status': 'Page {current} / {total}, {posts} articles',
    'pagination.page': 'Page {page}',

    // Common
    'common.home': 'Home',
    'common.page': 'page',
  },
} as const;
