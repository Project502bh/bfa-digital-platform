import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/baborain.fa", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/bahaborain_fa", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/bahaborain_fa", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/bahaborainfootball", label: "YouTube" },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="BFA" className="size-12 object-contain" />
              <span className="text-lg font-bold">{tNav("bfa")}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("description")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">{t("quickLinks")}</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {tNav("about")}
              </Link>
              <Link href="/news" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {tNav("news")}
              </Link>
              <Link href="/matches" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {tNav("matches")}
              </Link>
              <Link href="/documents" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {tNav("documents")}
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">{t("resources")}</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/documents?category=regulations" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {t("regulations")}
              </Link>
              <Link href="/documents?category=forms" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {t("forms")}
              </Link>
              <Link href="/documents?category=reports" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {t("annualReports")}
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {tNav("contact")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">{t("contactUs")}</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t("address")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+973 1768 9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">info@bfa.bh</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>{t("copyright")}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-primary">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-primary">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
