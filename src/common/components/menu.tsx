import { useState } from "react";

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    
    function handleFindClick(){
        setIsOpen(!isOpen)
    }
    return(
        <>
            <nav className="flex justify-between flex-wrap bg-gray-950" >
                <div className="flex-1 menuTop">
                    LOGO
                </div>
                <div className="menuTop">
                    Idioma                    
                </div>
                {
                    !isOpen && (
                        <div className="menuTop">
                            <button onClick={handleFindClick}>Buscar</button>               
                        </div>
                    )
                }
                {
                    isOpen && (
                        <>
                        <div className="menuTop">
                            <button onClick={handleFindClick}>Cerrar</button>               
                        </div>
                        <div id="menu" className="w-full block pt-4 pb-4 items-center justify-center">
                            <div className="flex w-4/5 mx-auto">
                                <div className="relative flex flex-1 flex-grow">
                                    <input type="text" className="inputSearch w-full" placeholder="Search for movies and series..."></input>                              
                                    <div className="absolute inset-y-0 left-0 flex items-center px-3">
                                        <span className="material-icons text-gray-950">search</span>
                                    </div> 
                                </div>                            
                            </div>                            
                        </div>
                    </>
                    )
                }                                
            </nav>
        </>
    )
}