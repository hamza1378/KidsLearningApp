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
    id: 1,
    name: "Math",
    description: "Mathematics and arithmetic",
    icon: require("../assets/icons/Edufun.png"),
    color: "blue",
  },
  {
    id: 2,
    name: "Science",
    description: "Science and nature",
    icon: require("../assets/icons/Edufun.png"),
    color: "green",
  },
  {
    id: 3,
    name: "English",
    description: "Language and grammar",
    icon: require("../assets/icons/Edufun.png"),
    color: "purple",
  },
  {
    id: 4,
    name: "History",
    description: "World history and events",
    icon: require("../assets/icons/Edufun.png"),
    color: "orange",
  },
  {
    id: 5,
    name: "Geography",
    description: "World geography and places",
    icon: require("../assets/icons/Edufun.png"),
    color: "teal",
  },
];
