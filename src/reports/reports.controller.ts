import { Body, Controller, Get,Post,UseGuards } from '@nestjs/common';
import {CreateReportDto} from '../DTO/createReport.dto'
import { ReportsService } from './reports.service';
import { AuthGuard } from './../guards/auth-guard';
import { CurrentUser } from './../decorators/current-user.decorator';
import { User } from './../users/user.entity';
import { Serialize } from './../interceptors/serialize.interceptor';
import { ReportDto } from './../DTO/report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService:ReportsService){}
    
    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body:CreateReportDto,@CurrentUser() user:User){
        return this.reportService.create(body,user)
    }
}
