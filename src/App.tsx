import React, { useState } from 'react';
import { Calendar, Heart, User2, Briefcase, GraduationCap, Pencil, X, ChevronRight } from 'lucide-react';

interface UserProfile {
  id: number;
  name: string;
  image: string;
  description: string;
  gender: string;
  dob: string;
  maritalStatus: string;
  education: string;
  career: string;
  careerStatus: string;
}

function App() {
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[]>([
    {
      id: 1,
      name: 'Gaurav Singh',
      image: 'https://white-force.com/plus/src/public/member_images/e8rarmLz7vTtESPGNztd.png',
      description: 'Passionate about creating beautiful user experiences and capturing moments through my lens. Always exploring new creative possibilities and pushing boundaries in design.',
      gender: 'Male',
      dob: '1996-04-15',
      maritalStatus: 'Married',
      education: 'Master in Design, Stanford University',
      career: 'UI/UX Designer',
      careerStatus: 'Full-time at Google'
    },
    {
      id: 2,
      name: 'Amrendra',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      description: 'Software architect with a passion for building scalable systems. Love to mentor young developers and contribute to open-source projects.',
      gender: 'Male',
      dob: '1998-08-23',
      maritalStatus: 'Single',
      education: 'PhD in Computer Science, MIT',
      career: 'Software Architect',
      careerStatus: 'Tech Lead at Amazon'
    },
    {
      id: 3,
      name: 'Shreddha j',
      image: 'https://images8.alphacoders.com/581/581559.jpg',
      description: 'Digital marketing specialist with expertise in growth hacking and brand development. Always data-driven and results-oriented.',
      gender: 'Female',
      dob: '2000-12-03',
      maritalStatus: 'Single',
      education: 'BA in Marketing, NYU',
      career: 'Marketing Manager',
      careerStatus: 'Senior Manager at Netflix'
    }
  ]);

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (selectedProfile === null) return;

    setProfiles(prevProfiles =>
      prevProfiles.map(profile =>
        profile.id === selectedProfile
          ? { ...profile, [name]: value }
          : profile
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedProfile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Team Profiles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map(profile => (
            <div key={profile.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500">
                <div className="absolute -bottom-10 left-6">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-20 h-20 rounded-full border-4 border-white object-cover"
                  />
                </div>
              </div>

              <div className="pt-12 p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
                  <p className="text-indigo-600 font-medium">{profile.career}</p>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{profile.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <User2 size={14} className="text-indigo-500 mr-2" />
                    <span>{profile.gender}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar size={14} className="text-indigo-500 mr-2" />
                    <span>{calculateAge(profile.dob)} years</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Heart size={14} className="text-indigo-500 mr-2" />
                    <span>{profile.maritalStatus}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProfile(profile.id)}
                  className="mt-4 w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                >
                  <span className="text-sm font-medium">View Profile</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-in Modal */}
      {selectedProfile !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300">
          <div className="bg-white w-full max-w-lg h-full overflow-y-auto animate-slide-left">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button
                onClick={() => setSelectedProfile(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                    <input
                      type="text"
                      name="image"
                      value={profiles.find(p => p.id === selectedProfile)?.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profiles.find(p => p.id === selectedProfile)?.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={profiles.find(p => p.id === selectedProfile)?.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        name="gender"
                        value={profiles.find(p => p.id === selectedProfile)?.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        value={profiles.find(p => p.id === selectedProfile)?.dob}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                    <select
                      name="maritalStatus"
                      value={profiles.find(p => p.id === selectedProfile)?.maritalStatus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                    <input
                      type="text"
                      name="education"
                      value={profiles.find(p => p.id === selectedProfile)?.education}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Career</label>
                    <input
                      type="text"
                      name="career"
                      value={profiles.find(p => p.id === selectedProfile)?.career}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Career Status</label>
                    <input
                      type="text"
                      name="careerStatus"
                      value={profiles.find(p => p.id === selectedProfile)?.careerStatus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200 font-medium"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
