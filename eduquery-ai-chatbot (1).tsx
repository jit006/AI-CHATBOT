import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Bot, User, Menu, X, Database, TrendingUp, Users, Award, Book, MapPin, Phone, Mail, Star, Calendar, IndianRupee, Sparkles, MessageSquare, Search, BookOpen, GraduationCap, Building2, DollarSign } from 'lucide-react';

// Comprehensive database for Rajasthan technical colleges
const collegeDatabase = {
  colleges: [
    {
      id: 1,
      name: "Indian Institute of Technology (IIT) Jodhpur",
      type: "Engineering & Management",
      city: "Jodhpur",
      established: 2008,
      affiliation: "IIT System",
      nirf_ranking: 35,
      fees: {
        btech_tuition: 125000,
        mba_tuition: 450000,
        hostel: 30000,
        total_btech: 155000,
        total_mba: 480000
      },
      cutoff_2024: {
        cse: { general: 2500, obc: 4000, sc: 8000, st: 10000 },
        ece: { general: 3500, obc: 5000, sc: 9000, st: 11000 },
        mechanical: { general: 4500, obc: 6000, sc: 10000, st: 12000 }
      },
      cutoff_history: [
        { year: 2023, cse: 2400, ece: 3300, mechanical: 4300 },
        { year: 2022, cse: 2200, ece: 3100, mechanical: 4100 },
        { year: 2021, cse: 2000, ece: 2900, mechanical: 3900 }
      ],
      placement_2024: {
        average_package: 15.5,
        highest_package: 55.0,
        placement_percentage: 92,
        top_recruiters: ["Microsoft", "Google", "Amazon", "Goldman Sachs", "McKinsey"]
      },
      mba_placement_2024: {
        average_package: 11.77,
        median_package: 10.07,
        highest_package: 24.81,
        top_50_percent_avg: 14.54,
        top_25_percent_avg: 17.20,
        top_10_percent_avg: 21.21,
        placement_percentage: 95,
        total_students: 76,
        domain_split: {
          consulting: 28.6,
          it_services: 34.7,
          bfsi: 8.1,
          automotive_manufacturing: 12.3,
          healthcare: 4.1,
          others: 12.2
        },
        top_recruiters: ["EY", "Deloitte", "American Express", "HCL", "Royal Enfield", "Cognizant", "Lenovo", "Mediversal"],
        roles_offered: [
          "Business Analyst", "Business Consultant", "Product Analyst", 
          "Management Trainee", "Associate Product Lead", "Technical Program Manager",
          "Enterprise Risk Consultant", "Senior Analyst Marketing", "IT Consulting"
        ],
        batch_profile: {
          engineering_background: 72,
          commerce_background: 8,
          science_background: 11,
          others: 9,
          freshers_vs_experienced: "1:2",
          work_experience_split: {
            less_than_12_months: 17,
            thirteen_to_24_months: 33,
            twentyfive_to_48_months: 46,
            more_than_49_months: 4
          }
        }
      },
      facilities: ["Hostel", "Library", "Advanced Labs", "Sports Complex", "Wi-Fi", "Medical Center", "Cafeteria", "Research Centers"],
      faculty_rating: 4.6,
      student_reviews: [
        { rating: 5, comment: "Excellent placement opportunities and industry exposure", author: "Ankit K." },
        { rating: 4, comment: "World-class facilities and faculty", author: "Shreya P." },
        { rating: 5, comment: "Great ROI for MBA program with diverse placement opportunities", author: "Rajesh M." }
      ],
      contact: {
        phone: "+91-291-2801841",
        placement_phone: "+91-7073888566",
        email: "placement_sme@iitj.ac.in",
        chair_email: "chair_placement_sme@iitj.ac.in",
        website: "www.iitj.ac.in"
      }
    },
    {
      id: 2,
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
      id: 3,
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
      id: 4,
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
      content: "Hello! I'm EduQuery AI, your smart assistant for Rajasthan's technical education. I can help you with college information, admissions, cutoffs, placements, and more. What would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
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
    if (input.includes('college') || input.includes('institute') || input.includes('iit')) {
      if (input.includes('list') || input.includes('all')) {
        return formatCollegeList();
      }
      
      const college = findCollege(input);
      if (college) {
        return formatCollegeInfo(college);
      }
      return "I found several colleges. Could you please specify which college you're interested in? You can ask about IIT Jodhpur, MNIT Jaipur, GEC Ajmer, or Government Polytechnic Jodhpur.";
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
      (input.includes('iit') && college.name.includes('IIT')) ||
      (input.includes('mnit') && college.name.includes('MNIT')) ||
      (input.includes('gec') && college.name.includes('GEC')) ||
      (input.includes('polytechnic') && college.type === 'Polytechnic') ||
      (input.includes('jodhpur') && college.city === 'Jodhpur')
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
    
    if (input.includes('mba') || input.includes('management')) {
      if (college && college.mba_placement_2024) {
        return formatMBAPlacementInfo(college);
      }
      return "Please specify which college's MBA placement data you'd like to see. I have detailed MBA placement information for IIT Jodhpur.";
    }
    
    if (college && college.placement_2024) {
      const p = college.placement_2024;
      let response = `${college.name} - Placement Statistics 2024:\n\n📊 Placement Rate: ${p.placement_percentage}%\n💰 Average Package: ₹${p.average_package} LPA\n🏆 Highest Package: ₹${p.highest_package} LPA\n\n🏢 Top Recruiters:\n${p.top_recruiters.map(r => `• ${r}`).join('\n')}`;
      
      // Add MBA info if available
      if (college.mba_placement_2024) {
        response += `\n\n🎓 MBA Program Also Available - Ask about "MBA placement at ${college.name.split(' ')[0]}" for detailed MBA statistics.`;
      }
      
      return response + `\n\nWould you like detailed placement information for any specific branch?`;
    }
    
    return formatAllPlacements();
  };

  const formatMBAPlacementInfo = (college) => {
    const mba = college.mba_placement_2024;
    return `🎓 ${college.name} - MBA Placement Report 2022-2024:\n\n📊 PACKAGE STATISTICS:\n• Average CTC: ₹${mba.average_package} LPA\n• Median CTC: ₹${mba.median_package} LPA\n• Highest CTC: ₹${mba.highest_package} LPA\n• Top 10% Average: ₹${mba.top_10_percent_avg} LPA\n• Top 25% Average: ₹${mba.top_25_percent_avg} LPA\n• Top 50% Average: ₹${mba.top_50_percent_avg} LPA\n\n🎯 PLACEMENT RATE: ${mba.placement_percentage}% (${mba.total_students} students)\n\n🏭 DOMAIN-WISE DISTRIBUTION:\n• IT Services: ${mba.domain_split.it_services}%\n• Consulting: ${mba.domain_split.consulting}%\n• Manufacturing: ${mba.domain_split.automotive_manufacturing}%\n• Others: ${mba.domain_split.others}%\n• BFSI: ${mba.domain_split.bfsi}%\n• Healthcare: ${mba.domain_split.healthcare}%\n\n🏢 TOP RECRUITERS:\n${mba.top_recruiters.map(r => `• ${r}`).join('\n')}\n\n💼 KEY ROLES:\n${mba.roles_offered.slice(0, 6).map(r => `• ${r}`).join('\n')}\n\n👥 BATCH PROFILE:\n• Engineering Background: ${mba.batch_profile.engineering_background}%\n• Freshers:Experienced = ${mba.batch_profile.freshers_vs_experienced}\n• Work Experience: Most students have 25-48 months (${mba.batch_profile.work_experience_split.twentyfive_to_48_months}%)`;
  };

  const handleFeesQuery = (input) => {
    const college = findCollege(input);
    if (college) {
      let response = `${college.name} - Fee Structure:\n\n`;
      
      if (input.includes('mba') || input.includes('management')) {
        if (college.fees.mba_tuition) {
          response += `🎓 MBA Program:\n• Tuition Fee: ₹${college.fees.mba_tuition.toLocaleString()}/year\n• Hostel Fee: ₹${college.fees.hostel.toLocaleString()}/year\n• Total MBA Fee: ₹${college.fees.total_mba.toLocaleString()}/year\n\n`;
        }
      } else {
        response += `🎓 Engineering/BTech:\n• Tuition Fee: ₹${(college.fees.tuition || college.fees.btech_tuition || 0).toLocaleString()}/year\n• Hostel Fee: ₹${college.fees.hostel.toLocaleString()}/year\n• Total Annual Fee: ₹${(college.fees.total || college.fees.total_btech || 0).toLocaleString()}\n\n`;
        
        if (college.fees.mba_tuition) {
          response += `🎓 MBA Program Also Available:\n• MBA Total Fee: ₹${college.fees.total_mba.toLocaleString()}/year\n\n`;
        }
      }
      
      response += `📝 Note: Fees may vary for different categories. Additional charges for exam, library, and other facilities may apply.`;
      return response;
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
      `${idx + 1}. ${college.name}\n   📍 ${college.city} | ${college.type} | Est. ${college.established}\n   💰 Annual Fee: ₹${(college.fees.total || college.fees.total_btech || 0).toLocaleString()}`
    ).join('\n\n')}`;
  };

  const formatCollegeInfo = (college) => {
    let response = `🏛️ ${college.name}\n\n📍 Location: ${college.city}\n🎯 Type: ${college.type}\n📅 Established: ${college.established}\n🏆 NIRF Ranking: ${college.nirf_ranking || 'Not Ranked'}\n`;
    
    // Fee information
    if (college.fees.total_btech && college.fees.total_mba) {
      response += `💰 BTech Fee: ₹${college.fees.total_btech.toLocaleString()}/year\n💰 MBA Fee: ₹${college.fees.total_mba.toLocaleString()}/year\n`;
    } else {
      response += `💰 Annual Fee: ₹${(college.fees.total || college.fees.total_btech || 0).toLocaleString()}\n`;
    }
    
    // Placement information
    response += `📊 Placement Rate: ${college.placement_2024.placement_percentage}%\n`;
    if (college.mba_placement_2024) {
      response += `🎓 MBA Placement Rate: ${college.mba_placement_2024.placement_percentage}%\n`;
    }
    
    response += `⭐ Faculty Rating: ${college.faculty_rating}/5\n\n📞 Contact: ${college.contact?.phone || 'N/A'}\n📧 Email: ${college.contact?.email || 'N/A'}`;
    
    if (college.mba_placement_2024) {
      response += `\n\n🎓 This institute offers both Engineering and MBA programs with excellent placement records!`;
    }
    
    response += `\n\nWould you like more details about admissions, cutoffs, or placements?`;
    return response;
  };

  const formatAllCutoffs = (college) => {
    return `${college.name} - All Branch Cutoffs 2024:\n\n${Object.entries(college.cutoff_2024).map(([branch, cutoffs]) => 
      `${branch.toUpperCase()}:\n• General: ${cutoffs.general}\n• OBC: ${cutoffs.obc}\n• SC: ${cutoffs.sc}\n• ST: ${cutoffs.st}`
    ).join('\n\n')}`;
  };

  const formatAllFees = () => {
    return `💰 Fee Structure Comparison:\n\n${collegeDatabase.colleges.map(college => {
      let feeInfo = `${college.name}:\n`;
      if (college.fees.total_btech && college.fees.total_mba) {
        feeInfo += `• BTech Annual: ₹${college.fees.total_btech.toLocaleString()}\n• MBA Annual: ₹${college.fees.total_mba.toLocaleString()}`;
      } else {
        feeInfo += `• Total Annual: ₹${(college.fees.total || college.fees.total_btech || 0).toLocaleString()}\n• Tuition: ₹${(college.fees.tuition || college.fees.btech_tuition || 0).toLocaleString()}\n• Hostel: ₹${college.fees.hostel.toLocaleString()}`;
      }
      return feeInfo;
    }).join('\n\n')}`;
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
    setInput('');
    setIsTyping(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: generateResponse(userMessage.content),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { label: "Colleges", icon: Building2, query: "Show me all colleges", color: "bg-blue-500" },
    { label: "IIT Jodhpur", icon: GraduationCap, query: "Tell me about IIT Jodhpur", color: "bg-purple-500" },
    { label: "MBA Placements", icon: TrendingUp, query: "MBA placement statistics IIT Jodhpur", color: "bg-green-500" },
    { label: "Cutoffs", icon: BookOpen, query: "Show engineering cutoff trends", color: "bg-orange-500" },
    { label: "Fees", icon: DollarSign, query: "Compare college fees", color: "bg-pink-500" },
    { label: "Scholarships", icon: Award, query: "Available scholarships", color: "bg-indigo-500" }
  ];

  const suggestedQueries = [
    "What are the top engineering colleges in Rajasthan?",
    "IIT Jodhpur MBA placement report",
    "CSE cutoff trends for MNIT Jaipur",
    "Compare fees between IIT and MNIT",
    "Available scholarships for engineering students",
    "Hostel facilities at technical colleges"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200 shadow-2xl transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EduQuery AI</h1>
              <p className="text-xs text-gray-500 font-medium">Rajasthan Tech Education</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSidebar(false)} 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(action.query);
                    setShowSidebar(false);
                  }}
                  className={`group relative p-3 rounded-xl ${action.color} hover:scale-105 transition-all duration-200 text-white shadow-lg hover:shadow-xl`}
                >
                  <action.icon className="h-5 w-5 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-medium">{action.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Statistics</h3>
            <div className="space-y-3">
              {[
                { icon: Database, label: "50+ Colleges", color: "text-green-600" },
                { icon: TrendingUp, label: "5 Years Data", color: "text-blue-600" },
                { icon: Users, label: "24/7 Support", color: "text-purple-600" },
                { icon: Award, label: "Real-time Updates", color: "text-orange-600" }
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-xl text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-4 w-4" />
              <p className="font-semibold text-sm">Pro Tip</p>
            </div>
            <p className="text-xs leading-relaxed opacity-90">Ask specific questions like "MBA placement at IIT Jodhpur" for detailed insights!</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-xl border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowSidebar(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                  <span className="font-semibold text-gray-800">EduQuery AI</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Online</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="en">🇬🇧 English</option>
                <option value="hi">🇮🇳 हिंदी</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 1 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to EduQuery AI</h2>
                <p className="text-gray-600 mb-6">Your intelligent assistant for Rajasthan's technical education</p>
                
                <div className="grid md:grid-cols-2 gap-3 mb-8">
                  {suggestedQueries.slice(0, 4).map((query, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(query)}
                      className="p-4 text-left bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                        <span className="text-sm text-gray-700 group-hover:text-blue-600">{query}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end space-x-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                      : 'bg-gradient-to-br from-gray-600 to-gray-700'
                  }`}>
                    {message.type === 'user' ? 
                      <User className="h-5 w-5 text-white" /> : 
                      <Sparkles className="h-5 w-5 text-white" />
                    }
                  </div>
                  <div className={`relative max-w-full ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-3xl rounded-br-lg' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-3xl rounded-bl-lg shadow-sm'
                  } px-6 py-4`}>
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{message.content}</pre>
                    <div className={`text-xs mt-3 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-700 shadow-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-3xl rounded-bl-lg px-6 py-4 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white/70 backdrop-blur-xl border-t border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about colleges, admissions, cutoffs, placements..."
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-800 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-200 ${
                    isListening 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200 animate-pulse' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span className="font-medium">Send</span>
              </button>
            </form>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestedQueries.slice(0, 3).map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(query)}
                  className="text-xs bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-full transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduQueryAI;