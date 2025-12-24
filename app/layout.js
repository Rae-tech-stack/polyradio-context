export const metadata = {
  title: "PolyRadio Context",
  description: "AI explanations for Polymarket market moves",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui" }}>
        {children}
      </body>
    </html>
  );
}
