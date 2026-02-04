import Link from 'next/link'

const options = [
    { label: 'Home', id: '/' },
    { label: 'Serviços', id: '/servicos' },
    { label: 'Contato', id: '/contato' },
    { label: 'Sobre', id: '/sobre' },
];

export function Header() {
    return (
        <header className="w-full flex justify-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex justify-between items-center w-full max-w-5xl px-4 py-4">
                
                {/* Logo - Ajustado para escala correta */}
                <Link href="/" className="transition-transform hover:scale-105 active:scale-95">
                    <img 
                        src="logo2-doifs.svg" 
                        alt="Logo Doifs" 
                        className="w-[160px] h-auto object-contain" 
                    />
                </Link>

                <nav>
                    <ul className="flex items-center gap-8">
                        {options.map((option, index) => (
                            <li key={index}>
                                <Link
                                    href={option.id}
                                    className="relative text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-600 py-1
                                    before:content-[''] 
                                    before:absolute 
                                    before:bottom-0 
                                    before:left-0 
                                    before:h-[2px] 
                                    before:w-0 
                                    before:bg-emerald-500 
                                    before:transition-all 
                                    before:duration-300 
                                    hover:before:w-full"
                                >
                                    {option.label}
                                </Link>
                            </li>
                        ))}

                        {/* Botão Dashboard Padronizado */}
                        <li>
                            <Link
                                href="/dashboard"
                                className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-7 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-900/10 transition-all active:scale-95 inline-block"
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}