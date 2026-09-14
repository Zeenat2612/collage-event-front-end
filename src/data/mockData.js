// Mock data for College Event Management System And Automation
// Events updated to reflect real AIKTC college events.

export const upcomingEventsData = [
  {
    id: "evt-1",
    title: "Internal SIH Hackathon 2026",
    date: "5 Sep 2026",
    time: null,
    venue: null,
    category: "Technical",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    description: "Internal Smart India Hackathon 2026 — an internal hackathon competition at Anjuman-I-Islam Kalsekar Technical Campus (AIKTC) for students to innovate and solve real-world problems.",
    speaker: null,
    audience: null,
    college: "Anjuman-I-Islam Kalsekar Technical Campus (AIKTC)",
    capacity: null,
    registered: null,
    status: "Upcoming"
  },
  {
    id: "evt-2",
    title: "DevOps Hands-on Workshop",
    date: "13 Aug 2026",
    time: null,
    venue: null,
    category: "Workshop",
    categoryColor: "emerald",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "A practical, hands-on DevOps workshop at AIKTC covering core DevOps practices, tools, and pipelines for modern software development and deployment.",
    speaker: null,
    audience: null,
    college: "Anjuman-I-Islam Kalsekar Technical Campus (AIKTC)",
    capacity: null,
    registered: null,
    status: "Upcoming"
  },
  {
    id: "evt-3",
    title: "Hacktoon 1.0",
    date: "28 Mar 2026",
    time: "8:00 AM",
    venue: "College Auditorium",
    category: "Technical",
    categoryColor: "blue",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    description: "Hacktoon 1.0 is a technical competition event at AIKTC's College Auditorium, bringing together students to compete in a creative and challenging hackathon format.",
    speaker: null,
    audience: "Students",
    college: "Anjuman-I-Islam Kalsekar Technical Campus (AIKTC)",
    capacity: null,
    registered: null,
    status: "Upcoming"
  },
  {
    id: "evt-4",
    title: "Startup Boot Camp 2026",
    date: "18 Jul 2026",
    time: "10:00 AM",
    venue: null,
    category: "Workshop",
    categoryColor: "amber",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    description: "Startup Boot Camp 2026 is an awareness and workshop event at AIKTC aimed at students from the BPHARM department, focused on entrepreneurship and startup fundamentals.",
    speaker: null,
    audience: "Students",
    department: "BPHARM",
    college: "Anjuman-I-Islam Kalsekar Technical Campus (AIKTC)",
    capacity: null,
    registered: null,
    status: "Upcoming"
  }
];

export const userRegistrationsData = [
  {
    id: "reg-1",
    eventId: "evt-3",
    title: "Hacktoon 1.0",
    date: "28 Mar 2026",
    status: "Confirmed",
    ticketCode: "TCK-892401",
    venue: "College Auditorium",
    seat: null
  },
  {
    id: "reg-2",
    eventId: "evt-4",
    title: "Startup Boot Camp 2026",
    date: "18 Jul 2026",
    status: "Confirmed",
    ticketCode: "TCK-441029",
    venue: null,
    seat: null
  }
];

export const categoriesList = [
  "Technical",
  "Workshop",
  "Others"
];

export const organizerStats = [
  {
    id: "stat-events",
    title: "Total Events",
    value: 4,
    icon: "Calendar",
    change: "4 AIKTC events",
    theme: "blue"
  },
  {
    id: "stat-reg",
    title: "Total Registrations",
    value: 0,
    icon: "Users",
    change: "Registrations open soon",
    theme: "green"
  },
  {
    id: "stat-ongoing",
    title: "Ongoing Events",
    value: 0,
    icon: "CheckCircle2",
    change: "None currently active",
    theme: "amber"
  },
  {
    id: "stat-upcoming",
    title: "Upcoming Events",
    value: 4,
    icon: "Clock",
    change: "All 4 events upcoming",
    theme: "purple"
  }
];

export const organizerEventsList = [
  {
    id: "org-1",
    title: "Internal SIH Hackathon 2026",
    dateVenue: "5 Sep 2026 | AIKTC",
    status: "Upcoming",
    registrations: 0,
    maxCapacity: null,
    category: "Technical"
  },
  {
    id: "org-2",
    title: "DevOps Hands-on Workshop",
    dateVenue: "13 Aug 2026 | AIKTC",
    status: "Upcoming",
    registrations: 0,
    maxCapacity: null,
    category: "Workshop"
  },
  {
    id: "org-3",
    title: "Hacktoon 1.0",
    dateVenue: "28 Mar 2026 | College Auditorium",
    status: "Upcoming",
    registrations: 0,
    maxCapacity: null,
    category: "Technical"
  },
  {
    id: "org-4",
    title: "Startup Boot Camp 2026",
    dateVenue: "18 Jul 2026 | AIKTC",
    status: "Upcoming",
    registrations: 0,
    maxCapacity: null,
    category: "Workshop"
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
  { id: 1, eventName: "Internal SIH Hackathon 2026", organizer: "AIKTC", date: "5 Sep 2026", status: "Upcoming" },
  { id: 2, eventName: "DevOps Hands-on Workshop", organizer: "AIKTC", date: "13 Aug 2026", status: "Upcoming" },
  { id: 3, eventName: "Hacktoon 1.0", organizer: "AIKTC", date: "28 Mar 2026", status: "Upcoming" },
  { id: 4, eventName: "Startup Boot Camp 2026", organizer: "AIKTC", date: "18 Jul 2026", status: "Upcoming" }
];

export const notificationsList = [
  {
    id: "notif-1",
    title: "Registration Confirmed",
    message: "Your registration for Hacktoon 1.0 at College Auditorium has been confirmed.",
    time: "10m ago",
    unread: true
  },
  {
    id: "notif-2",
    title: "Event Reminder",
    message: "Startup Boot Camp 2026 starts on 18 Jul 2026 at 10:00 AM.",
    time: "2h ago",
    unread: true
  },
  {
    id: "notif-3",
    title: "New Event Published",
    message: "DevOps Hands-on Workshop has been published for 13 Aug 2026 at AIKTC.",
    time: "1d ago",
    unread: false
  }
];
