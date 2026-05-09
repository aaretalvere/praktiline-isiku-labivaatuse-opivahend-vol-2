export const metadata = {
  title: "Praktiline isiku läbivaatuse õpivahend",
  description: "Isiku läbivaatuse protokolli õppe- ja harjutuskeskkond",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="et">
      <body>{children}</body>
    </html>
  );
}