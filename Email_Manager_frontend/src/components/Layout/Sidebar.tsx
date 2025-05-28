import React, { useState } from 'react';
import { Mail, Inbox, Archive, Trash, Tag, Settings, PlusCircle } from 'lucide-react';
import AccountSelector from './AccountSelector';
import EmailAuthPopup from '../EmailCred/EmailAuthPopup';
import { useGmailContext } from '../../contexts/GmailContext';

const Sidebar = () => {
  const {handleAddAccount} = useGmailContext();
  const categories = [
    { id: 'interested', name: 'Interested', count: 12, color: 'bg-green-500' },
    { id: 'meeting-booked', name: 'Meeting Booked', count: 5, color: 'bg-blue-500' },
    { id: 'not-interested', name: 'Not Interested', count: 8, color: 'bg-yellow-500' },
    { id: 'spam', name: 'Spam', count: 20, color: 'bg-red-500' },
    { id: 'out-of-office', name: 'Out of Office', count: 3, color: 'bg-purple-500' },
  ];

  const folders = [
    { id: 'inbox', name: 'Inbox', icon: <Inbox size={18} />, count: 24 },
    { id: 'archive', name: 'Archive', icon: <Archive size={18} />, count: 156 },
    { id: 'trash', name: 'Trash', icon: <Trash size={18} />, count: 8 },
  ];

  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => setShowPopup(false);
  const handleSubmitPopup = async(email: string, appPassword: string) => {
    // Handle the email and app password submission here
    console.log('Email:', email);
    console.log('App Password:', appPassword);
    await handleAddAccount(email, appPassword);
    setShowPopup(false);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold flex items-center text-blue-600">
          <Mail className="mr-2" /> OneBox
        </h1>
      </div>

      <div className="p-4">
        <AccountSelector />

        <button
         type='button'
          className="w-full mt-4 bg-blue-600 text-white rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-700 transition-colors"
          onClick={() => setShowPopup(true)}
        >
          <PlusCircle size={18} className="mr-2" /> Add Account
        </button>
        {showPopup && (
          <EmailAuthPopup onClose={handleClosePopup} onSubmit={handleSubmitPopup} />
        )}
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto">
        <div className="px-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Folders</h2>
          <ul>
            {folders.map((folder) => (
              <li key={folder.id}>
                <a
                  href="#"
                  className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    {folder.icon}
                    <span className="ml-2 text-gray-700">{folder.name}</span>
                  </div>
                  <span className="text-xs bg-gray-200 text-gray-700 py-1 px-2 rounded-full">
                    {folder.count}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4 mt-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href="#"
                  className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
                    <span className="ml-2 text-gray-700">{category.name}</span>
                  </div>
                  <span className="text-xs bg-gray-200 text-gray-700 py-1 px-2 rounded-full">
                    {category.count}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
          <Settings size={18} className="mr-2" />
          <span>Settings</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;