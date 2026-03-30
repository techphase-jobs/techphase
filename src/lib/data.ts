import {
  Globe,
  Mail,
  Cloud,
  Settings,
  Network,
  Wifi,
  Wrench,
  Video,
  Hammer,
  Shield,
  Printer,
  Monitor,
  Package,
  Code,
  Box,
  Cable,
  Camera,
  MessageCircle,
  MapPin,
  Phone,
  Clock,
  Quote,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Users,
  Briefcase,
  Trophy,
  Star,
  CheckCircle,
  Zap,
  Target,
  Eye,
  Heart,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

/* ==========================================================================
   NAVIGATION
   ========================================================================== */

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Our Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Clients', href: '/clients' },
]

/* ==========================================================================
   HERO OFFER ITEMS
   ========================================================================== */

export const HERO_OFFER_ITEMS = [
  { label: 'Networking Solutions', icon: Network },
  { label: 'Systems Maintenance', icon: Wrench },
  { label: 'CCTV Installations', icon: Video },
  { label: 'Printing Services', icon: Printer },
  { label: 'Computers & Accessories', icon: Monitor },
  { label: 'Electric Fence Installation', icon: Shield },
]

/* ==========================================================================
   SERVICES
   ========================================================================== */

export interface ServiceItem {
  title: string
  description: string
  icon: LucideIcon
}

export const SERVICES: ServiceItem[] = [
  {
    title: 'Web Development',
    description:
      'Professional website design and development for businesses — from landing pages to full web applications tailored to your needs.',
    icon: Globe,
  },
  {
    title: 'Professional Email',
    description:
      'Professional business email setup, configuration, and management — including domain-based email hosting, migrations, and ongoing support.',
    icon: Mail,
  },
  {
    title: 'Cloud Services',
    description:
      'Cloud infrastructure setup, migration, and management to keep your business data secure, accessible, and always available.',
    icon: Cloud,
  },
  {
    title: 'System Administration',
    description:
      'Expert management and administration of servers, networks, and IT infrastructure to ensure optimal uptime and performance.',
    icon: Settings,
  },
  {
    title: 'Wide Area Networking',
    description:
      'Professional installation and maintenance of Wide Area Networks for businesses of all sizes across Ghana.',
    icon: Network,
  },
  {
    title: 'Local Area Networking',
    description:
      'We plan, design, and maintain Local Area Networks to improve your business efficiency and connectivity.',
    icon: Wifi,
  },
  {
    title: 'Systems Maintenance',
    description:
      'Regular preventive and corrective maintenance to keep your IT systems running at peak performance always.',
    icon: Wrench,
  },
  {
    title: 'CCTV Installations',
    description:
      'Professional CCTV installation and maintenance for enhanced security of your premises and assets.',
    icon: Video,
  },
  {
    title: 'Repairs & Servicing',
    description:
      'Expert repairs and servicing of computers, Fax Machines, Printers, UPS, plotters and electronic equipment.',
    icon: Hammer,
  },
  {
    title: 'Electric Fence Installation',
    description:
      'Professional installation and commissioning of electric fences for enhanced perimeter security.',
    icon: Shield,
  },
  {
    title: 'Printing Services',
    description:
      'All printing works including banners, stickers, books, forms, calendars, invoices, and more.',
    icon: Printer,
  },
]

/* ==========================================================================
   PRODUCTS
   ========================================================================== */

export interface ProductItem {
  title: string
  description: string
  icon: LucideIcon
}

export const PRODUCTS: ProductItem[] = [
  {
    title: 'Computers, Laptops and Accessories',
    description: 'Desktops, laptops, and essential accessories for home and office use.',
    icon: Monitor,
  },
  {
    title: 'Computer Peripherals',
    description: 'Keyboards, mice, monitors, speakers, and other essential peripherals.',
    icon: Cable,
  },
  {
    title: 'Software Solutions',
    description: 'Licensed software, antivirus, operating systems, and productivity suites.',
    icon: Code,
  },
  {
    title: 'Office Consumables',
    description: 'Printer cartridges, paper, stationery, and other office supplies.',
    icon: Box,
  },
  {
    title: 'Networking Equipment & Cables',
    description: 'Routers, switches, access points, and structured cabling materials.',
    icon: Package,
  },
  {
    title: 'CCTV & Security Systems',
    description: 'Security cameras, DVR/NVR systems, and surveillance accessories.',
    icon: Camera,
  },
]

