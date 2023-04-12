import { Movie } from "@/common/types/movie";
import { Serie } from "@/common/types/serie";

type Props ={
    trending: (Movie|Serie)[]
}

function ReloadTrending(time:string){
    console.log(time)
}

const TrendingContainer = ({trending} : Props) =>{
    
    return(
        <div>
            <p>Trending: 
                <button onClick={() => {ReloadTrending("day");}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Today</button>
                <button onClick={() => {ReloadTrending("week");}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">This week</button>
            </p>
        </div>
    )
}

export default TrendingContainer;