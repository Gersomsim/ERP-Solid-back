import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../persistence/permission.entity';
import { PERMISSIONS_SEED } from './permissions.seed';

@Injectable()
export class PermissionSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(PermissionSeeder.name);

  constructor(
    @InjectRepository(PermissionEntity)
    private readonly repository: Repository<PermissionEntity>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const slugs = PERMISSIONS_SEED.map((p) => p.slug);

    const existing = await this.repository.findBy(
      slugs.map((slug) => ({ slug })),
    );
    const existingSlugs = new Set(existing.map((e) => e.slug));

    const toInsert = PERMISSIONS_SEED.filter((p) => !existingSlugs.has(p.slug));

    if (toInsert.length === 0) {
      this.logger.log('Permissions are up to date');
      return;
    }

    await this.repository.insert(toInsert);
    this.logger.log(
      `Seeded ${toInsert.length} new permission(s): ${toInsert.map((p) => p.slug).join(', ')}`,
    );
  }
}
