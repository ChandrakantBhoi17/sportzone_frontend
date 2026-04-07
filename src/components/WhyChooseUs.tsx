import { ShieldCheck, RotateCcw, Truck, Lock } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "100% Authentic", desc: "Every product comes with a certificate of authenticity from authorized dealers." },
  { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free 30-day return policy with full refund on all products." },
  { icon: Truck, title: "Free Shipping", desc: "Complimentary insured shipping on all orders across India." },
  { icon: Lock, title: "Secure Payments", desc: "256-bit SSL encryption for all transactions. Your data is safe with us." },
];

const WhyChooseUs = () => (
  <section className="section-padding bg-secondary/30">
    <div className="container-luxury">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Why Choose SportZone</h2>
        <p className="text-muted-foreground font-sans">Your trust is our top priority</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="bg-card rounded-xl p-6 text-center hover-lift border border-border/50">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground font-sans">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;

