import { useQuery, useMutation } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building2, DollarSign, TrendingUp, Home, Plus, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { PropertyForm } from "@/components/property-form";
import type { InsertProperty } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deletingProperty, setDeletingProperty] = useState<Property | null>(null);

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertProperty) => {
      const res = await apiRequest("POST", "/api/properties", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "Property created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertProperty }) => {
      const res = await apiRequest("PATCH", `/api/properties/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      setEditingProperty(null);
      toast({
        title: "Success",
        description: "Property updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      setDeletingProperty(null);
      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreate = (data: InsertProperty) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: InsertProperty) => {
    if (editingProperty) {
      updateMutation.mutate({ id: editingProperty.id, data });
    }
  };

  const handleDelete = () => {
    if (deletingProperty) {
      deleteMutation.mutate(deletingProperty.id);
    }
  };

  const availableCount = properties?.filter(p => p.status === "available").length || 0;
  const pendingCount = properties?.filter(p => p.status === "pending").length || 0;
  const soldCount = properties?.filter(p => p.status === "sold").length || 0;
  const totalValue = properties?.reduce((sum, p) => sum + Number(p.price), 0) || 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your property listings
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-add-property">
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Properties"
          value={properties?.length || 0}
          icon={Building2}
        />
        <StatCard
          title="Available"
          value={availableCount}
          icon={Home}
        />
        <StatCard
          title="Pending"
          value={pendingCount}
          icon={TrendingUp}
        />
        <StatCard
          title="Total Value"
          value={`$${(totalValue / 1000000).toFixed(1)}M`}
          icon={DollarSign}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Property Listings</h2>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id} data-testid={`row-property-${property.id}`}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{property.city}, {property.state}</TableCell>
                    <TableCell className="capitalize">{property.propertyType}</TableCell>
                    <TableCell>${Number(property.price).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          property.status === "available"
                            ? "default"
                            : property.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        {property.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            data-testid={`button-menu-${property.id}`}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setEditingProperty(property)}
                            data-testid={`button-edit-${property.id}`}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeletingProperty(property)}
                            className="text-destructive"
                            data-testid={`button-delete-${property.id}`}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 border rounded-md">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Properties Yet</h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first property
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-add-first-property">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new property listing
            </DialogDescription>
          </DialogHeader>
          <PropertyForm
            onSubmit={handleCreate}
            isSubmitting={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={editingProperty !== null}
        onOpenChange={(open) => !open && setEditingProperty(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
            <DialogDescription>
              Update the property details
            </DialogDescription>
          </DialogHeader>
          {editingProperty && (
            <PropertyForm
              onSubmit={handleUpdate}
              defaultValues={{
                title: editingProperty.title,
                description: editingProperty.description,
                price: editingProperty.price,
                address: editingProperty.address,
                city: editingProperty.city,
                state: editingProperty.state,
                zipCode: editingProperty.zipCode,
                propertyType: editingProperty.propertyType as any,
                bedrooms: editingProperty.bedrooms,
                bathrooms: editingProperty.bathrooms,
                squareFeet: editingProperty.squareFeet,
                yearBuilt: editingProperty.yearBuilt || undefined,
                lotSize: editingProperty.lotSize || undefined,
                garage: editingProperty.garage || undefined,
                imageUrl: editingProperty.imageUrl || "",
                features: editingProperty.features || [],
                status: editingProperty.status as any,
              }}
              isSubmitting={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={deletingProperty !== null}
        onOpenChange={(open) => !open && setDeletingProperty(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingProperty?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeletingProperty(null)}
              data-testid="button-cancel-delete"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
