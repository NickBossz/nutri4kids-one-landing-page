import { companyConfig } from "@/config/company";

export function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Avisos"
      className="bg-[var(--brand-secondary)] text-primary-foreground"
    >
      <div className="container-page flex items-center justify-center gap-6 overflow-hidden py-2 text-center text-xs sm:text-sm">
        <p className="truncate">
          {companyConfig.announcementMessages[0]} •{" "}
          <span className="hidden sm:inline">{companyConfig.announcementMessages[1]}</span>
        </p>
      </div>
    </div>
  );
}
