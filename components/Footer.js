export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer>
      <p className='max-w-2xl mx-auto text-center text-gray-500 text-xs pt-10 sm:text-sm md:pt-20 lg:pb-10'>
        &copy; {year} Next Sanity Demo Store
        <br />
        <br />
        Disclaimer: This webiste is a demo. All displayed products are fake. No
        real transactions are taking place. This is a personal project for
        educational purposes only.
      </p>
    </footer>
  );
}
