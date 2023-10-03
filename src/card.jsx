
export default function ({person}){

    return (
        <div className="shadow-md m-4 w-40 p-4" style={{backgroundColor: person.color}}>
            <h1 className="text-lg capitalize text-center font-extrabold">{person.name}</h1>
            <p className="text-xs text-center text-slate-500 "> 
                {person.sex}
            </p>
        </div>
    )
}