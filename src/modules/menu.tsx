import { useState } from "react";

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    
    function handleFindClick(){
        setIsOpen(!isOpen)
    }
    return(
        <>
            <nav className="flex justify-between flex-wrap bg-teal-500 text-white p-6" >
                <div className="flex flex-1 m-2">
                    LOGO
                </div>
                <div className="flex m-2">
                    IDIOMA                    
                </div>
                {
                    !isOpen && (
                        <div className="flex m-2">
                            <button onClick={handleFindClick}>BUSCAR</button>               
                        </div>
                    )
                }
                {
                    isOpen && (
                        <>
                        <div className="flex m-2">
                            <button onClick={handleFindClick}>CERRAR</button>               
                        </div>
                        <div id='menu' className="w-full block flex-grow p-4">
                            <div className="flex justify-between">
                                <div className="flex flex-1">
                                    <input type="text" className="grow"></input>                              
                                </div>                            
                                <div className="flex pl-4">
                                    <button>SEARCH</button>                                
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