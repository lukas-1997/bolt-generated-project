// Add these imports at the top
import PriceRangeFilter from './components/PriceRangeFilter';
import ListingDetail from './components/ListingDetail';

// Add this to your state declarations
const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

// Add this function to handle price filter
const handlePriceRangeChange = (newRange) => {
  setPriceRange(newRange);
  const filtered = listings.filter(listing => 
    listing.price >= newRange.min && 
    listing.price <= newRange.max &&
    listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredListings(filtered);
};

// Update the main content section to include the price filter
{showMap ? (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="space-y-6">
      <PriceRangeFilter
        priceRange={priceRange}
        onChange={handlePriceRangeChange}
      />
      {filteredListings.map(listing => (
        <ListingCard
          key={listing.id}
          listing={listing}
          onClick={() => setSelectedListing(listing)}
        />
      ))}
    </div>
    <div className="sticky top-[140px] h-[calc(100vh-160px)]">
      <div className="bg-white p-4 rounded-xl shadow-lg h-full">
        <MapView
          listings={filteredListings}
          onMarkerClick={(listing) => setSelectedListing(listing)}
        />
      </div>
    </div>
  </div>
) : (
  // ... rest of the code
)}

{/* Add this at the bottom of your return statement */}
{selectedListing && (
  <ListingDetail
    listing={selectedListing}
    onClose={() => setSelectedListing(null)}
  />
)}
