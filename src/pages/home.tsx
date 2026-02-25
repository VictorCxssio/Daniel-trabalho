import { Link } from "react-router-dom"


export function Home() {
    return (
        <>

<h1 className="text-4xl font-bold text-center mt-10"    >Bem Vindo ao site!</h1>

          <div className=" bg-gray-300 w-[50%] h-[70vh] flex items-center justify-center m-10 ml-115 mt-20 rounded-xl gap-30">
        
         <Link to="/taskmanager">
          <div className="cursor-pointer transition hover:scale-[1.05] bg-white w-40 h-30 flex items-center justify-center rounded-xl"> <h1 className=" text-[25px]">taskmanager</h1></div>
          </Link>

          <Link to="/connecthub">
          <div className="cursor-pointer transition hover:scale-[1.05] bg-white w-40 h-30 flex items-center justify-center rounded-xl"><h1  className=" text-[25px]">ConnectHub</h1></div>
          </Link>

          <Link to="/moneyflow">
          <div className="cursor-pointer transition hover:scale-[1.05] bg-white w-40 h-30 flex items-center justify-center rounded-xl"><h1 className=" text-[25px]">MoneyFlow</h1> </div>
          </Link>
</div>

        
        </>
    )
}