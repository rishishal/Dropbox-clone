import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "./ThemeToggler";

const Header = () => {
  return (
    <header className='flex items-center justify-between'>
      <Link href='/' className='flex items-center space-x-2'>
        <div className='w-fit'>
          <Image src='./dropbox.svg' alt='LOGO' width={50} height={50} />
        </div>

        <h1 className='font-bold text-xl'>Dropbox</h1>
      </Link>
      <div className='px-5 flex space-x-2 items-center'>
        {/* Theme toggler */}
        <ThemeToggler />

        <UserButton afterSignOutUrl='/' />
        <SignedOut>
          <SignInButton afterSignInUrl='/dashboard' mode='modal' />
        </SignedOut>
      </div>
    </header>
  );
};
export default Header;
