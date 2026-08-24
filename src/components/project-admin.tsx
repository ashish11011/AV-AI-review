import Link from "next/link";
import { Building2, ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import { createCompanyAction, deleteCompanyAction, updateCompanyAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Company } from "@/lib/types";

type ProjectAdminProps = {
  companies: Company[];
};

export function ProjectAdmin({ companies }: ProjectAdminProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Add company</CardTitle>
          <CardDescription>Create a review page and company admin area.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCompanyAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newName">Name</Label>
              <Input id="newName" name="name" placeholder="Bright Smile Clinic" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newSlug">Slug</Label>
              <Input id="newSlug" name="slug" placeholder="bright-smile-clinic" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newDescription">Description</Label>
              <Textarea id="newDescription" name="description" rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newGoogleReviewUrl">Google review page link</Label>
              <Textarea
                id="newGoogleReviewUrl"
                name="googleReviewUrl"
                placeholder="https://search.google.com/local/writereview?placeid=..."
                rows={3}
              />
            </div>
            <label className="flex items-center gap-3 rounded-md border p-3 text-sm">
              <input type="checkbox" name="isActive" defaultChecked className="h-4 w-4" />
              Active review page
            </label>
            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4" />
              Add company
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {companies.map((company) => (
          <Card key={company.id}>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {company.name}
                </CardTitle>
                <CardDescription>/{company.slug}</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/${company.slug}`}>
                    <ExternalLink className="h-4 w-4" />
                    Page
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/${company.slug}/admin`}>Admin</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form action={updateCompanyAction} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="id" value={company.id} />
                <div className="space-y-2">
                  <Label htmlFor={`name-${company.id}`}>Name</Label>
                  <Input id={`name-${company.id}`} name="name" defaultValue={company.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`slug-${company.id}`}>Slug</Label>
                  <Input id={`slug-${company.id}`} name="slug" defaultValue={company.slug} required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`description-${company.id}`}>Description</Label>
                  <Textarea
                    id={`description-${company.id}`}
                    name="description"
                    defaultValue={company.description ?? ""}
                    rows={2}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`google-review-url-${company.id}`}>Google review page link</Label>
                  <Textarea
                    id={`google-review-url-${company.id}`}
                    name="googleReviewUrl"
                    defaultValue={company.googleReviewUrl ?? ""}
                    placeholder="https://search.google.com/local/writereview?placeid=..."
                    rows={2}
                  />
                </div>
                <div className="flex flex-wrap gap-3 md:col-span-2">
                  <label className="flex items-center gap-3 rounded-md border px-3 py-2 text-sm">
                    <input type="checkbox" name="isActive" defaultChecked={company.isActive} className="h-4 w-4" />
                    Active
                  </label>
                  <Button type="submit" variant="secondary">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </form>
              <form action={deleteCompanyAction} className="mt-3">
                <input type="hidden" name="id" value={company.id} />
                <Button type="submit" variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                  Remove company
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
        {!companies.length ? (
          <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
            Add your first company to create a review page.
          </div>
        ) : null}
      </div>
    </div>
  );
}
