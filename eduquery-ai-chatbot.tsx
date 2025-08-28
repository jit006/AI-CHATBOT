import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Bot, User, Menu, X, Database, TrendingUp, Users, Award, Book, MapPin, Phone, Mail, Star, Calendar, IndianRupee } from 'lucide-react';

// Comprehensive database for Rajasthan technical colleges
const collegeDatabase = {
  colleges: [
    {
      id: 1,
      name: "Malaviya National Institute of Technology (MNIT) Jaipur",
      type: "Engineering",
      city: "Jaipur",
      established: 1963,
      affiliation: "NIT System",
      nirf_ranking: 45,
      fees: {
        tuition: 85000,
        hostel: 25000,
        total: 110000
      },
      cutoff_2024: {
        cse: { general: 8500, obc: 12000, sc: 25000, st: 30000 },
        ece: { general: 12000, obc: 16000, sc: 30000, st: 35000 },
        mechanical: { general: 15000, obc: 20000, sc: 35000, st: 40000 }
      },
      cutoff_history: [
        { year: 2023, cse: 8200, ece: 11500, mechanical: 14500 },
        { year: 2022, cse: 7800, ece: 11000, mechanical: 14000 },
        { year: 2021, cse: 7500, ece: 10500, mechanical: 13500 }
      ],
      placement_2024: {
        average_package: 12.5,
        highest_package: 45.0,
        placement_percentage: 85,
        top_recruiters: ["Microsoft", "Google", "Amazon", "TCS", "Infosys"]
      },
      facilities: ["Hostel", "Library", "Labs", "Sports Complex", "Wi-Fi", "Cafeteria"],
      faculty_rating: 4.3,
      student_reviews: [
        { rating: 4, comment: "Excellent faculty and infrastructure", author: "Rahul S." },
        { rating: 5, comment: "Great placement opportunities", author: "Priya M." }
      ],
      contact: {
        phone: "+91-141-2529000",
        email: "registrar@mnit.ac.in",
        website: "www.mnit.ac.in"
      }
    },
    {
      id: 2,
      name: "Government Engineering College Ajmer",
      type: "Engineering",
      city: "Ajmer",
      established: 1997,
      affiliation: "RTU Kota",
      nirf_ranking: 180,
      fees: {
        tuition: 45000,
        hostel: 15000,
        total: 60000
      },
      cutoff_2024: {
        cse: { general: 25000, obc: 35000, sc: 55000, st: 65000 },
        ece: { general: 30000, obc: 40000, sc: 60000, st: 70000 },
        mechanical: { general: 35000, obc: 45000, sc: 65000, st: 75000 }
      },
      placement_2024: {
        average_package: 6.5,
        highest_package: 25.0,
        placement_percentage: 70,
        top_recruiters: ["TCS", "Infosys", "Wipro", "Tech Mahindra", "Capgemini"]
      },
      facilities: ["Hostel", "Library", "Computer Labs", "Workshop", "Canteen"],
      faculty_rating: 3.8,
      student_reviews: [
        { rating: 4, comment: "Good college for the fee structure", author: "Amit K." }
      ],
      contact: {
        phone: "+91-145-2787001",
        email: "principal@gecajmer.ac.in"
      }
    },
    {
      id: 3,
      name: "Government Polytechnic Jodhpur",
      type: "Polytechnic",
      city: "Jodhpur",
      established: 1956,
      affiliation: "Board of Technical Education, Rajasthan",
      fees: {
        tuition: 25000,
        hostel: 12000,
        total: 37000
      },
      cutoff_2024: {
        cse: { general: 150, obc: 180, sc: 250, st: 300 },
        ece: { general: 180, obc: 220, sc: 280, st: 350 },
        mechanical: { general: 200, obc: 240, sc: 300, st: 400 }
      },
      placement_2024: {
        average_package: 3.5,
        highest_package: 8.0,
        placement_percentage: 60,
        top_recruiters: ["Local Industries", "Rajasthan Government", "Private Companies"]
      },
      facilities: ["Hostel", "Library", "Workshops", "Computer Lab"],
      faculty_rating: 3.5,
      student_reviews: [
        { rating: 3, comment: "Decent for polytechnic education", author: "Suresh P." }
      ]
    }
  ],
  
  scholarships: [
    {
      name: "Chief Minister's Scholarship",
      eligibility: "Meritorious students from economically weaker sections",
      amount: 50000,
      renewable: true
    },
    {
      name: "SC/ST Scholarship",
      eligibility: "Students belonging to SC/ST category",
      amount: 30000,
      renewable: true
    },
    {
      name: "Merit Scholarship",
      eligibility: "Top 10% students in entrance exam",
      amount: 25000,
      renewable: false
    }
  ],

  admission_process: {
    engineering: {
      exam: "JEE Main / REAP",
      counseling: "Rajasthan Engineering Admission Process (REAP)",
      dates: "June - August",
      documents: ["10th Certificate", "12th Certificate", "JEE Scorecard", "Category Certificate", "Domicile Certificate"]
    },
    polytechnic: {
      exam: "Polytechnic Entrance Test (PET)",
      counseling: "Centralized Counseling",
      dates: "May - July",
      documents: ["10th Certificate", "Category Certificate", "Domicile Certificate"]
    }
  }
};

