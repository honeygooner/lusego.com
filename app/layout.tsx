import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "lusego",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
