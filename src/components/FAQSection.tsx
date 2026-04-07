import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Are the products authentic?", a: "Yes, all our sports equipment comes with 100% authentic guarantee from authorized dealers." },
  { q: "Do you offer returns?", a: "Absolutely! We offer a 30-day hassle-free return policy. Items must be in their original condition with tags intact." },
  { q: "Is Cash on Delivery available?", a: "Yes, COD is available for orders up to ₹50,000. For higher-value orders, we recommend using our secure online payment options." },
  { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express delivery is available in 2-3 business days for select locations." },
  { q: "Do you offer customization?", a: "Yes! We offer custom printing and personalization on select sports gear. Contact our support team for custom orders." },
];

const FAQSection = () => (
  <section className="section-padding bg-background">
    <div className="container-luxury max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Frequently Asked Questions</h2>
        <p className="text-muted-foreground font-sans">Everything you need to know</p>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border/50 rounded-xl px-6 overflow-hidden">
            <AccordionTrigger className="text-left font-sans font-medium text-foreground hover:no-underline py-5">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground font-sans pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;

