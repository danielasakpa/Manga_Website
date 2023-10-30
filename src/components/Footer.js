import React from 'react';

const footerLinks = [
    { label: 'Home', url: '#' },
    { label: 'About', url: '#' },
    { label: 'Services', url: '#' },
    { label: 'Contact', url: '#' },
];

const Footer = () => {
    return (
        <footer className='w-full h-max bg-[#1F1F1F] border-y-2 border-gray-300 p-[30px]'>
            <div className='flex justify-between w-[127px] items-center'>
                <span className="text-[40px] text-[#1B6FA8] leading-[40px] tracking-[0.05em]">Yuki</span>
                <span className="text-[35px] text-white">雪</span>
            </div>
            <div className="text-white text-[18px]">
                <ul className="flex flex-col justify-center py-4 md:space-x-4 md:flex-row">
                    {footerLinks.map((link, index) => (
                        <li key={index}>
                            <a href={link.url} className='tracking-[0.2em] hover:text-[#1B6FA8]'>{link.label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
