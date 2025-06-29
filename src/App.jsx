import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Chrome, 
  Download, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Globe,
  Shield,
  Zap,
  Users,
  Github,
  ExternalLink
} from 'lucide-react';

const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
                            <span className="text-xl font-bold text-white">Know Your Plane</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="#download" className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
              Install Now
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-orange-500/20 rounded-full text-blue-300 text-sm font-medium border border-blue-500/20">
                <Zap className="w-4 h-4 mr-2" />
                5+ New Features • Chrome Extension
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-orange-100 bg-clip-text text-transparent leading-tight"
            >
              Identify Aircraft
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                While Booking
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Professional-grade aircraft identification for flight bookings. Instantly see if you're flying on Boeing or Airbus aircraft. 
              Perfect for aviation enthusiasts and informed travelers.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-orange-600/20 backdrop-blur-sm px-6 py-3 rounded-lg border border-blue-500/20">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-300 font-medium">Instant Boeing/Airbus Tags</span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-600/20 to-blue-600/20 backdrop-blur-sm px-6 py-3 rounded-lg border border-orange-500/20">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-medium">Works on 20+ Booking Sites</span>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <button 
                onClick={() => {
                  // Replace with your actual Chrome Web Store URL when published
                  window.open('chrome://extensions/', '_blank');
                  // For production: window.open('https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID', '_blank');
                }}
                className="group relative bg-gradient-to-r from-blue-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <Chrome className="w-6 h-6" />
                  <span>Add to Chrome</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <button 
                onClick={() => window.open('https://github.com/your-username/flight-aircraft-identifier', '_blank')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-xl"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Our Extension?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Advanced aircraft identification technology designed for modern travelers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Plane className="w-8 h-8" />,
                title: "Instant Identification",
                description: "See Boeing vs Airbus tags immediately in search results without clicking anything",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Universal Coverage",
                description: "Works on Cleartrip, Ixigo, MakeMyTrip, Google Flights, and 15+ more booking sites",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Real-time Updates",
                description: "Dynamic content detection with automatic updates as flight results load",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Privacy First",
                description: "No data collection, all processing happens locally in your browser",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Indian Airlines",
                description: "Complete coverage of IndiGo, SpiceJet, Air India, Vistara, and all major carriers",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Smart Detection",
                description: "AI-powered airline fleet database for accurate manufacturer identification",
                gradient: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative px-6 py-20 bg-gradient-to-r from-blue-900/20 to-orange-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg">
              Simple installation, instant results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Install Extension",
                description: "Add to Chrome in one click. No signup required.",
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "02", 
                title: "Search Flights",
                description: "Visit any booking site and search for flights normally.",
                color: "from-orange-500 to-orange-600"
              },
              {
                step: "03",
                title: "See Aircraft Tags",
                description: "Instantly see Boeing/Airbus tags next to airline names.",
                color: "from-green-500 to-green-600"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white`}>
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Identify Aircraft?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who make informed flight choices with instant Boeing vs Airbus identification.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button 
                onClick={() => {
                  // Replace with your actual Chrome Web Store URL when published
                  window.open('chrome://extensions/', '_blank');
                  // For production: window.open('https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID', '_blank');
                }}
                className="group bg-gradient-to-r from-blue-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <Chrome className="w-6 h-6" />
                  <span>Install Chrome Extension</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <div className="flex items-center space-x-2 text-gray-400">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>4.9/5 rating • 1000+ users</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">95%</div>
                <div className="text-gray-400 text-sm">Accuracy Rate</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-400">20+</div>
                <div className="text-gray-400 text-sm">Supported Sites</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-gray-400 text-sm">Free Forever</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">0ms</div>
                <div className="text-gray-400 text-sm">Load Impact</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
                              <span className="text-white font-semibold">Know Your Plane</span>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2025 Know Your Plane. Made with ✈️ for aviation enthusiasts worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App; 