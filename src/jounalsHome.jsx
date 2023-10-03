import React from "react";
import Jcard from './journalsCard';
import journalData from "./assets/journal-data";

export default function JournalHome(){
    const cards = journalData.map((data) => {
        return <Jcard data={data} />
    })
console.log(journalData);

    return (
        <>
            <div>
                <div className="bg-red-500 text-center text-sm p-3">
                    My travelling journal
                </div>
                <section className="p-5">
                    {cards}
                </section>
            </div>
        </>
    )
}