import React from 'react';
import { FileText, User, Clock as ClockIcon, Download } from 'lucide-react';

export function ReferenceLettersPage() {
  // Example reference letters data
  const letters = [
    {
      id: 1,
      title: 'Project X Reference',
      author: 'John Doe',
      date: '2023-10-15',
      status: 'Received',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Internship Reference',
      author: 'Jane Smith',
      date: '2023-09-20',
      status: 'Received',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Freelance Work Reference',
      author: 'Michael Johnson',
      date: 'Pending',
      status: 'Requested'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reference Letters</h1>

      {/* Letters List */}
      <div className="space-y-4">
        {letters.map((letter) => (
          <div key={letter.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{letter.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {letter.author}
                    </span>
                    <span className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {letter.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  letter.status === 'Received' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {letter.status}
                </span>
                {letter.downloadUrl && (
                  <a 
                    href={letter.downloadUrl} 
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <Download className="w-5 h-5 text-gray-600" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Request New Letter Button */}
      <div className="mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Request New Reference Letter
        </button>
      </div>
    </div>
  );
} 