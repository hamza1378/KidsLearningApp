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
    }
  ];
  