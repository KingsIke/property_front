import PropertyList from "@/components/PropertyList";

export default function Home() {
  return (
    <div  className="container mx-auto p-6">
       <h1 className="text-center text-3xl font-bold my-8">Property Listings</h1>
       <PropertyList />
    </div>
  );
}
