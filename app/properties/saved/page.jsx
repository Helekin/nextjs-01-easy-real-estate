import connectDB from "@/config/database";

import User from "@/models/User";

import PropertyCard from "@/components/PropertyCard";

import { getSessionUser } from "@/utils/getSessionUser";
import Property from "@/models/Property";

const SavedPropertiesPage = async () => {
  const { userId } = await getSessionUser();

  const user = await User.findById(userId);

  const { bookmarks } = await User.findById(userId).populate("bookmarks");

  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks.legth === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
