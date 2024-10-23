
import { Helmet } from "react-helmet-async";
import Login from "../../component/Login/Login";
import NavBar from "../../component/NavBar/NavBar";

import FeatureHighlight from "./FeatureHighlight/FeatureHighlight";
import Footers from "./Footer/Footers";




const Home = () => {
    const features = [
        {title: "Fast Service", description: "Lightning-fast operations.", icon: "/icons/fast-service.png" },
        {title: "Secure Platform", description: "Top-level security for your data.", icon: "/icons/security.png" },
        {title: "User Friendly", description: "Easy to navigate and use.", icon: "/icons/user-friendly.png" },
        ];

    return (
        <div>
            <Helmet>
                <title>X | Home</title>
              
            </Helmet>
            <NavBar></NavBar>
           

            <Login></Login>
          
           

          
            <FeatureHighlight features={features} />
            <Footers></Footers>
            


        </div>
    );
};

export default Home;