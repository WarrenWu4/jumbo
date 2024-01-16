export default interface Flashcard {
    id: string;
    title: string;
    num_studied: number;
    starred: boolean;
    card_refs: string[];
}

export interface Card {
    id: string;
    faces: string[];
    num_studied: number;
    num_correct: number;
    box_num: number;
    
}