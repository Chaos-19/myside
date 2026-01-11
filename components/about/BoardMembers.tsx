'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { boardMembers } from '@/data/boardMembers';
import { getInitials, formatDisplayName, shouldDisplayDegree } from '@/lib/boardMemberUtils';
import type { BoardMember } from '@/types';

/**
 * Placeholder avatar component for missing photos
 */
function PlaceholderAvatar({ name }: { name: string }) {
  const initials = getInitials(name);
  return (
    <div className="w-full h-full bg-brand-teal flex items-center justify-center">
      <span className="text-white text-3xl font-bold">{initials}</span>
    </div>
  );
}

/**
 * Board member card component with image fallback
 */
function BoardMemberCard({ member }: { member: BoardMember }) {
  const [imageError, setImageError] = useState(false);
  const displayDegree = shouldDisplayDegree(member.degree);

  return (
    <div className="group">
     <div className="w-60 h-60 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-50 shadow-lg group-hover:border-brand-teal transition-colors relative">
        {imageError ? (
          <PlaceholderAvatar name={member.name} />
        ) : (
          <Image 
            src={member.photo} 
            alt={member.name} 
            fill
            className="scale-120"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900">
        {formatDisplayName(member.name, member.title)}
      </h3>
      <p className="text-brand-teal font-medium">{member.role}</p>
      {displayDegree && (
        <p className="text-gray-600 text-sm">{displayDegree}</p>
      )}
      {member.email && (
        <div className="flex items-center justify-center space-x-2 mt-2 text-gray-500 hover:text-brand-teal transition-colors">
          <Mail size={14} />
          <a href={`mailto:${member.email}`} className="text-sm truncate max-w-[200px]">
            {member.email}
          </a>
        </div>
      )}
      {member.bio && (
        <p className="text-gray-500 text-sm mt-2">{member.bio}</p>
      )}
    </div>
  );
}

export default function BoardMembers() {
  const t = useTranslations('aboutPage.team');
  const tCommon = useTranslations('common');

  // Sort board members by order
  const sortedMembers = [...boardMembers].sort((a, b) => a.order - b.order);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-brand-dark mb-16">{t('title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedMembers.map((member) => (
            <BoardMemberCard key={member.id} member={member} />
          ))}
        </div>
        
        <div className="mt-16 bg-brand-light rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-brand-dark mb-2">
            {t('joinTeam.title')}
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            {t('joinTeam.description')}
          </p>
          <button className="bg-brand-teal text-white px-6 py-2.5 rounded-full font-medium hover:bg-teal-700 transition-colors">
            {tCommon('viewOpenPositions')}
          </button>
        </div>
      </div>
    </section>
  );
}
