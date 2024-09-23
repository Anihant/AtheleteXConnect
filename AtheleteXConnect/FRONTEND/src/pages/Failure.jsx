import { useLocation } from "react-router-dom"
function Failure(){
    const location = useLocation();
    console.log(location.state);

    return (
        <div className="bg-red-400 w-96 rounded m-auto p-8">
            <h1 className="text-5xl text-gray-200 m-auto pt-2 w-fit">Failure</h1>
            <p className="text-xl pt-3">{location.state?.error}</p>
            <p className="text-xl pt-3">{location.state?.reason}</p>
        </div>
    )
}
export default Failure;