/* ==========================================================================
   PARTNERS
   ========================================================================== */

export const PARTNERS = [
  'HP',
  'Dell',
  'APC',
  'Canon',
  'Lenovo',
  'Toshiba',
  'Ubiquiti',
  'Hikvision',
  'SanDisk',
  'Samsung',
  'Ruijie',
  'Cisco',
  'Tenda',
  'TP-Link',
  'Grandstream',
]

/* ==========================================================================
   TEAM
   ========================================================================== */

export interface TeamMember {
  name: string
  role: string
}

export const TEAM: TeamMember[] = [
  { name: 'Robert Kwashie Gozar', role: 'Chief Executive Officer' },
  { name: 'Mawuli Kofi', role: 'Accounts Manager' },
  { name: 'Felix Kofi Gozar', role: 'Technical Support Manager' },
  { name: 'Hansen Neequaye', role: 'Technical Support' },
  { name: 'Celestine Bortey', role: 'Technical Support' },
]

/* ==========================================================================
   TESTIMONIALS
   ========================================================================== */

export interface TestimonialItem {
  quote: string
  client: string
  type: string
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'Techphase Solutions has been our trusted IT partner for years. Their reliability and professionalism in maintaining our hospital IT systems have been exceptional. We highly recommend them to any organization seeking quality IT solutions.',
    client: 'BOMA Government Hospital',
    type: 'Healthcare Client',
  },
  {
    quote:
      'The team at Techphase is professional, responsive, and always goes above and beyond. Their networking solutions have significantly improved our operational efficiency. Working with them has been a great experience.',
    client: 'MINSOL Limited',
    type: 'Corporate Client',
  },
  {
    quote:
      "We've worked with Techphase for IT equipment and maintenance services for several years now. Their commitment to quality and customer satisfaction is unmatched. They are our go-to IT solutions provider.",
    client: 'WACO Ghana Limited',
    type: 'Long-term Client',
  },
  {
    quote:
      'Techphase installed our entire CCTV security system across three branch locations. The installation was seamless, the quality of equipment is outstanding, and their after-sales support has been truly reliable. Highly recommended!',
    client: 'Tepa Government Hospital',
    type: 'Healthcare Client',
  },
  {
    quote:
      'As a growing enterprise, we needed a partner who could scale our IT infrastructure as we expanded. Techphase Solutions delivered beyond expectations with their cloud services and networking expertise. They understand business needs.',
    client: 'AMANTRA Ghana Limited',
    type: 'Enterprise Client',
  },
  {
    quote:
      'From procurement to deployment and ongoing maintenance, Techphase has been exceptional. Their team is knowledgeable, punctual, and always available when we need them. A truly dependable IT partner.',
    client: 'MROCHEKROM Limited',
    type: 'Corporate Client',
  },
]

/* ==========================================================================
   CLIENTS
   ========================================================================== */

export const CLIENTS = [
  'BOMA Government Hospital',
  'Tepa Government Hospital',
  'MINSOL Limited',
  'WACO Ghana Limited',
  'AMANTRA Ghana Limited',
  'MROCHEKROM Limited',
  'ALLADI Limited',
  'InkIt Ghana',
  'ITING Computers',
  'Audancy Limited',
  'ZIBA ESTR',
]

