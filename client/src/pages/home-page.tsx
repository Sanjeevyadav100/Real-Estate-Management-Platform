import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Search, TrendingUp, Users, Home } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Luxury_home_hero_image_3a7fcc16.png";
import { StatCard } from "@/components/stat-card";

export default function HomePage() {
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const availableProperties = properties?.filter(p => p.status === "available") || [];
  const featuredProperties = availableProperties.slice(0, 6);

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Luxury property"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream Property
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Discover luxury homes and investment opportunities
          </p>
          <Link href="/properties">
            <Button size="lg" variant="default" data-testid="button-browse-properties" className="text-lg px-8">
              <Search className="mr-2 h-5 w-5" />
              Browse Properties
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Properties"
              value={properties?.length || 0}
              icon={Building2}
              description="Active listings"
            />
            <StatCard
              title="Available"
              value={availableProperties.length}
              icon={Home}
              description="Ready to view"
            />
            <StatCard
              title="Property Types"
              value={new Set(properties?.map(p => p.propertyType) || []).size}
              icon={TrendingUp}
              description="Diverse portfolio"
            />
            <StatCard
              title="Cities"
              value={new Set(properties?.map(p => p.city) || []).size}
              icon={Users}
              description="Locations served"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">
                Explore our hand-picked selection of premium listings
              </p>
            </div>
            <Link href="/properties">
              <Button variant="outline" data-testid="link-view-all">
                View All
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Properties Yet</h3>
              <p className="text-muted-foreground">
                Check back soon for new listings
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Browse our extensive collection of properties and find your perfect match
          </p>
          <Link href="/properties">
            <Button size="lg" variant="secondary" data-testid="button-explore-listings" className="text-lg px-8">
              Explore All Listings
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
