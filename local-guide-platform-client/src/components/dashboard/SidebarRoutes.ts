import { Role, tRole } from "@/constants";
import {
  BarChart3,
  Calendar,
  CalendarCheck,
  Clock,
  FileText,
  HeartPulse,
  PlusCircle,
  Receipt,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react";
import { ElementType } from "react";

interface Item {
  title: string;
  url: string;
  icon: ElementType;
}

interface iSidebarMenu {
  group?: {
    title: string;
    items: Item[];
  }[];
  items?: Item[];
}

const ADMIN: iSidebarMenu = {
  items: [
    {
      title: "Analytics",
      url: "/admin/dashboard",
      icon: BarChart3,
    },
  ],

  group: [
    {
      title: "Management User",
      items: [
        {
          title: "Manage Admin",
          url: "/admin/dashboard/manage-admin",
          icon: Shield,
        },
        {
          title: "Manage Doctors",
          url: "/admin/dashboard/manage-doctors",
          icon: Stethoscope,
        },
        {
          title: "Manage Patients",
          url: "/admin/dashboard/manage-patients",
          icon: Users,
        },
      ],
    },
    {
      title: "Manage Docs",
      items: [
        {
          title: "Manage Appointments",
          url: "/admin/dashboard/manage-appointments",
          icon: CalendarCheck,
        },
        {
          title: "Manage Schedules",
          url: "/admin/dashboard/manage-schedules",
          icon: Clock,
        },
        {
          title: "Manage Specialties",
          url: "/admin/dashboard/manage-specialties",
          icon: HeartPulse,
        },
      ],
    },
  ],
};

const GUIDE: iSidebarMenu = {
  items: [
    {
      title: "Analytics",
      url: "/admin/dashboard",
      icon: BarChart3,
    },
    {
      title: "Appointments",
      url: "/admin/dashboard/appointments",
      icon: CalendarCheck,
    },
    {
      title: "Prescriptions",
      url: "/admin/dashboard/prescriptions",
      icon: FileText,
    },
    {
      title: "My Schedules",
      url: "/admin/dashboard/my-schedules",
      icon: Clock,
    },
  ],

  group: [],
};

const TOURIST: iSidebarMenu = {
  items: [
    {
      title: "Analytics",
      url: "/dashboard",
      icon: BarChart3,
    },
  ],

  group: [
    {
      title: "Appointments",
      items: [
        {
          title: "My Appointments",
          url: "/dashboard/my-appointments",
          icon: Calendar,
        },
        {
          title: "Book Appointment",
          url: "/dashboard/book-appointment",
          icon: PlusCircle,
        },
        {
          title: "My Prescriptions",
          url: "/dashboard/my-prescriptions",
          icon: Receipt,
        },
      ],
    },
  ],
};

export default function SidebarRoutes(ROLE: tRole): iSidebarMenu {
  switch (ROLE) {
    case Role.ADMIN:
      return ADMIN;
    case Role.GUIDE:
      return GUIDE;
    case Role.TOURIST:
      return TOURIST;
    default:
      return {};
  }
}
