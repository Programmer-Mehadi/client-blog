import BlogCard from "@/app/components/pages/Home/BlogCard"
import SearchSection from "@/app/components/pages/Home/SearchSection"
import { baseUrl } from "@/app/components/shared/baseUrl"

const getData = async () => {
  const res = await fetch(baseUrl + "/blog/get/all", {
    next: {
      revalidate: 60,
    },
  })
  const data = await res.json()
  return data
}

export default async function Home() {
  const data = await getData()
  console.log(data)
  return (
    <main className="w-full">
      <SearchSection />
      <div>
        {data.data.length > 0 ? (
          <div>
            {data.data.map((blog: any) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center text-2xl text-slate-800">
            No data found
          </div>
        )}
      </div>
    </main>
  )
}
