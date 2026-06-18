import iconFlash3d from '@/assets/icon-flash-3d.png';
import iconThumbsUp3d from '@/assets/icon-thumbs-up-3d.png';
import { useTranslation } from 'react-i18next';

export const TrustBadges = () => {
  const { t } = useTranslation();

  const badges = [
    {
      icon: iconFlash3d,
      title: t('trustBadges.response.title'),
      description: t('trustBadges.response.description')
    },
    {
      icon: iconThumbsUp3d,
      title: t('trustBadges.guarantee.title'),
      description: t('trustBadges.guarantee.description')
    }
  ];

  return (
    <div className="flex flex-col gap-2 py-6 max-w-xs mx-auto" role="list" aria-label="Vertrouwensindicatoren">
      {badges.map((badge, index) => {
        return (
          <div 
            key={index} 
            className="group flex items-center gap-2 py-2 px-3 rounded-2xl bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:scale-[1.02]"
            role="listitem"
          >
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img 
                src={badge.icon} 
                alt="" 
                aria-hidden="true" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold mb-0.5 text-foreground group-hover:text-primary transition-colors">{badge.title}</h3>
              <p className="text-xs text-muted-foreground leading-tight">{badge.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
