import { getStartups } from "@/actions/startup";
import SearchForm from "@/components/shared/search-form";
import StartupCard from "@/components/shared/startup-card";
import { Badge } from "@/components/ui/badge";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  console.log(query);
  // add query to getStartups

  const posts = await getStartups(query);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 pb-20">
      <h4 className={"font-bold text-2xl uppercase"}>
        Next Generation of lead <br />
        the world of leading star-ups
      </h4>
      <p className={"line-clamp-3 text-center text-gray-500"}>
        Create your profile and start connecting with investors and founders to
        find the best opportunities which will help you grow your business
      </p>
      <SearchForm query={query} />
      <section className="flex flex-col gap-4">
        <h4 className="font-semibold text-xl">Latest Startups</h4>
        {/* add category pills */}
        <div className="flex gap-4">
          {posts
            .map((post) => post.category)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StartupCard key={post.authorId} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
}
