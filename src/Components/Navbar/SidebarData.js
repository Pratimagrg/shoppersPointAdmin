import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io5';
import * as BiIcons from 'react-icons/bi';

export const SidebarData = [
  {
    title_id: 'Dashboard',
    path: '/',
    icon: <MdIcons.MdDashboard />,
    children: []
  },
  {
    title_id: 'Featured',
    path: '/featured',
    icon: <FaIcons.FaUserFriends />,
    children: []
  },
 
];