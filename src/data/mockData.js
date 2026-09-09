// Mock data for College Event Management System And Automation

export const upcomingEventsData = [
  {
    id: "evt-1",
    title: "Tech Talk 2025",
    date: "10 Jun 2025",
    time: "10:00 AM - 01:00 PM",
    venue: "Main Auditorium",
    category: "Technical",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    description: "Explore the frontiers of Artificial Intelligence, Quantum Computing, and Next-Gen Software Engineering with top industry thought leaders.",
    speaker: "Dr. Arvind Rao, Principal AI Scientist",
    capacity: 300,
    registered: 245,
    status: "Ongoing"
  },
  {
    id: "evt-2",
    title: "Cultural Fest",
    date: "15 Jun 2025",
    time: "04:30 PM - 10:00 PM",
    venue: "College Ground",
    category: "Cultural",
    categoryColor: "rose",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    description: "An electrifying celebration of music, dance, theater, and artistic expression featuring inter-collegiate band performances.",
    speaker: "College Cultural Committee",
    capacity: 1200,
    registered: 980,
    status: "Draft"
  },
  {
    id: "evt-3",
    title: "AI Workshop",
    date: "20 Jun 2025",
    time: "09:30 AM - 04:00 PM",
    venue: "Seminar Hall",
    category: "Workshop",
    categoryColor: "emerald",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    description: "Hands-on masterclass building production-ready LLM agents, RAG architectures, and fine-tuning open-source models.",
    speaker: "Prof. Neha Verma, AI Lab Director",
    capacity: 80,
    registered: 76,
    status: "Upcoming"
  },
  {
    id: "evt-4",
    title: "Sports Meet",
    date: "25 Jun 2025",
    time: "07:30 AM - 05:00 PM",
    venue: "Sports Complex",
    category: "Sports",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    description: "Annual intra-university track and field championships, football tournament, and badminton singles.",
    speaker: "Sports Council",
    capacity: 500,
    registered: 410,
    status: "Ongoing"
  },
  {
    id: "evt-5",
    title: "Literary Symposium",
    date: "28 Jun 2025",
    time: "11:00 AM - 03:00 PM",
    venue: "Auditorium B",
    category: "Literary",
    categoryColor: "purple",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    description: "Debate championship, poetry slam, and author interaction on contemporary literature and creative writing.",
    speaker: "Literary Circle",
    capacity: 150,
    registered: 110,
    status: "Upcoming"
  }
];

export const userRegistrationsData = [
  {
    id: "reg-1",
    eventId: "evt-1",
    title: "Tech Talk 2025",
    date: "10 Jun 2025",
    status: "Confirmed",
    ticketCode: "TCK-892401",
    venue: "Main Auditorium",
    seat: "Row C - Seat 14"
  },
  {
    id: "reg-2",
    eventId: "evt-3",
    title: "AI Workshop",
    date: "20 Jun 2025",
    status: "Pending",
    ticketCode: "TCK-441029",
    venue: "Seminar Hall",
    seat: "Waitlist #3"
  },
  {
    id: "reg-3",
    eventId: "evt-4",
    title: "Sports Meet",
    date: "25 Jun 2025",
    status: "Confirmed",
    ticketCode: "TCK-673199",
    venue: "Sports Complex",
    seat: "Track 4 - Bib #108"
  }
];

export const categoriesList = [
  "Technical",
  "Cultural",
  "Workshop",
  "Sports",
  "Literary",
  "Others"
];

export const organizerStats = [
  {
    id: "stat-events",
    title: "Total Events",
    value: 5,
    icon: "Calendar",
    change: "+2 this month",
    theme: "blue"
  },
  {
    id: "stat-reg",
    title: "Total Registrations",
    value: 320,
    icon: "Users",
    change: "+18% from last week",
    theme: "green"
  },
  {
    id: "stat-ongoing",
    title: "Ongoing Events",
    value: 3,
    icon: "CheckCircle2",
    change: "Active right now",
    theme: "amber"
  },
  {
    id: "stat-upcoming",
    title: "Upcoming Events",
    value: 2,
    icon: "Clock",
    change: "Next in 5 days",
    theme: "purple"
  }
];

