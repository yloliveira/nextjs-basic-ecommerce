type Props = {
  submit: ({ text }: { text: string }) => void;
};

export default function Search({ submit }: Props) {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const input = event.currentTarget.elements.namedItem(
      "search-input"
    ) as HTMLInputElement;

    submit({ text: input.value });
  }

  return (
    <form onSubmit={onSubmit} name="search-form">
      <input type="text" name="search-input" />
    </form>
  );
}
