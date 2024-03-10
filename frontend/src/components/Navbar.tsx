import { FC } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Image,
    useDisclosure,
} from "@nextui-org/react";
import MaskmateLogo from "@/assets/logo.png";
import Login from "./Login";

interface NavigationBarProps {}

const navbar: FC<NavigationBarProps> = ({}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Login isOpen={isOpen} onOpenChange={onOpenChange} />
            <Navbar>
                <NavbarBrand>
                    <Image src={MaskmateLogo} alt="logo" width={40} />
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Button
                            onPress={onOpen}
                            color="primary"
                            className="font-semibold"
                            variant="bordered">
                            Login
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            color="primary"
                            className="text-white font-semibold"
                            variant="solid">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>
    );
};

export default navbar;
