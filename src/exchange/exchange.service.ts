import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as WAValidator from 'multicoin-address-validator';

@Injectable()
export class ExchangeService {

    constructor(private httpService: HttpService) {}

    validateAddress(address: string, currency: string): boolean {
        return WAValidator.validate(address, currency, 'prod');
    }
}
