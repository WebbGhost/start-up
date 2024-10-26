import Form from "next/form";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action={"/"} scroll={false} className="flex w-1/2 items-center gap-2">
      <Input
        type="text"
        name="query"
        className="rounded-full focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0"
        placeholder="Search startups"
        defaultValue={query}
      />
      {query && (
        <Link href={"/"} type="reset" className="rounded-full">
          Clear
        </Link>
      )}
      <Button type="submit" className="rounded-full">
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;