export const organizerEventsList = [
  {
    id: "org-1",
    title: "Tech Talk 2025",
    dateVenue: "10 Jun 2025 | Main Auditorium",
    status: "Ongoing",
    registrations: 180,
    maxCapacity: 200,
    category: "Technical"
  },
  {
    id: "org-2",
    title: "AI Workshop",
    dateVenue: "20 Jun 2025 | Seminar Hall",
    status: "Upcoming",
    registrations: 72,
    maxCapacity: 80,
    category: "Workshop"
  },
  {
    id: "org-3",
    title: "Cultural Fest",
    dateVenue: "15 Jun 2025 | College Ground",
    status: "Draft",
    registrations: 0,
    maxCapacity: 1000,
    category: "Cultural"
  }
];

export const monthlyRegistrationsChart = [
  { month: "Jan", count: 32 },
  { month: "Feb", count: 48 },
  { month: "Mar", count: 72 },
  { month: "Apr", count: 64 },
  { month: "May", count: 128 },
  { month: "Jun", count: 184 }
];

export const adminStats = [
  {
    id: "adm-users",
    title: "Total Users",
    value: 150,
    icon: "Users",
    change: "+12 new today",
    theme: "blue"
  },
  {
    id: "adm-events",
    title: "Total Events",
    value: 25,
    icon: "Calendar",
    change: "Across 6 departments",
    theme: "teal"
  },
  {
    id: "adm-registrations",
    title: "Total Registrations",
    value: 320,
    icon: "UserCheck",
    change: "+24% growth",
    theme: "amber"
  },
  {
    id: "adm-upcoming",
    title: "Upcoming Events",
    value: 8,
    icon: "TrendingUp",
    change: "Scheduled this month",
    theme: "purple"
  }
];

export const adminRegistrationTrend = [
  { month: "Jan", registrations: 24 },
  { month: "Feb", registrations: 46 },
  { month: "Mar", registrations: 38 },
  { month: "Apr", registrations: 54 },
  { month: "May", registrations: 76 },
  { month: "Jun", registrations: 95 }
];

export const categoryDistribution = [
  { name: "Technical", percentage: 40, color: "#3b82f6" },
  { name: "Cultural", percentage: 25, color: "#ec4899" },
  { name: "Workshop", percentage: 15, color: "#10b981" },
  { name: "Sports", percentage: 10, color: "#f59e0b" },
  { name: "Others", percentage: 10, color: "#8b5cf6" }
];

export const recentUsersData = [
  { id: 1, name: "Aarav Sharma", email: "aarav@gmail.com", role: "Student", status: "Active" },
  { id: 2, name: "Priya Verma", email: "priya@gmail.com", role: "Student", status: "Active" },
  { id: 3, name: "Rohan Patel", email: "rohan@gmail.com", role: "Organizer", status: "Active" },
  { id: 4, name: "Sneha Gupta", email: "sneha@gmail.com", role: "Student", status: "Inactive" },
  { id: 5, name: "Vikram Malhotra", email: "vikram@gmail.com", role: "Organizer", status: "Active" }
];

export const recentEventsData = [
  { id: 1, eventName: "Tech Talk 2025", organizer: "CS Department", date: "10 Jun 2025", status: "Upcoming" },
  { id: 2, eventName: "Cultural Fest", organizer: "Arts Club", date: "15 Jun 2025", status: "Upcoming" },
  { id: 3, eventName: "AI Workshop", organizer: "Tech Society", date: "20 Jun 2025", status: "Completed" },
  { id: 4, eventName: "Sports Meet", organizer: "Sports Club", date: "25 Jun 2025", status: "Ongoing" }
];

export const notificationsList = [
  {
    id: "notif-1",
    title: "Registration Confirmed",
    message: "Your seat for Tech Talk 2025 has been confirmed.",
    time: "10m ago",
    unread: true
  },
  {
    id: "notif-2",
    title: "Event Reminder",
    message: "AI Workshop starts in 2 days at Seminar Hall.",
    time: "2h ago",
    unread: true
  },
  {
    id: "notif-3",
    title: "New Event Published",
    message: "Cultural Fest 2025 schedule has been updated.",
    time: "1d ago",
    unread: false
  }
];
