export default function IdeaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div>
        Idea Navbar
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}