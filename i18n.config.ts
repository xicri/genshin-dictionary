import en from './lang/en'
import ja from './lang/ja'
import zhCN from './lang/zh-CN'

export default defineI18nConfig(() => ({
    legacy: false,
    fallbackLocale: 'en',
    messages: {
        en,
        ja,
        'zh-CN': zhCN
    }
}))