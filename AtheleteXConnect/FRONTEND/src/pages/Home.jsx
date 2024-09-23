import sports from "../data/data";
import "../index.css"
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
function Home() {
  const arr = ['img1','img2','img3','img4','img5'];
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl mx-auto">SPORTS FEST</h1>
      <Carousel images={arr}/>
      <h1 className="text-3xl mt-4 mb-2 mx-auto">Available sports for registeration:</h1>
<div className="flex flex-wrap justify-center">
        {Object.keys(sports).map((sport) => {
          return (
            <div key={sport} className="w-[80%] md:w-1/4 p-6 m-4 bg-white border border-gray-200 rounded-lg shadow">
            <div className="aspect-[5/3] w-full overflow-hidden">
                <img src={`sports/${sport}.jpg`} alt="no img" className="w-full h-full object-cover"  />
            </div>

              <h2 className="text-2xl">{sport}</h2>
              <p><b>Price: </b> {sports[sport].price}</p>
              <p><b>Main players: </b> {sports[sport].mainplayers}</p>
              <p><b>Substitutes: </b> {sports[sport].substitutes}</p>
              <p><b>Date: </b> {sports[sport].date}</p>
              <p><b>Time: </b> {sports[sport].time}</p>
              <Link to="/register"><button className="submit-button">Register</button></Link>
            </div>
          );
        })}
</div>
    </div>
  );
}

export default Home;
