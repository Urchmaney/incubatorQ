export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  <main>
    <div>
      Navbar
    </div>
    <div>
      {children}
    </div>
  </main>
}