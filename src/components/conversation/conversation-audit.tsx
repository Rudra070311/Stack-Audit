"use client";

import { useEffect, useState } from "react";

import { AssistantMessage } from "../../components/conversation/assistant-message";
import { ChatInput } from "../../components/conversation/chat-input";
import { ChatShell } from "../../components/conversation/chat-shell";
import { QuickReplies } from "../../components/conversation/quick-replies";
import { TypingIndicator } from "../../components/conversation/typing-indicator";
import { UserMessage } from "../../components/conversation/user-message";

const STEPS = [
    {
        id: 1,
        field: "tool",
        question:
        "What AI tool is your team mainly paying for?",
        replies: [
        "Cursor",
        "Claude",
        "ChatGPT",
        "Gemini",
        "Copilot",
        ],
    },

    {
        id: 2,
        field: "monthlySpend",
        question:
        "How much are you roughly spending monthly on it?",
    },

    {
        id: 3,
        field: "teamSize",
        question:
        "What's your team size? Include yourself too.",
    },

    {
        id: 4,
        field: "useCase",
        question:
        "What's your primary use case?",
        replies: [
        "Coding",
        "Writing",
        "Research",
        "Data",
        "Mixed",
        ],
    },
    ];

    export function ConversationAudit() {
    const [messages, setMessages] =
        useState<any[]>([]);

    const [stepIndex, setStepIndex] =
        useState(0);

    const [typing, setTyping] =
        useState(false);

    const [auditData, setAuditData] =
        useState({
        tool: "",
        monthlySpend: "",
        teamSize: "",
        useCase: "",
        });

    useEffect(() => {
        const firstStep = STEPS[0];

        setMessages([
        {
            role: "assistant",
            content: firstStep.question,
        },
        ]);
    }, []);

    function handleReply(value: string) {
        const currentStep =
        STEPS[stepIndex];

        setMessages((prev) => [
        ...prev,
        {
            role: "user",
            content: value,
        },
        ]);

        setAuditData((prev) => ({
        ...prev,
        [currentStep.field]: value,
        }));

        const nextIndex = stepIndex + 1;

        if (nextIndex >= STEPS.length) {
        setTimeout(() => {
            setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                content:
                "Perfect. Your audit profile is ready.",
            },
            ]);
        }, 600);

        return;
        }

        setTyping(true);

        setTimeout(() => {
        setTyping(false);

        setMessages((prev) => [
            ...prev,
            {
            role: "assistant",
            content:
                STEPS[nextIndex].question,
            },
        ]);

        setStepIndex(nextIndex);
        }, 1000);
    }

    return (
        <div className="mx-auto max-w-3xl">
        <ChatShell>
            {messages.map((message, index) =>
            message.role === "assistant" ? (
                <AssistantMessage
                key={index}
                content={message.content}
                />
            ) : (
                <UserMessage
                key={index}
                content={message.content}
                />
            )
            )}

            {typing && <TypingIndicator />}
        </ChatShell>

        <div className="mt-6">
            {STEPS[stepIndex]?.replies ? (
            <QuickReplies
                replies={
                STEPS[stepIndex].replies
                }
                onSelect={handleReply}
            />
            ) : (
            <ChatInput
                onSend={handleReply}
            />
            )}
        </div>
        </div>
    );
}