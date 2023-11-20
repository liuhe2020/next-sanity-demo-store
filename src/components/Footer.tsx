import FooterLinks from './footer-links';

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
    <footer className='max-w-screen-lg mx-auto pt-20 text-stone-900 px-4 md:px-6 xl:px-0'>
      {/* mobile footer links */}
      <div className='border-t-[1px] py-6 md:hidden'>
        {links.map((link) => (
          <FooterLinks key={link.name} link={link} />
        ))}
      </div>

      {/* desktop footer links */}
      <div className='hidden w-full py-6 border-y-[1px] md:flex flex-nowrap'>
        {links.map((link) => (
          <div key={link.name} className='basis-1/5 space-y-3'>
            <h3 className='font-medium'>{link.name}</h3>
            <ul className='space-y-2 text-sm'>
              {link.subLinks.map((l) => (
                <li key={l.name} className=''>
                  <a href={l.href} className=''>
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='text-stone-500 text-sm'>
        <p className='py-6 border-y-[1px] md:border-t-0'>
          Disclaimer: This webiste is a demo. All displayed products are fake. No real transactions are taking place. This is a personal project for educational
          purposes only.
        </p>
        <p className='pt-6 pb-10'>&copy; {year} Next Sanity Demo Store</p>
      </div>
    </footer>
  );
}
