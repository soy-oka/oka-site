import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

type WaitlistFormData = {
  name: string;
  email: string;
  company: string;
  notes: string;
  companySize: string;
  aiKnowledge: string;
};

type SpreadsheetPayload = {
  timestamp: string;
  name: string;
  email: string;
  company: string;
  notes: string;
  companySize: string;
  aiKnowledge: string;
};

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || emailTemplateId;
const spreadsheetWebhookUrl = import.meta.env.VITE_WAITLIST_SPREADSHEET_WEBHOOK;
const emailLogoUrl = import.meta.env.VITE_WAITLIST_LOGO_URL;

const ADMIN_EMAIL = "hej@okamail.se";

const isValidEmail = (value: string) => {
  const pattern = /^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(\.[\w-]+)+$/;
  return pattern.test(value.trim());
};

const buildHtmlMessage = (logoUrl: string, headline: string, body: string) => `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7f7fb; padding: 32px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1); overflow: hidden;">
      <tr>
        <td style="padding: 32px 24px; text-align: center;"> 
          <img src="${logoUrl}" alt="Öka" style="max-width: 120px; margin-bottom: 12px;" />
          <h1 style="font-size: 24px; margin: 12px 0; color: #111827;">${headline}</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #374151; margin: 0 0 24px;">${body}</p>
        </td>
      </tr>
      <tr>
        <td style="background: linear-gradient(135deg, #786eff, #f2a6ff); height: 6px;"></td>
      </tr>
    </table>
  </div>
`;

const persistToSpreadsheet = async (payload: SpreadsheetPayload) => {
  if (!spreadsheetWebhookUrl) return;

  try {
    const response = await fetch(spreadsheetWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`WAITLIST_SPREADSHEET_FAILED:${response.status}`);
    }
  } catch (error) {
    console.warn("Kunde inte spara till spreadsheet:", error);
  }
};

