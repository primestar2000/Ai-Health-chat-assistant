import React from "react";

export default function Thing (){

    function addItem(){
       var item = 'thing ';
        console.log();
    }
    const  things  = [ 'thing 1', 'thing 2', 'thing 3', 'thing 4'];
    const allThings = things.map((thing) => {
        return <p> {thing} </p>;
    }) 

    return (
        <>
            <div className="p-5">
                <button onClick={addItem} className="bg-violet-500 p-3 text-white">click to add</button>
                {allThings}
            </div>     
        </>
    )
}