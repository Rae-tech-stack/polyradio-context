export const metadata = {
  title: "polyradio-context",
  description: "AI explanations for Polymarket market moves",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", padding: 20 }}>
        {children}
      </body>
    </html>
  );
}
