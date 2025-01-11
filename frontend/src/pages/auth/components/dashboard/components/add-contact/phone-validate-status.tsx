import { useValidatePhone } from "@/hooks/auth/add-contact/useValidatePhone";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import { memo, useEffect } from "react";
import { Country } from "react-phone-number-input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export const PhoneValidateStatus = memo(function PhoneValidateStatus({
    phoneNumber,
    country,
    setError,
}: {
    phoneNumber: string;
    country: Country;
    setError: (
        phoneNumber: "phoneNumber",
        { message }: { message: string }
    ) => void;
}) {
    const { loading, status } = useValidatePhone(phoneNumber, country);

    useEffect(() => {
        if (status == "invalid") {
            setError("phoneNumber", { message: "Invalid format" });
        }
    }, [setError, status]);

    if (loading) {
        return (
            <div className="border bg-primary dark:bg-secondary py-2 px-3 rounded-lg">
                <l-tailspin
                    size="15"
                    stroke="2"
                    speed="0.5"
                    color="white"
                ></l-tailspin>
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {status == "valid" && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="border bg-primary dark:bg-secondary p-2 rounded-lg">
                                <motion.span
                                    className="w-max"
                                    initial={{
                                        rotate: 90,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        rotate: 0,
                                        opacity: 1,
                                    }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                >
                                    <CircleCheckIcon className="fill-green-400 stroke-white" />
                                </motion.span>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                Valid format
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {status == "invalid" && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="border bg-primary dark:bg-secondary p-2 rounded-lg">
                                <motion.span
                                    className="w-max"
                                    initial={{
                                        rotate: 90,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        rotate: 0,
                                        opacity: 1,
                                    }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                >
                                    <CircleXIcon className="fill-destructive stroke-white" />
                                </motion.span>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                Invalid format
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </AnimatePresence>
        </>
    );
});
