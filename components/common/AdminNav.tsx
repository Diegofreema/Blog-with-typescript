'use client';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import { IconType } from 'react-icons';
import Logo from '../Logo';

interface Props {
  navItems: { label: string; Icon: IconType; href: string }[];
}
const NAV_OPEN_WIDTH = 'w-60';
const NAV_CLOSE_WIDTH = 'w-12';
const NAV_VISIBILITY = 'nav-visibility';
const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const [visible, setVisible] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  const toggleNav = (visibility: boolean) => {
    const { current: currentNav } = navRef;
    if (!currentNav) return;
    const { classList } = currentNav;
    if (visibility) {
      classList.remove(NAV_OPEN_WIDTH);
      classList.add(NAV_CLOSE_WIDTH);
    } else {
      classList.add(NAV_OPEN_WIDTH);
      classList.remove(NAV_CLOSE_WIDTH);
    }
  };

  const updateNavState = () => {
    toggleNav(visible);
    const newState = !visible;
    setVisible(newState);
    localStorage.setItem('nav-visibility', JSON.stringify(newState));
  };
  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY);
    if (navState !== null) {
      const newState = JSON.parse(navState);
      setVisible(newState);
      toggleNav(!newState);
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden fixed top-0"
    >
      <div>
        <Link href={'/admin'} className="flex items-center space-x-2 p-3 mb-10">
          <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
          {visible && (
            <span className="fill-highlight-light leading-none dark:fill-highlight-dark text-xl font-semibold">
              Admin
            </span>
          )}
        </Link>
        <div className="space-y-6">
          {navItems.map(({ href, Icon, label }) => {
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition"
              >
                <Icon size={24} />
                {visible && <span className="ml-2 leading-none">{label}</span>}
              </Link>
            );
          })}
        </div>
      </div>
      <button
        onClick={updateNavState}
        className=" text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition self-end"
      >
        {visible ? (
          <RiMenuFoldFill size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
