import { Suspense } from 'react';
import EventsContent from './EventsContent';

export const dynamic = 'force-dynamic';

export default function EventsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventsContent />
    </Suspense>
  );
}
