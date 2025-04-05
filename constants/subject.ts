export type Subject = {
    id: string;
    name: string;
    description: string;
    icon: any;
    color: string;
    comingSoon?: boolean;
  };
  
  export const SUBJECTS: Subject[] = [
    { 
      id: "edufun",
      name: "Edufun", 
      description: "Fun educational activities", 
      icon: require("../assets/icons/Edufun.png"),
      color: "purple"
    },
    {
      id: "painting",
      name: "Painting", 
      description: "Creative and colorful painting ccccccccc", 
      icon: require("../assets/icons/Painting.png"), // Update the path as necessary
      color: "blue"
    },
    {
      id: "maths",
      name: "Maths", 
      description: "Mathematical concepts and problem-solving", 
      icon: require("../assets/icons/Science.png"),
      color: "green"
    }
  ];
  