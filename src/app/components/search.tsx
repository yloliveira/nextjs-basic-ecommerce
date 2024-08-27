type Props = {
  onSubmit: ({ text }: { text: string }) => void;
};

export default function Search({ onSubmit }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const input = event.currentTarget.elements.namedItem(
      "search-input"
    ) as HTMLInputElement;

    onSubmit({ text: input.value });
  }

  return (
    <form onSubmit={handleSubmit} name="search-form">
      <input type="search" name="search-input" />
    </form>
  );
}
