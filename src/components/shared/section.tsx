import { ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
}

export function Section({
    children,
}: SectionProps) {
    return (
        <section className="py-24">
            {children}
        </section>
    );
}