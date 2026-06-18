import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "@/hooks/useInView";
import { getStaggeredAnimationStyle } from "@/lib/animations";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { t } = useTranslation();

  const faqData = [
    {
      question: t('faqData.q1.question'),
      answer: t('faqData.q1.answer')
    },
    {
      question: t('faqData.q2.question'),
      answer: t('faqData.q2.answer')
    },
    {
      question: t('faqData.q3.question'),
      answer: t('faqData.q3.answer')
    },
    {
      question: t('faqData.q4.question'),
      answer: t('faqData.q4.answer')
    },
    {
      question: t('faqData.q5.question'),
      answer: t('faqData.q5.answer')
    },
    {
      question: t('faqData.q6.question'),
      answer: t('faqData.q6.answer')
    },
    {
      question: t('faqData.q7.question'),
      answer: t('faqData.q7.answer')
    },
    {
      question: t('faqData.q8.question'),
      answer: t('faqData.q8.answer')
    },
    {
      question: t('faqData.q9.question'),
      answer: t('faqData.q9.answer')
    },
    {
      question: t('faqData.q10.question'),
      answer: t('faqData.q10.answer')
    }
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-background" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t('faq.title')} <span className="text-primary">{t('faq.titleHighlight')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('faqData.title')}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className={`bg-card border border-border rounded-lg px-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={isInView ? getStaggeredAnimationStyle(index, 100) : {}}
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:text-primary transition-colors duration-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