const sendWaitlistRequest = async (formData: WaitlistFormData) => {
  if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
    throw new Error("WAITLIST_EMAIL_NOT_CONFIGURED");
  }

  const timestamp = new Date().toISOString();
  const logoUrl = emailLogoUrl || `${window.location.origin}/oka-logo.png`;

  const userHtml = buildHtmlMessage(
    logoUrl,
    "Du är med på väntelistan!",
    "Vi ser fram emot att höra av oss med nästa steg för hur Öka kan stötta er AI-resa."
  );

  const adminHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff; padding: 24px;">
      <h2 style="font-size: 20px; margin-bottom: 16px; color: #111827;">Ny väntelisteanmälan</h2>
      <table cellpadding="0" cellspacing="0" style="width: 100%; font-size: 15px; line-height: 1.6; color: #1f2937;">
        <tr><td style="font-weight: 600; padding: 4px 0;">Namn:</td><td>${formData.name || "Ej angivet"}</td></tr>
        <tr><td style="font-weight: 600; padding: 4px 0;">E-post:</td><td>${formData.email}</td></tr>
        <tr><td style="font-weight: 600; padding: 4px 0;">Företag:</td><td>${formData.company || "Ej angivet"}</td></tr>
        <tr><td style="font-weight: 600; padding: 4px 0;">Företagsstorlek:</td><td>${formData.companySize || "Ej angivet"}</td></tr>
        <tr><td style="font-weight: 600; padding: 4px 0;">AI-kunskap:</td><td>${formData.aiKnowledge || "Ej angivet"}</td></tr>
        <tr><td style="font-weight: 600; padding: 4px 0;">Meddelande:</td><td>${formData.notes || "Ej angivet"}</td></tr>
        <tr><td style="font-weight: 600; padding: 4px 0;">Tidstämpel:</td><td>${timestamp}</td></tr>
      </table>
    </div>
  `;

  const userEmailParams = {
    to_email: formData.email,
    to_name: formData.name || "Vän",
    reply_to: ADMIN_EMAIL,
    subject: "Du är med på Ökas väntelista",
    html_message: userHtml,
    company: formData.company || "Ej angivet",
    companySize: formData.companySize || "Ej angivet",
    aiKnowledge: formData.aiKnowledge || "Ej angivet",
    notes: formData.notes || "Ej angivet",
    timestamp,
    logo_url: logoUrl
  };

  const adminEmailParams = {
    to_email: ADMIN_EMAIL,
    to_name: "Öka",
    subject: `Ny väntelisteanmälan: ${formData.name || formData.email}`,
    html_message: adminHtml,
    company: formData.company || "Ej angivet",
    companySize: formData.companySize || "Ej angivet",
    aiKnowledge: formData.aiKnowledge || "Ej angivet",
    notes: formData.notes || "Ej angivet",
    email: formData.email,
    name: formData.name || "Ej angivet",
    timestamp,
    logo_url: logoUrl
  };

  const payload: SpreadsheetPayload = {
    timestamp,
    name: formData.name || "",
    email: formData.email,
    company: formData.company || "",
    notes: formData.notes || "",
    companySize: formData.companySize || "",
    aiKnowledge: formData.aiKnowledge || ""
  };

  const [userEmailResult, adminEmailResult] = await Promise.all([
    emailjs.send(emailServiceId, emailTemplateId, userEmailParams, {
      publicKey: emailPublicKey
    }),
    emailjs.send(emailServiceId, adminTemplateId, adminEmailParams, {
      publicKey: emailPublicKey
    })
  ]);

  await persistToSpreadsheet(payload);

  return {
    userEmailResult,
    adminEmailResult,
    timestamp
  };
};

const ImageShowcaseSection = () => {
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: "",
    email: "",
    company: "",
    notes: "",
    companySize: "",
    aiKnowledge: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      Boolean(formData.name.trim()) &&
      isValidEmail(formData.email) &&
      Boolean(formData.companySize) &&
      Boolean(formData.aiKnowledge)
    );
  }, [formData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      toast({
        title: "Komplettera uppgifterna",
        description: "Ange namn och en korrekt e-postadress så att vi kan återkomma.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendWaitlistRequest(formData);
      toast({
        title: "Du är med!",
        description: "Vi har skickat en bekräftelse till din e-post och återkommer snart."
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        notes: "",
        companySize: "",
        aiKnowledge: ""
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      const isConfigError = message.includes("WAITLIST_EMAIL_NOT_CONFIGURED");

      toast({
        title: isConfigError ? "E-posttjänsten saknas" : "Kunde inte skicka anmälan",
        description: isConfigError
          ? "Kontrollera EmailJS-inställningarna i .env.local."
          : "Försök igen eller mejla oss direkt på hej@okamail.se.",
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
            Väntelista
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Anmäl dig till Ökas väntelista så hör vi av oss med workshops, demos och personliga rekommendationer för hur AI kan skapa tillväxt i din verksamhet.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto animate-on-scroll">
          <div
            className="absolute inset-0 rounded-3xl blur-2xl opacity-80"
            style={{
              background: "linear-gradient(135deg, rgba(28,7,75,0.8) 0%, rgba(55,34,139,0.75) 50%, rgba(227,45,145,0.7) 100%)"
            }}
          ></div>
          <div className="relative rounded-3xl bg-white/85 backdrop-blur-xl border border-white/40 shadow-elegant">
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Ditt namn *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Anna Andersson"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    E-postadress *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="namn@dittforetag.se"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="companySize" className="text-sm font-medium text-gray-700">
                    Företagsstorlek *
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Välj storlek</option>
                    <option value="1-10">1-10 anställda</option>
                    <option value="11-50">11-50 anställda</option>
                    <option value="51-200">51-200 anställda</option>
                    <option value="200+">200+ anställda</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="aiKnowledge" className="text-sm font-medium text-gray-700">
                    AI-kunskap i teamet *
                  </label>
                  <select
                    id="aiKnowledge"
                    name="aiKnowledge"
                    value={formData.aiKnowledge}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Välj nivå</option>
                    <option value="Ny">Vi är nya inom AI</option>
                    <option value="På gång">Vi experimenterar lite</option>
                    <option value="Erfarna">Vi använder AI aktivt idag</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-gray-700">
                    Företag
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Öka AB"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium text-gray-700">
                    Vad vill du uppnå med AI?
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Berätta kort om din situation eller vilka processer du vill automatisera."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className="button-primary px-8 py-4 text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Skickar..." : "Gå med i väntelistan"}
                </Button>
                <p className="text-sm text-gray-600 text-left sm:text-right">
                  Vi kontaktar dig via e-post. Du kan när som helst svara och be oss ta bort dina uppgifter.
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
export { sendWaitlistRequest };
