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
      <input
        type="search"
        name="search-input"
        onChange={onChange}
        className="shadow h-10 w-full max-w-md"
      />
    </form>
  );
}