const EduQueryAI = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hello! I'm EduQuery AI, your virtual assistant for Rajasthan's technical education. I can help you with college information, admissions, cutoffs, placements, and more. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const messagesEndRef = useRef(null);
  const recognition = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = currentLanguage === 'en' ? 'en-IN' : 'hi-IN';
      
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      
      recognition.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, [currentLanguage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Enhanced AI Response System
  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // College search and information
    if (input.includes('college') || input.includes('institute')) {
      if (input.includes('list') || input.includes('all')) {
        return formatCollegeList();
      }
      
      const college = findCollege(input);
      if (college) {
        return formatCollegeInfo(college);
      }
      return "I found several colleges. Could you please specify which college you're interested in? You can ask about MNIT Jaipur, GEC Ajmer, or Government Polytechnic Jodhpur.";
    }
    
    // Cutoff queries
    if (input.includes('cutoff') || input.includes('cut off')) {
      return handleCutoffQuery(input);
    }
    
    // Placement queries
    if (input.includes('placement') || input.includes('job') || input.includes('salary')) {
      return handlePlacementQuery(input);
    }
    
    // Fees queries
    if (input.includes('fee') || input.includes('cost') || input.includes('expense')) {
      return handleFeesQuery(input);
    }
    
    // Admission queries
    if (input.includes('admission') || input.includes('apply') || input.includes('entrance')) {
      return handleAdmissionQuery(input);
    }
    
    // Scholarship queries
    if (input.includes('scholarship') || input.includes('financial aid')) {
      return formatScholarshipInfo();
    }
    
    // Branch/Course queries
    if (input.includes('branch') || input.includes('course') || input.includes('cse') || input.includes('computer') || input.includes('mechanical') || input.includes('ece')) {
      return handleBranchQuery(input);
    }
    
    // Facilities queries
    if (input.includes('facilities') || input.includes('hostel') || input.includes('library') || input.includes('lab')) {
      return handleFacilitiesQuery(input);
    }
    
    // General greetings and help
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm here to help you with information about technical colleges in Rajasthan. You can ask me about:\n\n• College details and rankings\n• Cutoffs and admission criteria\n• Fee structure\n• Placement statistics\n• Scholarships\n• Facilities and reviews\n\nWhat would you like to know?";
    }
    
    if (input.includes('help')) {
      return generateHelpResponse();
    }
    
    // Default response with suggestions
    return "I understand you're looking for information about technical education in Rajasthan. Here are some things you can ask me:\n\n📚 \"Show me colleges in Jaipur\"\n💰 \"What are the fees for engineering colleges?\"\n📊 \"CSE cutoff for MNIT\"\n🎓 \"Placement statistics for GEC Ajmer\"\n💳 \"Available scholarships\"\n🏢 \"Hostel facilities in colleges\"\n\nPlease feel free to ask any specific question!";
  };

  // Helper functions for different query types
  const findCollege = (input) => {
    return collegeDatabase.colleges.find(college => 
      input.includes(college.name.toLowerCase()) ||
      input.includes(college.city.toLowerCase()) ||
      (input.includes('mnit') && college.name.includes('MNIT')) ||
      (input.includes('gec') && college.name.includes('GEC')) ||
      (input.includes('polytechnic') && college.type === 'Polytechnic')
    );
  };

  const handleCutoffQuery = (input) => {
    const college = findCollege(input);
    const branch = detectBranch(input);
    const category = detectCategory(input);
    
    if (college && branch) {
      const cutoff = college.cutoff_2024[branch];
      if (cutoff && category && cutoff[category]) {
        return `${college.name} - ${branch.toUpperCase()} Cutoff 2024 (${category.toUpperCase()}): ${cutoff[category]}\n\nPrevious years trends:\n${formatCutoffHistory(college, branch)}`;
      } else if (cutoff) {
        return `${college.name} - ${branch.toUpperCase()} Cutoff 2024:\n• General: ${cutoff.general}\n• OBC: ${cutoff.obc}\n• SC: ${cutoff.sc}\n• ST: ${cutoff.st}`;
      }
    }
    
    if (college) {
      return formatAllCutoffs(college);
    }
    
    return "Please specify the college and branch for cutoff information. For example: 'CSE cutoff for MNIT' or 'Mechanical cutoff for GEC Ajmer'";
  };

  const handlePlacementQuery = (input) => {
    const college = findCollege(input);
    if (college && college.placement_2024) {
      const p = college.placement_2024;
      return `${college.name} - Placement Statistics 2024:\n\n📊 Placement Rate: ${p.placement_percentage}%\n💰 Average Package: ₹${p.average_package} LPA\n🏆 Highest Package: ₹${p.highest_package} LPA\n\n🏢 Top Recruiters:\n${p.top_recruiters.map(r => `• ${r}`).join('\n')}\n\nWould you like detailed placement information for any specific branch?`;
    }
    
    return formatAllPlacements();
  };

  const handleFeesQuery = (input) => {
    const college = findCollege(input);
    if (college) {
      return `${college.name} - Fee Structure:\n\n💰 Tuition Fee: ₹${college.fees.tuition.toLocaleString()}/year\n🏠 Hostel Fee: ₹${college.fees.hostel.toLocaleString()}/year\n📊 Total Annual Fee: ₹${college.fees.total.toLocaleString()}\n\n📝 Note: Fees may vary for different categories. Additional charges for exam, library, and other facilities may apply.`;
    }
    
    return formatAllFees();
  };

  const handleAdmissionQuery = (input) => {
    if (input.includes('polytechnic')) {
      return formatAdmissionProcess('polytechnic');
    } else {
      return formatAdmissionProcess('engineering');
    }
  };

  const handleBranchQuery = (input) => {
    const branch = detectBranch(input);
    if (branch) {
      return `Information about ${branch.toUpperCase()} branch:\n\n${formatBranchDetails(branch)}`;
    }
    return "Available branches:\n• Computer Science Engineering (CSE)\n• Electronics & Communication (ECE)\n• Mechanical Engineering\n• Civil Engineering\n• Electrical Engineering\n\nWhich branch would you like to know about?";
  };

  const handleFacilitiesQuery = (input) => {
    const college = findCollege(input);
    if (college) {
      return `${college.name} - Facilities:\n\n${college.facilities.map(f => `✅ ${f}`).join('\n')}\n\n⭐ Faculty Rating: ${college.faculty_rating}/5\n\n👥 Student Reviews:\n${college.student_reviews.map(r => `"${r.comment}" - ${r.author} (${r.rating}⭐)`).join('\n')}`;
    }
    return "Please specify which college's facilities you'd like to know about.";
  };

  // Utility functions
  const detectBranch = (input) => {
    if (input.includes('cse') || input.includes('computer')) return 'cse';
    if (input.includes('ece') || input.includes('electronics')) return 'ece';
    if (input.includes('mechanical') || input.includes('mech')) return 'mechanical';
    if (input.includes('civil')) return 'civil';
    if (input.includes('electrical') || input.includes('eee')) return 'electrical';
    return null;
  };

  const detectCategory = (input) => {
    if (input.includes('general') || input.includes('gen')) return 'general';
    if (input.includes('obc')) return 'obc';
    if (input.includes('sc')) return 'sc';
    if (input.includes('st')) return 'st';
    return null;
  };

  const formatCollegeList = () => {
    return `🎓 Technical Colleges in Rajasthan:\n\n${collegeDatabase.colleges.map((college, idx) => 
      `${idx + 1}. ${college.name}\n   📍 ${college.city} | ${college.type} | Est. ${college.established}\n   💰 Annual Fee: ₹${college.fees.total.toLocaleString()}`
    ).join('\n\n')}`;
  };

  const formatCollegeInfo = (college) => {
    return `🏛️ ${college.name}\n\n📍 Location: ${college.city}\n🎯 Type: ${college.type}\n📅 Established: ${college.established}\n🏆 NIRF Ranking: ${college.nirf_ranking || 'Not Ranked'}\n💰 Annual Fee: ₹${college.fees.total.toLocaleString()}\n📊 Placement Rate: ${college.placement_2024.placement_percentage}%\n⭐ Faculty Rating: ${college.faculty_rating}/5\n\n📞 Contact: ${college.contact?.phone || 'N/A'}\n📧 Email: ${college.contact?.email || 'N/A'}\n\nWould you like more details about admissions, cutoffs, or placements?`;
  };

  const formatAllCutoffs = (college) => {
    return `${college.name} - All Branch Cutoffs 2024:\n\n${Object.entries(college.cutoff_2024).map(([branch, cutoffs]) => 
      `${branch.toUpperCase()}:\n• General: ${cutoffs.general}\n• OBC: ${cutoffs.obc}\n• SC: ${cutoffs.sc}\n• ST: ${cutoffs.st}`
    ).join('\n\n')}`;
  };

  const formatAllFees = () => {
    return `💰 Fee Structure Comparison:\n\n${collegeDatabase.colleges.map(college => 
      `${college.name}:\n• Total Annual: ₹${college.fees.total.toLocaleString()}\n• Tuition: ₹${college.fees.tuition.toLocaleString()}\n• Hostel: ₹${college.fees.hostel.toLocaleString()}`
    ).join('\n\n')}`;
  };

  const formatAllPlacements = () => {
    return `📊 Placement Comparison 2024:\n\n${collegeDatabase.colleges.map(college => 
      `${college.name}:\n• Placement Rate: ${college.placement_2024.placement_percentage}%\n• Average Package: ₹${college.placement_2024.average_package} LPA\n• Highest Package: ₹${college.placement_2024.highest_package} LPA`
    ).join('\n\n')}`;
  };

  const formatScholarshipInfo = () => {
    return `💳 Available Scholarships:\n\n${collegeDatabase.scholarships.map((scholarship, idx) => 
      `${idx + 1}. ${scholarship.name}\n   💰 Amount: ₹${scholarship.amount.toLocaleString()}\n   ✅ Eligibility: ${scholarship.eligibility}\n   🔄 Renewable: ${scholarship.renewable ? 'Yes' : 'No'}`
    ).join('\n\n')}`;
  };

  const formatAdmissionProcess = (type) => {
    const process = collegeDatabase.admission_process[type];
    return `📋 ${type.charAt(0).toUpperCase() + type.slice(1)} Admission Process:\n\n📝 Entrance Exam: ${process.exam}\n🎯 Counseling: ${process.counseling}\n📅 Important Dates: ${process.dates}\n\n📄 Required Documents:\n${process.documents.map(doc => `• ${doc}`).join('\n')}\n\n💡 Tip: Keep all documents ready in original + photocopy format.`;
  };

  const formatBranchDetails = (branch) => {
    const branchInfo = {
      cse: "Computer Science Engineering - High demand branch with excellent placement opportunities. Focus on programming, software development, AI/ML, and emerging technologies.",
      ece: "Electronics & Communication Engineering - Deals with electronic devices, communication systems, and signal processing. Good opportunities in telecom and electronics industry.",
      mechanical: "Mechanical Engineering - Core engineering branch focusing on design, manufacturing, and machinery. Opportunities in automotive, aerospace, and manufacturing sectors."
    };
    return branchInfo[branch] || "Popular engineering branch with good career prospects.";
  };

  const formatCutoffHistory = (college, branch) => {
    return college.cutoff_history.map(year => `${year.year}: ${year[branch]}`).join('\n');
  };

  const generateHelpResponse = () => {
    return `🤖 EduQuery AI Help Guide:\n\n📚 What I can help you with:\n\n1️⃣ College Information\n   • "Show colleges in Jaipur"\n   • "Details about MNIT"\n   • "Engineering vs Polytechnic"\n\n2️⃣ Admissions & Cutoffs\n   • "CSE cutoff for MNIT"\n   • "Admission process"\n   • "Required documents"\n\n3️⃣ Fees & Scholarships\n   • "Fee structure comparison"\n   • "Available scholarships"\n   • "Financial aid options"\n\n4️⃣ Placements & Careers\n   • "Placement statistics"\n   • "Average salary packages"\n   • "Top recruiting companies"\n\n5️⃣ Facilities & Reviews\n   • "Hostel facilities"\n   • "Faculty ratings"\n   • "Student reviews"\n\n💬 You can ask questions in natural language. I support both English and Hindi!`;
  };

  // Voice functionality
  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: generateResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInput('');
  };

  const quickActions = [
    { label: "College List", query: "Show me all colleges" },
    { label: "MNIT Info", query: "Tell me about MNIT Jaipur" },
    { label: "Cutoffs", query: "Show cutoff trends" },
    { label: "Placements", query: "Placement statistics" },
    { label: "Scholarships", query: "Available scholarships" },
    { label: "Admission Process", query: "How to apply for admission" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">EduQuery AI</h1>
              <p className="text-sm text-gray-500">Rajasthan Tech Education</p>
            </div>
          </div>
          <button onClick={() => setShowSidebar(false)} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Quick Actions</h3>
            <div className="space-y-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(action.query);
                    setShowSidebar(false);
                  }}
                  className="w-full text-left p-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Statistics</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-green-600" />
                <span className="text-sm">50+ Colleges</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm">5 Years Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Updated Info</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white text-sm">
            <p className="font-semibold">💡 Pro Tip</p>
            <p className="mt-1">Ask specific questions like "CSE cutoff for MNIT" for better results!</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowSidebar(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold">EduQuery AI is online</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select 
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-2`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-600' : 'bg-gray-600'
                }`}>
                  {message.type === 'user' ? 
                    <User className="h-4 w-4 text-white" /> : 
                    <Bot className="h-4 w-4 text-white" />
                  }
                </div>
                <div className={`p-3 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white shadow-md border'
                }`}>
                  <pre className="whitespace-pre-wrap font-sans text-sm">{message.content}</pre>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="border-t bg-white p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about colleges, admissions, cutoffs, placements..."
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                  isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                } hover:bg-opacity-80 transition-colors`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Send</span>
            </button>
          </form>
          
          <div className="mt-3 text-xs text-gray-500 text-center">
            💡 Try: "Show MNIT cutoffs" • "Compare college fees" • "Scholarship eligibility" • "Placement stats"
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduQueryAI;