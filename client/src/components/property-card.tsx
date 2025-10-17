import { Property } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const cart = useCart();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "available":
        return "default";
      case "pending":
        return "secondary";
      case "sold":
        return "destructive";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Link href={`/properties/${property.id}`}>
      <Card
        className="overflow-hidden hover-elevate transition-all duration-200 cursor-pointer group"
        data-testid={`card-property-${property.id}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {property.imageUrl ? (
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Square className="h-12 w-12" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="text-white">
              <p className="text-2xl font-bold">
                ${Number(property.price).toLocaleString()}
              </p>
            </div>
            <Badge variant={getStatusVariant(property.status)} className="capitalize">
              {getStatusLabel(property.status)}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3
            className="font-semibold text-lg mb-2 line-clamp-1"
            data-testid={`text-title-${property.id}`}
          >
            {property.title}
          </h3>

          <div className="flex items-center gap-1 text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <p className="text-sm line-clamp-1">
              {property.city}, {property.state}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{property.squareFeet.toLocaleString()} sqft</span>
            </div>
          </div>

          {property.status === "available" && (
            <div className="mt-4">
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  cart.add(property);
                }}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
