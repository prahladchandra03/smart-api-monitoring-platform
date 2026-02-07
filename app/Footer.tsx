import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">Smart API Monitor</h3>
          <p className="text-gray-400 text-sm">
            Keep your APIs healthy and your users happy.
          </p>
        </div>

        <div className="flex gap-6 mb-6 md:mb-0">
          <a href="https://github.com/prahladchandra03" className="text-gray-400 hover:text-white transition">
            <Github size={20} />
          </a>
          <a href="https://x.com/Prahladchandra2" className="text-gray-400 hover:text-white transition">
            <Twitter size={20} />
          </a>
          <a href="https://www.linkedin.com/in/prahlad-chandra-dev/" className="text-gray-400 hover:text-white transition">
            <Linkedin size={20} />
          </a>
        </div>

        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Smart API Monitor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
