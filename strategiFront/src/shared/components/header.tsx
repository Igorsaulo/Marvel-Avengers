import Image from 'next/image';

export interface HeaderProps {
    logo: any;
    title: string;
    alt: string;
}

export function Header({ logo, title,alt }: HeaderProps) {
    return (
        <header className="flex text-gray-50 justify-center items-center flex-col gap-3">
            <div style={{ minWidth: '5rem' }}>
                <Image src={logo} alt={alt} width={100} />
            </div>
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
        </header>
    )
}