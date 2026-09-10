import { Skeleton } from '@/components/ui/skeleton';
export default function Loading(){return <main id="main-content" className="wrap page-space" role="status" aria-label="Loading page"><Skeleton className="h-8 w-48 mb-8"/><Skeleton className="h-16 w-2/3 mb-12"/><div className="loading-cards">{[1,2,3].map(i=><Skeleton key={i} className="h-72 w-full"/>)}</div></main>}
