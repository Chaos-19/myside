import { Suspense } from 'react';
import ApplicationsContent from './ApplicationsContent';

export const dynamic = 'force-dynamic';

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicationsContent />
    </Suspense>
  );
}
