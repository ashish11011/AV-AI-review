import { Save } from "lucide-react";
import { replaceQuestionsAction, updateCompanyAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CompanyWithDetails } from "@/lib/types";

type CompanyAdminProps = {
  company: CompanyWithDetails;
};

export function CompanyAdmin({ company }: CompanyAdminProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Company profile</CardTitle>
          <CardDescription>Update the public company name, URL slug, and status.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateCompanyAction} className="space-y-4">
            <input type="hidden" name="id" value={company.id} />
            <div className="space-y-2">
              <Label htmlFor="companyName">Name</Label>
              <Input id="companyName" name="name" defaultValue={company.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companySlug">Slug</Label>
              <Input id="companySlug" name="slug" defaultValue={company.slug} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyDescription">Description</Label>
              <Textarea
                id="companyDescription"
                name="description"
                defaultValue={company.description ?? ""}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="googleReviewUrl">Google review page link</Label>
              <Textarea
                id="googleReviewUrl"
                name="googleReviewUrl"
                defaultValue={company.googleReviewUrl ?? ""}
                placeholder="https://search.google.com/local/writereview?placeid=..."
                rows={3}
              />
            </div>
            <label className="flex items-center gap-3 rounded-md border p-3 text-sm">
              <input type="checkbox" name="isActive" defaultChecked={company.isActive} className="h-4 w-4" />
              Active review page
            </label>
            <Button type="submit" className="w-full">
              <Save className="h-4 w-4" />
              Save profile
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Review questions</CardTitle>
          <CardDescription>Ask up to five 1-5 star questions for customers to answer.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={replaceQuestionsAction} className="space-y-4">
            <input type="hidden" name="companyId" value={company.id} />
            <input type="hidden" name="slug" value={company.slug} />
            {[0, 1, 2, 3, 4].map((index) => (
              <div className="space-y-2" key={index}>
                <Label htmlFor={`question-${index}`}>Question {index + 1}</Label>
                <Input
                  id={`question-${index}`}
                  name={`question-${index}`}
                  defaultValue={company.questions[index]?.prompt ?? ""}
                  placeholder="How would you rate your experience?"
                />
              </div>
            ))}
            <Button type="submit">
              <Save className="h-4 w-4" />
              Save questions
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
