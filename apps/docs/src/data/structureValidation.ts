import { z, type ZodIssue } from 'zod';
import type { CategoryMappings } from './buildCategoryMapping';
import {
  buildStructureIndexes,
  getPrimaryPageByName,
  type StructurePage,
} from './structureIndexes';

const PageSchema = z
  .object({
    name: z.string().min(1),
    pages: z.array(z.string().min(1)).optional(),
    sections: z.array(z.string().min(1)).optional(),
    category: z.string().min(1).optional(),
    path: z.string().startsWith('/').optional(),
    href: z.string().min(1).optional(),
    url: z.string().min(1).optional(),
    seoDescription: z.string().min(1).optional(),
    parentPage: z.string().min(1).optional(),
    searchable: z.boolean().optional(),
  })
  .passthrough();

const CategoryMappingSchema = z.record(
  z.string(),
  z.record(z.string(), z.array(z.string().min(1))),
);

const duplicateValues = (values: string[]) => {
  const counts = new Map<string, number>();
  values.forEach(value => {
    counts.set(value, (counts.get(value) || 0) + 1);
  });

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([value]) => value);
};

export type StructureValidationResult = {
  errors: string[];
  warnings: string[];
};

export const validateStructureData = (
  structure: StructurePage[],
  categoryMapping: CategoryMappings,
): StructureValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  structure.forEach((page, index) => {
    const parsed = PageSchema.safeParse(page);
    if (!parsed.success) {
      errors.push(
        `Invalid page at index ${index} (${
          page?.name || 'unknown'
        }): ${parsed.error.issues
          .map(
            (issue: ZodIssue) =>
              `${issue.path.join('.') || 'root'} ${issue.message}`,
          )
          .join(', ')}`,
      );
    }
  });

  const categoryMappingValidation =
    CategoryMappingSchema.safeParse(categoryMapping);
  if (!categoryMappingValidation.success) {
    errors.push(
      `Invalid categoryMapping shape: ${categoryMappingValidation.error.issues
        .map(
          (issue: ZodIssue) =>
            `${issue.path.join('.') || 'root'} ${issue.message}`,
        )
        .join(', ')}`,
    );
  }

  const indexes = buildStructureIndexes(structure, categoryMapping);

  Object.entries(indexes.bySlug).forEach(([slug, pages]) => {
    if (pages.length > 1) {
      errors.push(
        `Slug collision for "${slug}" across pages: ${pages
          .map(page => page.name)
          .join(', ')}`,
      );
    }
  });

  const primaryPaths = structure
    .filter(page => page.path && !page.href)
    .map(page => page.path as string);
  const duplicatePaths = duplicateValues(primaryPaths);
  duplicatePaths.forEach(path => {
    errors.push(`Duplicate explicit path detected: ${path}`);
  });

  structure.forEach(page => {
    if (page.parentPage) {
      const parent = getPrimaryPageByName(page.parentPage, indexes);
      if (!parent) {
        errors.push(
          `Page "${page.name}" references missing parentPage "${page.parentPage}"`,
        );
        return;
      }

      if (!Array.isArray(parent.pages) || !parent.pages.includes(page.name)) {
        warnings.push(
          `Parent mismatch: "${page.name}" declares parentPage "${page.parentPage}" but parent.pages does not include it`,
        );
      }
    }

    if (Array.isArray(page.pages)) {
      page.pages.forEach(childName => {
        const child = getPrimaryPageByName(childName, indexes);
        if (!child) {
          errors.push(
            `Page "${page.name}" references missing child "${childName}"`,
          );
          return;
        }

        if (child.parentPage && child.parentPage !== page.name) {
          warnings.push(
            `Child mismatch: "${child.name}" is listed under "${page.name}" but declares parentPage "${child.parentPage}"`,
          );
        }
      });
    }
  });

  Object.entries(indexes.byCategory).forEach(([hubName, groupedCategories]) => {
    const hubChildren = indexes.byParent[hubName] || [];
    const categorizedChildren = hubChildren.filter(child => child.category);

    categorizedChildren.forEach(child => {
      const category = child.category as string;
      const groupedChildren = groupedCategories[category] || [];
      const existsInCategory = groupedChildren.some(
        groupedChild => groupedChild.name === child.name,
      );

      if (!existsInCategory) {
        errors.push(
          `Category mapping missing page "${child.name}" in ${hubName}.${category}`,
        );
      }
    });
  });

  if (errors.length === 0 && warnings.length === 0) {
    warnings.push('Structure validation passed.');
  }

  return { errors, warnings };
};
