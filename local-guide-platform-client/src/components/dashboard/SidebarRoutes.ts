import { Role, tRole } from "@/constants";
import {
  BarChart3,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  Map,
  MapPinned,
  PlusIcon,
  Receipt,
  ShieldCheck,
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
      url: "/dashboard/admin",
      icon: BarChart3,
    },
  ],

  group: [
    {
      title: "User Management",
      items: [
        {
          title: "Manage Admin",
          url: "/dashboard/admin/manage-admins",
          icon: ShieldCheck,
        },
        {
          title: "Manage Guide",
          url: "/dashboard/admin/manage-guides",
          icon: Map,
        },
        {
          title: "Manage Tourists",
          url: "/dashboard/admin/manage-tourists",
          icon: Users,
        },
      ],
    },

    {
      title: "Docs Management",
      items: [
        {
          title: "Manage Tours",
          url: "/dashboard/admin/manage-tours",
          icon: MapPinned,
        },
        {
          title: "Manage Bookings",
          url: "/dashboard/admin/manage-bookings",
          icon: ClipboardList,
        },
        {
          title: "Manage Payments",
          url: "/dashboard/admin/manage-payments",
          icon: CreditCard,
        },
      ],
    },
  ],
};

const GUIDE: iSidebarMenu = {
  items: [
    {
      title: "Analytics",
      url: "/dashboard/guide",
      icon: BarChart3,
    },
  ],

  group: [
    {
      title: "Tour Management",
      items: [
        {
          title: "Create Tour",
          url: "/dashboard/guide/create-tour",
          icon: PlusIcon,
        },
        {
          title: "My Tours",
          url: "/dashboard/guide/my-tours",
          icon: Map,
        },
      ],
    },
    {
      title: "Docs Management",
      items: [
        {
          title: "Manage Bookings",
          url: "/dashboard/guide/manage-bookings",
          icon: ClipboardList,
        },
      ],
    },
  ],
};

const TOURIST: iSidebarMenu = {
  items: [
    {
      title: "Analytics",
      url: "/dashboard/tourist",
      icon: BarChart3,
    },
    {
      title: "My Bookings",
      url: "/dashboard/tourist/my-bookings",
      icon: CalendarCheck,
    },
    {
      title: "Payment History",
      url: "/dashboard/tourist/payment-history",
      icon: Receipt,
    },
  ],

  group: [],
};

export default function SidebarRoutes(ROLE: tRole): iSidebarMenu {
  switch (ROLE) {
    case Role.SUPER_ADMIN:
      return ADMIN;
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
