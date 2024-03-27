import React from "react";
import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
// fontAwesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion,faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// image import
import logo from "../../../assets/icons/logo.svg";
import darklogo from "../../../assets/icons/logo-dark-theme.svg";
import darkMode from "../../../assets/icons/Dark theme.svg";
import folderIcon from "../../../assets/icons/folderIcon.svg";
import helpIcon from "../../../assets/icons/help.svg";
import menuIcon from "../../../assets/icons/menu-icon.svg"
import magnifier from "../../../assets/icons/magnifyGlass.svg"
import notification from "../../../assets/icons/Notification.svg" 
import profileImage from "../../../assets/icons/profile-image.png"
import CheckboxIcon from "../../../assets/icons/checkbox.svg";
import {ReactComponent as MagnifyGlass} from "../../../assets/icons/magnifyGlass.svg";
// import '../../../shades/topBar.scss';
import Switcher from "../../../components/Switcher";
  const user = {
    name: 'Chelsea Hagon',
    email: 'chelsea.hagon@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
        
function TopBar({ToggleBtn}){
    return(
        <div>
            <div style={{boxShadow:'0 5px 17px rgba(0,0,0,0.07)'}} className="topBars relative zIndex-1 dark:bg-[#051534]">
              <Popover
                as="header"
                className={({ open }) =>
                  classNames(
                    open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                    'bg-white lg:static lg:overflow-y-visible'
                  )
                }
              >
                  {({ open }) => (
                    <>
                      <div className="mx-auto  w-full px-4 sm:px-6 pd-24 dark:bg-[#051534]">
                        <div className="relative flex justify-between">
                          <div className="flex">
                            <div className="flex flex-shrink-0 items-center ">                             
                              <a href="https://www.zimzee.com/" target="_blank">
                                <img
                                  className="light-theme-logo block w-full"
                                  src={`/icons/logo.svg`}
                                  alt="Zimzee-Logo"
                                />
                              </a>
          
                              <a href="#">
                                <img
                                  className="dark-theme-logo block w-full"
                                  src={`/icons/logo-dark-theme.svg`}
                                  alt="Zimzee-Logo"
                                />
                              </a>
                            </div>
                          </div>                      
                          <div className="theme-content flex justify-between items-center lg:w-[260px] lg:pl-5">
                            {/* Profile dropdown */}
                            {/* <img className="topbar-icon"  src={folderIcon} alt="folderIcon"/> */}
                            {/* <img  src={darkMode} alt="darkMode"/> */}
                            <Switcher />
                            {/* <img className="topbar-icon" src={helpIcon} alt="helpIcon"/> */}
                            {/* <img className="topbar-icon" src={notification} alt="notification" /> */}


                            {/* <FontAwesomeIcon style={{fontSize:'19px'}} icon={faQuestion} /> */}
                            {/* <Menu as="div" className="relative flex-shrink-0">
                              <div>
                                <Menu.Button className="flex focus:outline-none">
                                      <a
                                        href="#"
                                        className="flex-shrink-0  p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
                                      >
                                      <span className="sr-only">View notifications</span>
                                      <img src={profileImage} />

                                  </a>
                                </Menu.Button>
                              </div>
                              
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className=" absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                      {({ active }) => (
                                        <a
                                          href={item.href}
                                          className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block py-2 px-4 text-sm text-gray-700'
                                          )}
                                        >
                                          {item.name}
                                        </a>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </Menu> */}

                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  </Popover>
            </div>          
        </div>
          )
        }


export default TopBar;