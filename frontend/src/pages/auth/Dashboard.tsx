import { MaxWidthWrapper } from "@/components/max-width-wrapper";

import Contacts from "./components/dashboard/contacts";

function Dashboard() {
    return (
        <MaxWidthWrapper className="max-w-screen-xl py-10 space-y-4">
            <h1 className="font-bold text-2xl -tracking-tighter">Dashboard</h1>
            <Contacts />
        </MaxWidthWrapper>
    );
}

export default Dashboard;
