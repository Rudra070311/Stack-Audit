"use client";

import {
    useEffect,
    useState,
} from "react";

export function useMobile() {
    const [isMobile, setIsMobile] =
        useState(false);

    useEffect(() => {
        function checkMobile() {
            setIsMobile(
                window.innerWidth < 768
            );
        }
        checkMobile();
        window.addEventListener(
            "resize",
            checkMobile
        );

        return () =>
            window.removeEventListener(
                "resize",
                checkMobile
            );
    }, []);

  return isMobile;
}