export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className='max-w-screen-lg mx-4 py-4 border-t-[1px] text-gray-500 text-xs sm:text-sm space-y-6 lg:mx-auto'>
      <p className=''>
        Disclaimer: This webiste is a demo. All displayed products are fake. No
        real transactions are taking place. This is a personal project for
        educational purposes only.
      </p>
      <p className='pt-4 pb-8 border-t-[1px]'>
        &copy; {year} Next Sanity Demo Store
      </p>
    </footer>
  );
}
