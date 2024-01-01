import 'tailwindcss/tailwind.css';
import { HeaderProps, Header } from 'src/shared/components/header';
import logo from 'src/assets/Marvel_Logo.svg';
import { TransferContainer } from 'src/shared/components/home/transferContainer';

export default function Home() {
  const headerProps: HeaderProps = {
    logo: logo,
    title: "Gestão de grupos de heróis",
    alt: "Marvel Logo"
  }
  return (
    <main className='p-10'>
      <Header {...headerProps} />
      <TransferContainer />
    </main>
  )
}
