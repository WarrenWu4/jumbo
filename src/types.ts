export interface Set {
    id: string;
    title: string;
    starred: boolean;
    flashcards: Flashcard[];
}

export interface SetCardProps {
    id: string;
    title: string;
    starred: boolean;
    deleteSet: (id: string) => void;
}

export interface Flashcard {
    faces: string[];
    correct: number;
    incorrect: number;
}

export interface JumboInputRowProps {
    row: number;
    faces: string[];
    deleteFlashcard: (row: number) => void;
    addFace: (row: number) => void;
    updateFace: (row: number, col:number, e: any) => void;
    deleteFace: (row: number, col:number) => void;
}

export interface JumboInputProps {
    row: number;
    col: number;    
    face: string;
    updateFace: (row: number, col: number, e:any) => void;
    deleteFace: (row: number, col:number) => void;
}

export const blankSet: Set = {
    id: "",
    title: "",
    starred: false,
    flashcards: [
        {
            faces: ["", ""],
            correct: 0,
            incorrect: 0
        },
        {
            faces: ["", ""],
            correct: 0,
            incorrect: 0
        }
    ]
}