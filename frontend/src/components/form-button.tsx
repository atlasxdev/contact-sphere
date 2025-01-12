import { Button } from "./ui/button";

type Props = {
    label: string;
    submittingLabel: string;
    isSubmitting: boolean;
    isValid: boolean;
};

export function FormButton({
    isSubmitting,

    isValid,
    label,
    submittingLabel,
}: Props) {
    return (
        <Button
            type="submit"
            className="gap-2"
            disabled={!isValid || isSubmitting}
        >
            {isSubmitting ? (
                <>
                    <l-tailspin
                        size="15"
                        stroke="2"
                        speed="0.5"
                        color="white"
                    ></l-tailspin>
                    {submittingLabel}
                </>
            ) : (
                label
            )}
        </Button>
    );
}
