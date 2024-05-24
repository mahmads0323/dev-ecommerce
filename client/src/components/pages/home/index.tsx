import HeroSection from "./hero";
import NewArrivals from "./newArrivals";
import TrendingCategory from "./trending";
import WeeklyDeals from "./weeklyDeals";

const HomePage = ()=>{
    return <>
        <HeroSection />
        <TrendingCategory />
        <NewArrivals />
        <WeeklyDeals />
    </>
}

export default HomePage;