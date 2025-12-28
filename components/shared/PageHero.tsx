import Image from 'next/image';
import Link from 'next/link';

interface PageHeroProps {
  title: string;
  subtitle: string;
  bgImage: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export default function PageHero({ 
  title, 
  subtitle, 
  bgImage, 
  primaryAction, 
  secondaryAction 
}: PageHeroProps) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gray-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>
        
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryAction && (
              <Link 
                href={primaryAction.href}
                className="bg-brand-teal hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg"
              >
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link 
                href={secondaryAction.href}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-brand-teal text-white px-8 py-3 rounded-full font-semibold transition-all"
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
