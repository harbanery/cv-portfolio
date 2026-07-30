"use client";

import { DownloadOutlined } from "@ant-design/icons";
import { App, Button, Space } from "antd";
import { useState } from "react";
import { useLocale } from "@/components/locale/LocaleProvider";
import LanguageToggle from "@/components/locale/LanguageToggle";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { downloadCvPdf } from "@/helpers/pdfDownload";

export default function CvToolbar() {
  const { t, locale } = useLocale();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await downloadCvPdf(locale, "CV-Raihan-Yusuf.pdf");
    } catch {
      message.error(t("cv.downloadError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="no-print sticky top-0 z-50 flex items-center justify-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm px-4 py-3 border-b border-gray-200 dark:border-gray-800">
      <Space size="small">
        <ThemeToggle />
        <LanguageToggle />
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
          loading={loading}
        >
          {t("cv.download")}
        </Button>
      </Space>
    </div>
  );
}
