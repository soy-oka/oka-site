
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const ImageShowcaseSection = () => {
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    companySize: "",
    aiExperience: "",
    interest: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendWaitlistRequest = async (payload: typeof formData) => {
    // TODO: Integrate with backend/service that emails form submissions to hej@okamail.se
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) {
      toast({
        title: "Vänligen ange din e-postadress",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendWaitlistRequest(formData);
      toast({
        title: "Tack för att du anmälde dig!",
        description: "Vi hör av oss med nästa steg för AI-implementering."
      });
      setFormData({
        email: "",
        company: "",
        companySize: "",
        aiExperience: "",
        interest: ""
      });
    } catch (error) {
      toast({
        title: "Något gick fel",
        description: "Försök igen eller mejla oss direkt på hej@okamail.se.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-16 bg-white" id="waitlist">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
            Upplev framtidens teknik
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Anmäl dig till Ökas väntelista för att få inbjudningar till workshops, demos och exklusiva insikter om hur AI kan skapa tillväxt i din verksamhet.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto animate-on-scroll">
          <div
            className="absolute inset-0 rounded-3xl blur-2xl opacity-80"
            style={{
              background: "linear-gradient(135deg, rgba(28,7,75,0.8) 0%, rgba(55,34,139,0.75) 50%, rgba(227,45,145,0.7) 100%)"
            }}
          ></div>
          <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-elegant">
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Vad är du mest intresserad av?</option>
                  <option value="workshops">AI-workshops och utbildning</option>
                  <option value="automations">Skräddarsydda automationer</option>
                  <option value="agents">AI-agenter för kundservice</option>
                  <option value="all">Allt ovanstående</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary px-8 py-4 text-base sm:text-lg"
                >
                  {isSubmitting ? "Skickar..." : "Gå med i väntelistan"}
                </Button>
                <p className="text-sm text-gray-600 text-left sm:text-right">
                  Genom att anmäla dig godkänner du kontakt från Öka om AI-tjänster. Du kan avregistrera dig när som helst.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageShowcaseSection;
