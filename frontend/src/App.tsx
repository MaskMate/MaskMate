import { FC } from "react";
import NavigationBar from "@components/Navbar";
import Feed from "@components/Feed";

interface AppProps {}

const App: FC<AppProps> = () => {
    return (
        <>
            <NavigationBar />
            <div className="flex items-center justify-center">
                <Feed />
            </div>
        </>
    );
};

export default App;
