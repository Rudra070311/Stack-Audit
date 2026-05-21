"use client";

import { UseCase } from "../../types/audit";

interface UseCaseSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const UseCaseSelector: React.FC<UseCaseSelectorProps> = ({ value, onChange }) => {
  const useCases: UseCase[] = ["coding", "writing", "data", "research", "mixed"];

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="use-case" className="text-sm font-medium text-gray-700">
        Primary Use Case
        </label>
        <select
            id="use-case"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
            {useCases.map((useCase) => (
                <option key={useCase} value={useCase}>
                    {useCase.charAt(0).toUpperCase() + useCase.slice(1)}
                </option>
            ))}
        </select>
    </div>
  );
}