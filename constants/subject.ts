export type Subject = {
  id: number;
  name: string;
  description: string;
  icon: any;
  color: string;
  comingSoon?: boolean;
};

export const SUBJECTS: Subject[] = [
  {
    id: 0,
    name: "Scan and Expand",
    description: "Fun educational activities",
    icon: require("../assets/icons/Edufun.png"),
    color: "purple",
  },
  {
    id: 1,
    name: "Life Skills",
    description: "The activities shown will be unlocked in the upgraded version of the app.",
    icon: require("../assets/icons/Edufun.png"),
    color: "blue",
    comingSoon: true,
  },
  {
    id: 2,
    name: "Reading",
    description: "The activities shown will be unlocked in the upgraded version of the app.",
    icon: require("../assets/icons/Edufun.png"),
    color: "green",
    comingSoon: true,
  },
  {
    id: 3,
    name: "Live Lessons",
    description: "The activities shown will be unlocked in the upgraded version of the app.",
    icon: require("../assets/icons/Edufun.png"),
    color: "yellow",
    comingSoon: true,
  },
  {
    id: 4,
    name: "Bible Studies",
    description: "The activities shown will be unlocked in the upgraded version of the app.",
    icon: require("../assets/icons/Edufun.png"),
    color: "red",
    comingSoon: true,
  },
  {
    id: 5,
    name: "Life Science",
    description: "The activities shown will be unlocked in the upgraded version of the app.",
    icon: require("../assets/icons/Edufun.png"),
    color: "pink",
    comingSoon: true,
  },
  {
    id: 6,
    name: "Maths",
    description: "The activities shown will be unlocked in the upgraded version of the app.",
    icon: require("../assets/icons/Edufun.png"),
    color: "indigo",
    comingSoon: true,
  },
];
