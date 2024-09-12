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

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setText(target.value);

    if (target.value === "") {
      onSubmit({ text: target.value });
    }
  };

  return (
    <form onSubmit={handleSubmit} name="search-form">
      <input type="search" name="search-input" onInput={onInput} />
    </form>
  );
}
