import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    companySize: "",
    aiExperience: "",
    interest: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      toast({
        title: "Vänligen ange din e-postadress",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Tack för att du anmälde dig!",
        description: "Du kommer snart att höra från oss om AI-implementering för ditt företag."
      });
      setFormData({
        email: "",
        company: "",
        companySize: "",
        aiExperience: "",
        interest: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };
  return (
    <section id="newsletter" className="bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="oka-chip">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white mr-2">05</span>
              <span>Väntelista</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-left text-gray-900">
            Gå med i väntelistan
          </h2>
          <p className="text-xl text-gray-700 mb-10 text-left">
            Var först att höra om våra AI-workshops, automationer och implementeringstjänster för svenska SME:er
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-postadress *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="din@epost.se"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-700">
                  Företagsnamn
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Ditt företag AB"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="companySize" className="text-sm font-medium text-gray-700">
                  Företagsstorlek
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                >
                  <option value="">Välj storlek</option>
                  <option value="1-10">1-10 anställda</option>
                  <option value="11-50">11-50 anställda</option>
                  <option value="51-200">51-200 anställda</option>
                  <option value="200+">200+ anställda</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="aiExperience" className="text-sm font-medium text-gray-700">
                  AI-erfarenhet
                </label>
                <select
                  id="aiExperience"
                  name="aiExperience"
                  value={formData.aiExperience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                >
                  <option value="">Välj nivå</option>
                  <option value="beginner">Nybörjare</option>
                  <option value="some">Viss erfarenhet</option>
                  <option value="experienced">Erfaren</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="interest" className="text-sm font-medium text-gray-700">
                Intresseområde
              </label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              >
                <option value="">Vad är du mest intresserad av?</option>
                <option value="workshops">AI-workshops och utbildning</option>
                <option value="automations">Skräddarsydda automationer</option>
                <option value="agents">AI-agenter för kundservice</option>
                <option value="all">Allt ovanstående</option>
              </select>
            </div>
            
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto button-primary text-lg px-8 py-4"
              >
                {isSubmitting ? "Skickar..." : "Gå med i väntelistan"}
              </Button>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              Genom att anmäla dig godkänner du att vi kontaktar dig om våra AI-tjänster. Du kan avregistrera dig när som helst.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Newsletter;