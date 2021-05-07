import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className='main-header'>
      <div className='main-container'>
        <div className='inner'>
          <div className='logo'>
            <Link href='/'>
              <a>SummerEvents</a>
            </Link>
          </div>
          <nav className='navbar'>
            <ul>
              <li>
                <Link href='/'>
                  <a>Book Events</a>
                </Link>
              </li>
              <li>
                <Link href='/events'>
                  <a>Events</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
