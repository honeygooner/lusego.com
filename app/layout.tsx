import type { Metadata } from "next";

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
