import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './../DTO/createReport.dto';
import { User } from './../users/user.entity';
import { GetEstimateDto } from './../DTO/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id } });

    if (!report) {
      throw new NotFoundException(`Not found report with is this id`);
    }

    report.approved = approved;
    return this.repo.save(report);
  }

  createEstimate(estimateDto: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('*')
      .where('make = :make', { make: estimateDto.make })
      .andWhere('model = :model', { model: estimateDto.model })
      .andWhere('approved IS TRUE')
      // .andWhere('lng -:lng BETWEEN -5 AND 5',{lng:estimateDto.lng})
      .orderBy('mileage -:mileage','DESC')
      .setParameters({mileage:estimateDto.mileage})
      .limit(3)
      .getRawMany();
      
  }
}
