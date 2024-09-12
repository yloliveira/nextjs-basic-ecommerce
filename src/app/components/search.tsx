import React from "react";

type Props = {
  onSubmit: ({ text }: { text: string }) => void;
};

export default function Search({ onSubmit }: Props) {
  const [text, setText] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ text });
  }

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setText(target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      name="search-form"
      className="w-full flex items-center justify-center"
    >
      <div className="relative w-full max-w-xl">
        <input
          type="search"
          name="search-input"
          onChange={onChange}
          className="shadow h-10 w-full pl-5 pr-10 text-base"
          placeholder="Buscar produtos, marcas e muito mais..."
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center"
        >
          <svg
            className="w-8 h-4 me-2 text-gray-500 border-l border-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
