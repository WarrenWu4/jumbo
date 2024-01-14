import { useState } from "react";
import Flashcard from "../types/FlashcardTypes";
import MainLayout from "../layouts/MainLayout";

export default function SetCreatorPage() {

    const generatedId = crypto.randomUUID();
    const [flashcardData, setFlashcardData] = useState<Flashcard>({
        id: generatedId,
        title: "",
        description: "",
        num_studied: 0,
        starred: false,
        card_refs: []
    })

    function saveData() {
        let stringSets = localStorage.getItem("flashcards");
        if (stringSets === null) stringSets = "[]";
        let currentSets:Flashcard[] = JSON.parse(stringSets)
        currentSets.push(flashcardData);
        localStorage.setItem("flashcards", JSON.stringify(currentSets));
    }

    return (
        <MainLayout>

            <form onSubmit={saveData}>

                <input type="text"/>

            </form>

        </MainLayout>
    )
}