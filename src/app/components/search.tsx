type Props = {
  submit: () => void;
};

export default function Search({ submit }: Props) {
  return <form onSubmit={() => submit()} name="search-form"></form>;
}
