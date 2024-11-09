import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import axios from 'axios';
import rateLimit from 'express-rate-limit';





@Controller('exchange')
export class ExchangeController {
    constructor(private exchangeService: ExchangeService) {}


    @Post('validate-address')
    async validateAddress(
        @Body('address') address: string,
        @Body('currency') currency: string,
    ) {
        const isValid = this.exchangeService.validateAddress(address, currency);
        if (!isValid) {
            throw new BadRequestException('Invalid address');
        }
        return { valid: true };
    }

    generateRandomCode(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeLength = 6;
        let generatedCode = '';

        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            generatedCode += characters[randomIndex];
        }

        return generatedCode;
    }


    @Post('send-mes')
    async sendToTelegramBot(
        @Body('amount1') amount1: string,
        @Body('selectedCoin1') selectedCoin1: string,
        @Body('amount2') amount2: string,
        @Body('selectedCoin2') selectedCoin2: string,
        @Body('address') address: string,
        @Body('currentTime') currentTime: string,
    ) {
        const randomCode = this.generateRandomCode();


        const message = `id: ${randomCode} \n ${amount1} ${selectedCoin1} to ${amount2} ${selectedCoin2} \n address: ${address} \n time: ${currentTime}`;


        const token = '7433492056:AAGYJUKTvsufhZWicekjEfg0ilIwPo1mNp0';
        const chatId = '-4558043548';
        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        try {

            const response = await axios.post(url, {
                chat_id: chatId,
                text: message,
            });
            return { success: true, message: 'Message sent', response: response.data.text, randomCode };
        } catch (error) {
            console.error('Error sending message:', error);
            return { success: false, message: 'Error sending message', error: error.message };
        }
    }
}