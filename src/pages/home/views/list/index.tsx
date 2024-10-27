import { lazy, Suspense } from 'react'

const LazyArticleHero = lazy(() => import('@/pages/home/components/hero/Hero'))

const ArticlesListView = () => {
    return (
        <>
            <Suspense fallback={<div>Loading Hero...</div>}>
                <LazyArticleHero />
            </Suspense>
        </>
    )
}

export default ArticlesListView
