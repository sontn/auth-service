import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { RepositoryModule } from 'src/repository/repository.module';
@Module({
  imports: [RepositoryModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
