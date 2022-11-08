import { Body, Controller, Get,Post,UseGuards } from '@nestjs/common';
import {CreateReportDto} from '../DTO/createReport.dto'
import { ReportsService } from './reports.service';
import { AuthGuard } from './../guards/auth-guard';
@Controller('reports')
export class ReportsController {
    constructor(private reportService:ReportsService){}
    
    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body:CreateReportDto){
        return this.reportService.create(body)
    }
}
