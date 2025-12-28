'use client';

import { useTranslations } from 'next-intl';
import { FileText, ExternalLink } from 'lucide-react';
import { organizationDocuments } from '@/data/documentsData';

export default function DocumentsSection() {
  const t = useTranslations('aboutPage.documents');

  // Hide section if no documents available
  if (organizationDocuments.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-dark">{t('title')}</h2>
          <p className="text-gray-500 mt-2">{t('subtitle')}</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="grid gap-4">
            {organizationDocuments.map((doc) => (
              <a
                key={doc.id}
                href={doc.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-brand-teal hover:shadow-md transition-all group"
              >
                <div className="shrink-0">
                  <FileText size={24} className="text-brand-teal" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-teal transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="uppercase font-medium">{doc.type}</span>
                    {doc.description && (
                      <>
                        <span>•</span>
                        <span>{doc.description}</span>
                      </>
                    )}
                  </p>
                </div>
                <ExternalLink size={18} className="text-gray-400 group-hover:text-brand-teal transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
