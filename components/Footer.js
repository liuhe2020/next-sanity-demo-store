import FooterLinks from './FooterLinks';

const links = [
  {
    name: 'Products',
    subLinks: [
      { name: 'Laptops', href: '/laptops' },
      { name: 'Phones', href: '/phones' },
      { name: 'Tablets', href: '/tablets' },
      { name: 'Audio', href: '/audios' },
      { name: 'Accessories', href: '/accessories' },
    ],
  },
  {
    name: 'Shop',
    subLinks: [
      { name: 'Offers', href: '/' },
      { name: 'Track your order', href: '/' },
      { name: 'FAQs', href: '/' },
      { name: 'Delivery', href: '/' },
      { name: 'Return', href: '/' },
    ],
  },
  {
    name: 'Support',
    subLinks: [
      { name: 'Warranty', href: '/' },
      { name: 'How to guides', href: '/' },
      { name: 'Contact us', href: '/' },
      { name: 'Feedback', href: '/' },
    ],
  },
  {
    name: 'Account',
    subLinks: [
      { name: 'My account', href: '/' },
      { name: 'Orders', href: '/' },
      { name: 'Members', href: '/' },
      { name: 'Community', href: '/' },
    ],
  },
  {
    name: 'About us',
    subLinks: [
      { name: 'Company info', href: '/' },
      { name: 'Accessibility', href: '/' },
      { name: 'Environment', href: '/' },
      { name: 'Careers', href: '/' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='px-4'>
      <div className='border-t-[1px] pt-4'>
        {links.map((link) => (
          <FooterLinks link={link} />
        ))}
      </div>

      <div className='max-w-screen-lg mt-20 mx-4 py-4 border-t-[1px] text-gray-500 text-xs sm:text-sm space-y-6 lg:mx-auto'>
        <p className=''>
          Disclaimer: This webiste is a demo. All displayed products are fake.
          No real transactions are taking place. This is a personal project for
          educational purposes only.
        </p>
        <p className='pt-4 pb-8 border-t-[1px]'>
          &copy; {year} Next Sanity Demo Store
        </p>
      </div>
    </footer>
  );
}
