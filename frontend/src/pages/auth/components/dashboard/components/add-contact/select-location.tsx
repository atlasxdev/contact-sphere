import LocationSelector from "@/components/ui/location-input";
import { AddContactSchemaType } from "@/zod-schema";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

function SelectLocation({
    setValue,
}: {
    setValue: UseFormSetValue<AddContactSchemaType>;
}) {
    const [countryName, setCountryName] = useState<string>("");
    const [stateName, setStateName] = useState<string>("");

    useEffect(() => {
        return () => {
            setCountryName("");
            setStateName("");
            setValue("address", ["", ""]);
        };
    }, [setValue]);

    return (
        <LocationSelector
            onCountryChange={(country) => {
                setCountryName(country?.name || "");
                setValue("address", [country?.name || "", stateName || ""]);
            }}
            onStateChange={(state) => {
                setStateName(state?.name || "");
                setValue("address", [countryName || "", state?.name || ""]);
            }}
        />
    );
}

export default SelectLocation;
