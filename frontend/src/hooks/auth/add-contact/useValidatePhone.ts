import { wait } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Country, isValidPhoneNumber } from "react-phone-number-input";

type ValidationResult = "valid" | "invalid" | undefined;

async function validatePhone(phoneNumber: string, country: Country) {
    await wait(500);
    const result = isValidPhoneNumber(phoneNumber, {
        defaultCountry: country,
    });
    const status = result ? "valid" : "invalid";
    return status;
}

export function useValidatePhone(phoneNumber: string, country: Country) {
    const [status, setStatus] = useState<ValidationResult>();
    const [loading, setLoading] = useState(false);

    const validate = useCallback(async () => {
        try {
            setLoading(true);
            const result = await validatePhone(phoneNumber, country);
            setStatus(result);
        } finally {
            setLoading(false);
        }
    }, [phoneNumber, country]);

    useEffect(() => {
        validate();
    }, [validate]);

    return { status, loading };
}
