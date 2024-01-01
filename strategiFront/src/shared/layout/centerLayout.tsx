import 'tailwindcss/tailwind.css'

export default function CenterLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex justify-center items-center h-screen">
            {children}
        </div>
    )
}