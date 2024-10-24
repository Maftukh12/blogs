import React, { useState, useEffect } from 'react';
import { Search, Clock, Calendar, User, Tag, TrendingUp, ChevronRight } from 'lucide-react';

const BlockchainBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'defi', name: 'DeFi' },
    { id: 'nft', name: 'NFT' },
    { id: 'crypto', name: 'Cryptocurrency' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Revolusi Web3: Masa Depan Internet",
      author: "Alex Turner",
      date: "24 Oktober 2024",
      readTime: "5 menit",
      category: "blockchain",
      trending: true,
      content: "Web3 membawa perubahan fundamental dalam cara kita berinteraksi dengan internet...",
      image: "https://bigai.io/wp-content/uploads/2022/08/web3.0.png"
    },
    {
      id: 2,
      title: "DeFi: Mengubah Landscape Keuangan Global",
      author: "Sarah Chen",
      date: "24 Oktober 2024",
      readTime: "8 menit",
      category: "defi",
      trending: true,
      content: "Decentralized Finance membuka peluang baru dalam sistem keuangan global...",
      image: "https://binus.ac.id/bekasi/wp-content/uploads/2024/07/D06.png"
    },
    {
      id: 3,
      title: "NFT Gaming: Masa Depan Industri Game",
      author: "Mike Johnson",
      date: "24 Oktober 2024",
      readTime: "6 menit",
      category: "nft",
      trending: false,
      content: "Gaming berbasis NFT membuka era baru dalam industri game...",
      image: "https://miro.medium.com/v2/resize:fit:1200/1*g99yN5naUaGZOqH1VrKu2Q.png"
    },
    {
        id: 4,
        title:"crypto investasi masa depan",
        author:"mr.z",
        date:"24 oktober 2024",
        readTime:"10 menit",
        category:"crypto",
        trending: true,
        content:"investasi jangka panjang di dalam dunia crypto...",
        image:"https://blog.pintu.co.id/wp-content/uploads/2023/12/investasi-crypto.jpg"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const trendingPosts = blogPosts.filter(post => post.trending);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <nav className={`fixed w-full z-50 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      } bg-white shadow-md`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CryptoInsights
            </span>
          </div>
          <div className="flex items-center space-x-6">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <header className="pt-20 pb-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Blockchain Daily</h1>
          <p className="text-xl text-blue-100 mb-8">Eksplorasi Dunia Blockchain, DeFi, dan Cryptocurrency</p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari artikel..."
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-transparent focus:border-blue-300 focus:outline-none bg-white/10 backdrop-blur-md text-white placeholder-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center mb-6">
            <TrendingUp className="text-red-500 mr-2" />
            <h2 className="text-2xl font-bold">Trending</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingPosts.map(post => (
              <div key={post.id} className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"></div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                  <div className="flex items-center space-x-2 text-sm mb-2">
                    <Tag size={16} className="text-blue-400" />
                    <span className="text-blue-300">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
                <button className="mt-4 flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                  Baca selengkapnya
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tentang Kami</h3>
              <p className="text-blue-200">
                CryptoInsights adalah sumber terpercaya untuk berita dan analisis blockchain terkini.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Kategori</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => setSelectedCategory(cat.id)}
                      className="text-blue-200 hover:text-white transition-colors text-left w-full"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-blue-200 mb-4">
                Dapatkan update terbaru seputar blockchain.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-200">
            <p>© 2024 CryptoInsights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlockchainBlog;