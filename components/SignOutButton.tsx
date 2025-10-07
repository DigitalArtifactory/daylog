'use client';

import { signout } from "@/app/lib/actions";
import { IconLogout } from "@tabler/icons-react";

export default function SignOutButton() {
    return (
        <a role='button' onClick={() => signout()}>
            <IconLogout />
        </a>
    );
}