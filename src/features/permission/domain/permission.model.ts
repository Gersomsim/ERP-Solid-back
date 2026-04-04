export class Permission {
  id: string;
  slug: string;
  name: string;
  group: string;

  constructor() {}

  static create(slug: string, name: string, group: string): Permission {
    const permission = new Permission();
    permission.slug = slug;
    permission.name = name;
    permission.group = group;
    return permission;
  }
}
