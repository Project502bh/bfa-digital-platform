import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "اتصل بنا" : "Contact Us",
    description: locale === "ar" 
      ? "تواصل مع اتحاد كرة القدم البحريني"
      : "Get in touch with the Bahrain Football Association",
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const contactInfo = [
    {
      icon: MapPin,
      title: t("info.address.title"),
      content: t("info.address.content"),
    },
    {
      icon: Phone,
      title: t("info.phone.title"),
      content: "+973 1768 9999",
      href: "tel:+97317689999",
    },
    {
      icon: Mail,
      title: t("info.email.title"),
      content: "info@bfa.bh",
      href: "mailto:info@bfa.bh",
    },
    {
      icon: Clock,
      title: t("info.hours.title"),
      content: t("info.hours.content"),
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/bahrainfootball", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/bahrain_fa", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/bahrain_fa", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/bahrainfootball", label: "YouTube" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-16 text-primary-foreground md:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              {t("badge")}
            </Badge>
            <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("info.title")}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <item.icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("social.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label={social.label}
                      >
                        <social.icon className="size-5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <h2 className="mb-6 text-2xl font-bold">{t("map.title")}</h2>
          <Card className="overflow-hidden">
            <div className="aspect-video w-full bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.8893893893894!2d50.5880!3d26.2285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEzJzQyLjYiTiA1MMKwMzUnMTYuOCJF!5e0!3m2!1sen!2sbh!4v1620000000000!5m2!1sen!2sbh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("map.title")}
                className="size-full"
              />
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
