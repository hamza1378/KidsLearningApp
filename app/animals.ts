export type Animal = {
    id: string;
    name: string;
    image: any;
};

export const animals: Animal[] = [
    { id: "cat", name: "Cat", image: require("../assets/images/cat.png") },
    { id: "dog", name: "Dog", image: require("../assets/images/dog.png") },
    { id: "panda", name: "Panda", image: require("../assets/images/panda.png") },
    { id: "lion", name: "Lion", image: require("../assets/images/tiger.png") },
    { id: "tiger", name: "Tiger", image: require("../assets/images/lion.png") },
];
