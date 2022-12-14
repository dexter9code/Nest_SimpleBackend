import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query
} from '@nestjs/common';
import { CreateReportDto } from '../DTO/createReport.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from './../guards/auth-guard';
import { CurrentUser } from './../decorators/current-user.decorator';
import { User } from './../users/user.entity';
import { Serialize } from './../interceptors/serialize.interceptor';
import { ReportDto } from './../DTO/report.dto';
import { ApprovedReportDto } from './../DTO/approved-report.dto';
import { AdminGuard } from './../guards/admin-guard';
import { GetEstimateDto } from './../DTO/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Patch(`/:id`)
  @UseGuards(AdminGuard)
  approvedReport(@Param('id') id: string, @Body() body: ApprovedReportDto) {
    return this.reportService.changeApproval(parseInt(id), body.approved);
  }


  @Get()
  getEstimate(@Query() query:GetEstimateDto){
    return this.reportService.createEstimate(query)
  }
}
