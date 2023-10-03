import React from "react"
import MemeNav from "./nav"
export default function MemeGenerator () {
    return(
        <>
            <MemeNav />
            <section className="p-5 bg-slate-200">
                <form action="">

                    <div className=" flex justify-between">
                        <div>
                            <input className="p-1" type="text" id="" />
                        </div>
                        <div>
                            <input className="p-1" type="text" id="" />
                        </div>
                        
                    </div>
                    <div className="text-center my-6 bg-violet-500 text-white py-2">
                        Get a new meme image
                    </div>
                </form>
                <div className="bg-white h-80">

                </div>
            </section>

        </>
    )
}