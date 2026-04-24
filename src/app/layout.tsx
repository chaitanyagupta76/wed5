import "./globals.css";

export const metadata = {
  title: "Wedding Website",
  description: "A premium Indian wedding invitation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
