import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { PropertyCard } from "@/components/property-card";
import { StatCard } from "@/components/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Home, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function UserDashboard() {
  const { user } = useAuth();
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const availableProperties = properties?.filter(p => p.status === "available") || [];
  const recentProperties = availableProperties.slice(0, 6);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back{user?.fullName ? `, ${user.fullName}` : ''}!
        </h1>
        <p className="text-muted-foreground">
          Explore the latest property listings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Listings"
          value={properties?.length || 0}
          icon={Building2}
          description="All properties"
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
          description="Different types"
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Latest Properties</h2>
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
        ) : recentProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-md">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Properties Available</h3>
            <p className="text-muted-foreground">
              Check back soon for new listings
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
