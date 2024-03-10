import { FC, useMemo, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { login } from "@/apis/auth";

interface LoginProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

const Login: FC<LoginProps> = props => {
    const { isOpen, onOpenChange } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateEmail = (value: string) =>
        value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    const isInvalidEmail = useMemo(() => {
        if (email === "") return false;

        return validateEmail(email) ? false : true;
    }, [email]);

    const isInvalidPassword = useMemo(() => {
        if (password === "") return false;

        return password.length < 8;
    }, [password]);

    const handleLogin = async () => {
        if (isInvalidEmail || isInvalidPassword) {
            console.log("failed");
            return;
        }
        const data = await login(email, password);
        if (data) {
            onOpenChange();
            setEmail("");
            setPassword("");
        }
    };

    return (
        <>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center">
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Log in
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    required
                                    size={"lg"}
                                    placeholder="Enter your email"
                                    variant="bordered"
                                    value={email}
                                    type="email"
                                    isInvalid={isInvalidEmail}
                                    color={
                                        isInvalidEmail ? "danger" : undefined
                                    }
                                    errorMessage={
                                        isInvalidEmail &&
                                        "Please enter a valid email"
                                    }
                                    onValueChange={setEmail}
                                />
                                <Input
                                    size={"lg"}
                                    placeholder="Enter your password"
                                    endContent={
                                        <button
                                            type="button"
                                            onClick={toggleVisibility}>
                                            {isVisible ? (
                                                <IoMdEyeOff size={20} />
                                            ) : (
                                                <IoMdEye size={20} />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    variant="bordered"
                                    required
                                    value={password}
                                    isInvalid={isInvalidPassword}
                                    color={
                                        isInvalidPassword ? "danger" : undefined
                                    }
                                    errorMessage={
                                        isInvalidPassword &&
                                        "Password must be at least 8 characters"
                                    }
                                    onValueChange={setPassword}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={handleLogin}>
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default Login;
