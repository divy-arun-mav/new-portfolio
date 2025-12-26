import Minesweeper from './Minesweeper';
import type { WindowData } from '../context/WindowContext';

interface WindowContentProps {
  title: string;
    windowData: WindowData;
}

const WindowContent = ({ title, windowData }: WindowContentProps) => {
  const renderContent = () => {
    switch (title) {
      case 'About Divy':
        return (
          <div className="bg-white h-full font-mono text-sm">
            <div className="bg-[#ECE9D8] border-b-2 border-[#ACA899] px-2 py-1 flex gap-4">
              <span className="text-black cursor-pointer hover:bg-[#316AC5] hover:text-white px-2">File</span>
              <span className="text-black cursor-pointer hover:bg-[#316AC5] hover:text-white px-2">Edit</span>
              <span className="text-black cursor-pointer hover:bg-[#316AC5] hover:text-white px-2">View</span>
              <span className="text-black cursor-pointer hover:bg-[#316AC5] hover:text-white px-2">Help</span>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed p-3">
              {`Hello! I'm Divy Mav

Full-Stack & Web3 Developer
Passionate about Blockchain, AI and Product Innovation

About Me:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I'm a Computer Science graduate specialising in IoT, 
Cybersecurity & Blockchain from D. J. Sanghvi College 
of Engineering, Mumbai (Class of 2022). 

I love shipping products that blend modern web 
technologies with decentralised infrastructures to 
solve real-world problems at scale.

What I Do:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Build scalable full-stack applications
• Develop blockchain & Web3 solutions
• Create AI-powered products
• Design modern, responsive user interfaces
• Implement cloud-native architectures

Professional Highlights:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Software Engineer Intern at UBS (2025)
✓ Full-Stack Developer at Antennae Ventures (2024)
✓ Blockchain Developer at Payonweb (2023-2024)
✓ Multiple hackathon wins & runner-up positions
✓ B.Tech in CS with IoT, Cybersecurity & Blockchain

Let's connect and build something amazing together!
divymav5@gmail.com | +91 75067 55337`}
            </div>
          </div>
        );

      case 'My Computer':
        return (
          <div className="bg-white h-full">
            <div className="bg-gradient-to-b from-[#0054E3] to-[#3399FF] text-white p-4 border-b-2 border-[#0054E3]">
              <h2 className="font-bold text-xl">System Tasks</h2>
            </div>
            <div className="p-4">
              <div className="bg-[#EBF3FD] border-2 border-[#92B0E8] p-3 mb-4">
                <h3 className="font-bold text-[#003399] mb-3">Education</h3>
                <div className="bg-white border border-[#C6DEFA] p-3">
                  <h4 className="font-bold text-sm">B.Tech in Computer Science & Engineering</h4>
                  <p className="text-xs text-gray-700 mt-1">IoT, Cybersecurity & Blockchain</p>
                  <p className="text-xs text-gray-600 mt-1">D. J. Sanghvi College of Engineering, Mumbai</p>
                  <p className="text-xs text-gray-600">Graduation: Nov 2022 - June 2026 | GPA: 7.74/10.0</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Skills':
        return (
          <div className="bg-white h-full overflow-y-auto">
            <div className="bg-gradient-to-b from-[#0054E3] to-[#3399FF] text-white p-3 border-b-2 border-[#0054E3]">
              <h2 className="font-bold text-lg">Skills & Tools</h2>
            </div>
            <div className="p-3 space-y-3">
              <div className="border-l-4 border-[#0054E3] pl-2 bg-[#F0F4FF] p-2">
                <h3 className="font-bold text-[#003399] mb-2 text-sm">Frontend Technologies</h3>
                <div className="flex flex-wrap gap-1">
                  {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vite', 'Angular', 'Tailwind CSS'].map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-white border border-[#7393BE] text-[#003399] text-xs">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="border-l-4 border-[#008000] pl-2 bg-[#F0FFF0] p-2">
                <h3 className="font-bold text-[#006400] mb-2 text-sm">Backend & APIs</h3>
                <div className="flex flex-wrap gap-1">
                  {['Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'Spring', 'JDBC', 'Servlet/JSP'].map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-white border border-[#90C090] text-[#006400] text-xs">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="border-l-4 border-[#800080] pl-2 bg-[#FFF0FF] p-2">
                <h3 className="font-bold text-[#660066] mb-2 text-sm">Blockchain & Web3</h3>
                <div className="flex flex-wrap gap-1">
                  {['Solidity', 'Ethereum', 'Chainlink', 'TronWeb', 'Smart Contracts', 'Web3.js'].map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-white border border-[#C090C0] text-[#660066] text-xs">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="border-l-4 border-[#FF6600] pl-2 bg-[#FFF5F0] p-2">
                <h3 className="font-bold text-[#CC5500] mb-2 text-sm">Databases</h3>
                <div className="flex flex-wrap gap-1">
                  {['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Firestore'].map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-white border border-[#FFB380] text-[#CC5500] text-xs">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="border-l-4 border-[#CC0000] pl-2 bg-[#FFF0F0] p-2">
                <h3 className="font-bold text-[#990000] mb-2 text-sm">DevOps & Cloud</h3>
                <div className="flex flex-wrap gap-1">
                  {['Docker', 'AWS', 'Google Cloud', 'Firebase', 'Git', 'GitHub', 'CI/CD'].map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-white border border-[#FF8080] text-[#990000] text-xs">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="border-l-4 border-[#666666] pl-2 bg-[#F5F5F5] p-2">
                <h3 className="font-bold text-[#333333] mb-2 text-sm">Languages & Tools</h3>
                <div className="flex flex-wrap gap-1">
                  {['Java', 'Python', 'VS Code', 'Jupyter', 'Postman', 'Eclipse', 'NetBeans'].map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-white border border-[#999999] text-[#333333] text-xs">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Projects':
        return (
          <div className="bg-white h-full overflow-y-auto">
            <div className="bg-gradient-to-b from-[#0054E3] to-[#3399FF] text-white p-3 border-b-2 border-[#0054E3]">
              <h2 className="font-bold text-lg">Featured Projects</h2>
            </div>
            <div className="p-3 space-y-2">
              <div className="border-2 border-[#D4D0C8] bg-[#FFF] p-2 hover:bg-[#EBF3FD] hover:border-[#316AC5] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-[#800080] border border-[#000]"></div>
                  <h3 className="font-bold text-sm">Synthera</h3>
                  <span className="text-xs bg-[#D4D0C8] border border-[#808080] px-1">AI/GenAI</span>
                </div>
                <p className="text-xs text-gray-700 ml-5">AI-powered interview simulator with talking avatars & real-time feedback.</p>
              </div>
              
              <div className="border-2 border-[#D4D0C8] bg-[#FFF] p-2 hover:bg-[#EBF3FD] hover:border-[#316AC5] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-[#0054E3] border border-[#000]"></div>
                  <h3 className="font-bold text-sm">CertiChain</h3>
                  <span className="text-xs bg-[#D4D0C8] border border-[#808080] px-1">Blockchain & GenAI</span>
                </div>
                <p className="text-xs text-gray-700 ml-5">Blockchain-powered academic credentialing with AI-driven issuance.</p>
              </div>
              
              <div className="border-2 border-[#D4D0C8] bg-[#FFF] p-2 hover:bg-[#EBF3FD] hover:border-[#316AC5] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-[#008000] border border-[#000]"></div>
                  <h3 className="font-bold text-sm">Smart University Management</h3>
                  <span className="text-xs bg-[#D4D0C8] border border-[#808080] px-1">Full-Stack</span>
                </div>
                <p className="text-xs text-gray-700 ml-5">Comprehensive university operations platform for admin, teachers & students.</p>
              </div>
              
              <div className="border-2 border-[#D4D0C8] bg-[#FFF] p-2 hover:bg-[#EBF3FD] hover:border-[#316AC5] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-[#4B0082] border border-[#000]"></div>
                  <h3 className="font-bold text-sm">Evidence Management System</h3>
                  <span className="text-xs bg-[#D4D0C8] border border-[#808080] px-1">Blockchain</span>
                </div>
                <p className="text-xs text-gray-700 ml-5">Privacy-preserving complaint storage on blockchain without revealing user identity.</p>
              </div>
              
              <div className="border-2 border-[#D4D0C8] bg-[#FFF] p-2 hover:bg-[#EBF3FD] hover:border-[#316AC5] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-[#FFD700] border border-[#000]"></div>
                  <h3 className="font-bold text-sm">Jewellery Store Manager</h3>
                  <span className="text-xs bg-[#D4D0C8] border border-[#808080] px-1">Full-Stack</span>
                </div>
                <p className="text-xs text-gray-700 ml-5">All-in-one platform to run jewellery businesses, from inventory to billing.</p>
              </div>
              
              <div className="border-2 border-[#D4D0C8] bg-[#FFF] p-2 hover:bg-[#EBF3FD] hover:border-[#316AC5] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-[#FF1493] border border-[#000]"></div>
                  <h3 className="font-bold text-sm">Instagram Clone</h3>
                  <span className="text-xs bg-[#D4D0C8] border border-[#808080] px-1">Full-Stack</span>
                </div>
                <p className="text-xs text-gray-700 ml-5">Full-stack clone built with React, Node.js, and MongoDB.</p>
              </div>
              
              <div className="border-2 border-[#D4D0C8] bg-[#FFF] p-2 hover:bg-[#EBF3FD] hover:border-[#316AC5] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-[#DC143C] border border-[#000]"></div>
                  <h3 className="font-bold text-sm">Handwritten Text Recognition</h3>
                  <span className="text-xs bg-[#D4D0C8] border border-[#808080] px-1">Machine Learning</span>
                </div>
                <p className="text-xs text-gray-700 ml-5">Using Keras/TensorFlow on IAM dataset to recognise handwritten sentences.</p>
              </div>
              
              <div className="border-2 border-[#D4D0C8] bg-[#FFF] p-2 hover:bg-[#EBF3FD] hover:border-[#316AC5] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-[#20B2AA] border border-[#000]"></div>
                  <h3 className="font-bold text-sm">IPL Score Prediction</h3>
                  <span className="text-xs bg-[#D4D0C8] border border-[#808080] px-1">Machine Learning</span>
                </div>
                <p className="text-xs text-gray-700 ml-5">Model predicts match totals using historic 2016 IPL data with TensorFlow.</p>
              </div>
              
              <div className="border-2 border-[#D4D0C8] bg-[#FFF] p-2 hover:bg-[#EBF3FD] hover:border-[#316AC5] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-[#00CED1] border border-[#000]"></div>
                  <h3 className="font-bold text-sm">Hand-Gesture Volume Control</h3>
                  <span className="text-xs bg-[#D4D0C8] border border-[#808080] px-1">Computer Vision</span>
                </div>
                <p className="text-xs text-gray-700 ml-5">OpenCV & Mediapipe demo to adjust PC volume via finger distance.</p>
              </div>
            </div>
          </div>
        );

      case 'Internships':
        return (
          <div className="bg-white h-full overflow-y-auto">
            <div className="bg-gradient-to-b from-[#0054E3] to-[#3399FF] text-white p-3 border-b-2 border-[#0054E3]">
              <h2 className="font-bold text-lg">Professional Experience</h2>
            </div>
            <div className="p-3 space-y-3">
              <div className="border-2 border-[#316AC5] bg-[#EBF3FD] p-3">
                <h3 className="font-bold text-[#003399] text-sm">Software Engineer Intern</h3>
                <p className="text-xs text-[#666] mb-2">UBS | Jun 2025 – Jul 2025</p>
                <ul className="text-xs text-gray-800 space-y-1 list-none pl-3">
                  <li>• Developed front-end features in React.js and TypeScript within an NX monorepo, enhancing delivery speed by ~10%</li>
                  <li>• Built 5 reusable UI components aligned with Fluent UI standards</li>
                  <li>• Documented components in Storybook, cutting onboarding time by 30%</li>
                  <li>• Wrote ~60 unit tests using Jest, achieving 90%+ code coverage</li>
                  <li>• Collaborated in Agile team of 8 with sprint planning and daily stand-ups</li>
                </ul>
              </div>
              
              <div className="border-2 border-[#008000] bg-[#F0FFF0] p-3">
                <h3 className="font-bold text-[#006400] text-sm">Full-Stack Developer Intern</h3>
                <p className="text-xs text-[#666] mb-2">Antennae Ventures Pvt. Ltd. | Jun 2024 – Aug 2024</p>
                <ul className="text-xs text-gray-800 space-y-1 list-none pl-3">
                  <li>• Engineered frontend using Vite, React.js, and Tailwind CSS, improving load time by ~40%</li>
                  <li>• Designed modular component system reducing code duplication by 30%</li>
                  <li>• Structured cloud-hosted Firestore database schemas for scalability</li>
                  <li>• Executed end-to-end data operations with Firestore SDK</li>
                  <li>• Deployed serverless backend using Firebase Cloud Functions, automating 95% of tasks</li>
                </ul>
              </div>
              
              <div className="border-2 border-[#800080] bg-[#FFF0FF] p-3">
                <h3 className="font-bold text-[#660066] text-sm">Full-Stack Blockchain & Web3 Developer</h3>
                <p className="text-xs text-[#666] mb-2">Payonweb | Dec 2023 – Feb 2024</p>
                <ul className="text-xs text-gray-800 space-y-1 list-none pl-3">
                  <li>• Developed TRON-powered QR payment system with React & TronWeb</li>
                  <li>• Architected secure Node.js/Express backend and MongoDB datastore</li>
                  <li>• Implemented end-to-end encryption and smart contract integration</li>
                  <li>• Delivered responsive mobile-friendly interface, improving onboarding by 20%</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'Acheivements':
        return (
          <div className="bg-white h-full">
            <div className="bg-gradient-to-b from-[#0054E3] to-[#3399FF] text-white p-3 border-b-2 border-[#0054E3]">
              <h2 className="font-bold text-lg">Awards & Achievements</h2>
            </div>
            <div className="p-3 space-y-2">
              <div className="border-2 border-[#D4D0C8] bg-[#FFF8DC] p-3 flex items-start gap-3">
                <span className="text-3xl">🥉</span>
                <div>
                  <h3 className="font-bold text-[#CC6600] text-sm">2nd Runner-Up</h3>
                  <p className="text-xs font-semibold">Youth-o-preneur 2024</p>
                  <p className="text-xs text-gray-700">Blockchain-based fake medicine detection system</p>
                </div>
              </div>
              
              <div className="border-2 border-[#D4D0C8] bg-[#F0F0F0] p-3 flex items-start gap-3">
                <span className="text-3xl">🥈</span>
                <div>
                  <h3 className="font-bold text-[#808080] text-sm">1st Runner-Up</h3>
                  <p className="text-xs font-semibold">VJTI Hackathon 2024</p>
                  <p className="text-xs text-gray-700">Smart warehouse management platform</p>
                </div>
              </div>
              
              <div className="border-2 border-[#D4D0C8] bg-[#FFFACD] p-3 flex items-start gap-3">
                <span className="text-3xl">🏆</span>
                <div>
                  <h3 className="font-bold text-[#DAA520] text-sm">Winner</h3>
                  <p className="text-xs font-semibold">FinCode Hacks</p>
                  <p className="text-xs text-gray-700">AI-powered personalised investment tool</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Contact':
        return (
          <div className="bg-white h-full">
            <div className="bg-gradient-to-b from-[#0054E3] to-[#3399FF] text-white p-3 border-b-2 border-[#0054E3]">
              <h2 className="font-bold text-lg">Contact Information</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="border-l-4 border-[#0054E3] pl-3 bg-[#F0F4FF] p-2">
                <strong className="text-[#003399] text-sm">📧 Email:</strong>
                <p className="text-sm">divymav5@gmail.com</p>
              </div>
              <div className="border-l-4 border-[#008000] pl-3 bg-[#F0FFF0] p-2">
                <strong className="text-[#006400] text-sm">📱 Phone:</strong>
                <p className="text-sm">+91 75067 55337</p>
              </div>
              <div className="border-l-4 border-[#0054E3] pl-3 bg-[#F0F4FF] p-2">
                <strong className="text-[#003399] text-sm">💼 LinkedIn:</strong>
                <p className="text-sm">linkedin.com/in/divy-mav-7b82b0249</p>
              </div>
              <div className="border-l-4 border-[#333] pl-3 bg-[#F5F5F5] p-2">
                <strong className="text-[#000] text-sm">💻 GitHub:</strong>
                <p className="text-sm">github.com/divy-arun-mav</p>
              </div>
              <div className="border-l-4 border-[#800080] pl-3 bg-[#FFF0FF] p-2">
                <strong className="text-[#660066] text-sm">🌐 Portfolio:</strong>
                        <p className="text-sm">divymav.netlify.app</p>
              </div>
              <div className="mt-4 p-3 border-2 border-[#D4D0C8] bg-[#FFFEF0]">
                <p className="text-xs text-gray-700">
                  I'm always excited to connect with fellow developers, potential collaborators, and opportunities to work on innovative projects. Whether you're looking to build something amazing or just want to chat about tech, blockchain, or AI – feel free to reach out!
                </p>
              </div>
              <div className="p-2 border-2 border-[#316AC5] bg-[#EBF3FD]">
                <p className="text-xs font-bold text-[#003399]">📄 Download My Resume</p>
                <a href="https://drive.google.com/file/d/1BY7kogV-Fi7rpUcmm7xeyQeo41WYtZFv/view?usp=sharing" className="text-xs text-[#0000EE] hover:text-[#551A8B] underline" target="_blank" rel="noopener noreferrer">
                  Click here to view or download my resume
                </a>
              </div>
            </div>
          </div>
        );

      case 'Minesweeper':
            return <Minesweeper windowData={windowData} />;

      default:
        return (
          <div className="bg-gray-200 h-full p-4">
            <h2 className="font-bold text-lg mb-2">{title}</h2>
            <p>
              Content for {title} will be displayed here.
            </p>
          </div>
        );
    }
  };

  return <>{renderContent()}</>;
};

export default WindowContent;