/* ==========================================================================
   BLOG POSTS
   ========================================================================== */

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  readTime: string
  content: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'cctv-transforming-security-ghana',
    title: '5 Ways CCTV Systems Are Transforming Security in Ghana',
    excerpt:
      'From deterring theft to providing crucial evidence, modern CCTV systems are revolutionizing how businesses in Ghana approach security.',
    date: '2025-01-15',
    author: 'Techphase Team',
    category: 'Security',
    readTime: '5 min read',
    content: `Security is a top priority for businesses and homeowners across Ghana. With advancements in surveillance technology, CCTV systems have become more affordable, easier to install, and packed with features that go far beyond simple recording.

Here are five ways CCTV systems are transforming security in Ghana:

**1. Real-Time Remote Monitoring**
Modern CCTV systems allow business owners to monitor their premises remotely via smartphone apps. Whether you're at home, traveling, or managing multiple locations, you have instant access to live footage.

**2. Crime Deterrence**
The mere presence of visible security cameras significantly reduces criminal activity. Studies show that properties with CCTV systems are up to 300% less likely to be targeted by criminals.

**3. Evidence Collection**
In the unfortunate event of a security breach, high-definition CCTV footage provides crucial evidence for law enforcement and insurance claims.

**4. Employee Productivity**
CCTV systems help monitor workplace activities, encouraging employees to maintain productivity and adhere to company policies.

**5. Cost-Effective Security**
Compared to hiring multiple security guards, a well-installed CCTV system provides 24/7 surveillance at a fraction of the cost, making it an excellent long-term investment.

At Techphase Solutions, we offer professional CCTV installation and maintenance services. Contact us today to learn how we can secure your premises.`,
  },
  {
    slug: 'why-businesses-need-professional-it-support',
    title: 'Why Every Business Needs Professional IT Support',
    excerpt:
      'Downtime costs money. Learn how professional IT support can save your business from costly disruptions and keep your operations running smoothly.',
    date: '2025-01-08',
    author: 'Robert Kwashie Gozar',
    category: 'IT Solutions',
    readTime: '4 min read',
    content: `In today's digital-first business environment, IT systems are the backbone of every organization. When these systems fail, the consequences can be devastating — lost productivity, missed deadlines, unhappy customers, and significant financial losses.

Here's why every business in Ghana needs professional IT support:

**Preventive Maintenance Beats Reactive Fixes**
Waiting for something to break before fixing it is always more expensive than regular maintenance. Professional IT support includes scheduled checkups, software updates, and system optimizations that prevent problems before they occur.

**Faster Problem Resolution**
When issues do arise, professional IT teams have the expertise and tools to resolve them quickly. What might take an internal team days to figure out can often be resolved in hours by experienced professionals.

**Data Security and Backup**
Cyber threats are on the rise globally, and Ghana is no exception. Professional IT support ensures your data is protected with the latest security measures and that you have reliable backup systems in place.

**Scalability**
As your business grows, your IT needs evolve. Professional IT support providers help you scale your infrastructure seamlessly, ensuring you always have the right technology for your needs.

**Cost Efficiency**
Outsourcing IT support is often more cost-effective than maintaining an in-house team, especially for small and medium-sized businesses. You get access to a broader range of expertise without the overhead of full-time salaries.

Techphase Solutions has been providing reliable IT support to businesses across Ghana since 2014. Let us handle your IT so you can focus on what you do best — running your business.`,
  },
  {
    slug: 'cloud-computing-benefits-smes-west-africa',
    title: 'The Benefits of Cloud Computing for SMEs in West Africa',
    excerpt:
      'Cloud computing is leveling the playing field for small businesses. Discover how the cloud can help your SME compete with larger enterprises.',
    date: '2024-12-20',
    author: 'Techphase Team',
    category: 'Cloud',
    readTime: '6 min read',
    content: `Cloud computing has revolutionized how businesses operate worldwide, and West Africa is no exception. For Small and Medium Enterprises (SMEs), cloud technology offers opportunities that were previously available only to large corporations with significant IT budgets.

**What is Cloud Computing?**
In simple terms, cloud computing means using IT resources (servers, storage, databases, networking, software) over the internet rather than owning and maintaining physical equipment.

**Benefits for SMEs:**

**1. Lower Upfront Costs**
Instead of investing in expensive hardware and software licenses, cloud services operate on a pay-as-you-go model. This means you only pay for what you use, significantly reducing initial capital expenditure.

**2. Scalability**
Cloud resources can be scaled up or down instantly based on your business needs. During busy periods, you can add more computing power; during slower times, you can scale back and save money.

**3. Business Continuity**
Cloud-based backups and disaster recovery solutions ensure your data is safe even if physical disasters strike. Your data is stored in secure data centers with multiple redundancy layers.

**4. Collaboration and Remote Work**
Cloud tools enable your team to collaborate in real-time from anywhere with an internet connection. This has become especially important in the post-pandemic world.

**5. Automatic Updates**
Cloud service providers handle software updates and security patches automatically, ensuring you always have access to the latest features and protection.

**6. Competitive Advantage**
Cloud technology gives SMEs access to the same powerful tools that large enterprises use, leveling the playing field and enabling smaller businesses to compete effectively.

At Techphase Solutions, we help businesses migrate to the cloud and manage their cloud infrastructure. Whether you're just starting your cloud journey or looking to optimize your existing setup, our team is here to help.`,
  },
  {
    slug: 'networking-solutions-business-growth-ghana',
    title: 'How Proper Networking Solutions Drive Business Growth in Ghana',
    excerpt:
      'A reliable network is the foundation of digital business operations. Learn how investing in the right networking infrastructure can accelerate your growth.',
    date: '2024-12-10',
    author: 'Felix Kofi Gozar',
    category: 'Networking',
    readTime: '5 min read',
    content: `In an increasingly connected world, the quality of your business network directly impacts your operational efficiency, customer experience, and bottom line. For businesses in Ghana, investing in proper networking solutions is not just an IT decision — it's a business strategy.

**The Foundation of Digital Operations**
Every aspect of modern business relies on network connectivity: point-of-sale systems, customer databases, cloud applications, video conferencing, email, and VoIP phone systems. A slow or unreliable network creates bottlenecks across your entire operation.

**Key Networking Solutions for Businesses:**

**Structured Cabling**
Properly designed and installed structured cabling provides a reliable foundation for all your network communications. It supports current needs while allowing for future expansion.

**Wireless Networks**
Enterprise-grade Wi-Fi solutions ensure seamless connectivity throughout your premises, supporting both employees and customers.

**Wide Area Networks (WAN)**
For businesses with multiple locations, WAN solutions connect your branches securely, enabling centralized management and real-time data sharing.

**Network Security**
Firewalls, VPNs, and intrusion detection systems protect your network from external threats while ensuring safe remote access for your team.

**Signs You Need a Network Upgrade:**
- Frequent connectivity drops or slow internet speeds
- Employees unable to access shared resources reliably
- Difficulty connecting multiple locations
- Security concerns about data transmission
- Inability to support new applications or services

Techphase Solutions specializes in designing, installing, and maintaining business networks. With over 10 years of experience serving organizations across Ghana, we have the expertise to build a network that supports your growth ambitions.`,
  },
]

/* ==========================================================================
   CONTACT INFO
   ========================================================================== */

export const CONTACT_INFO = {
  location: '49 S.Dzagble Street, Akweteman-Achimota, Accra, Ghana',
  digitalAddress: 'GA-302-8209',
  region: 'Okaikoi North, Accra',
  phone: '+233 244 201 295',
  email: 'info@techphasesolutions.com',
  hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM',
}

/* ==========================================================================
   STATS
   ========================================================================== */

export const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '20+', label: 'Happy Clients' },
  { value: '500+', label: 'Projects Done' },
]

/* ==========================================================================
   RE-EXPORT ICONS FOR CONVENIENCE
   ========================================================================== */

export {
  Globe,
  Mail,
  Cloud,
  Settings,
  Network,
  Wifi,
  Wrench,
  Video,
  Hammer,
  Shield,
  Printer,
  Monitor,
  Package,
  Code,
  Box,
  Cable,
  Camera,
  MessageCircle,
  MapPin,
  Phone,
  Clock,
  Quote,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Users,
  Briefcase,
  Trophy,
  Star,
  CheckCircle,
  Zap,
  Target,
  Eye,
  Heart,
  ChevronRight,
  ArrowRight,
}
